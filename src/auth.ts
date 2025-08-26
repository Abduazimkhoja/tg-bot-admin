import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./api/login/api";
import { loginBodySchema } from "./api/login/schema";

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const response = await fetch(`${"API_BASE_URL"}/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken: token.refreshToken }),
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens; // Бросаем ошибку, если API не вернул успешный ответ
		}

		return {
			...token,
			accessToken: refreshedTokens.accessToken,
			// Некоторые провайдеры выдают новый refresh token при обновлении, другие - нет.
			// Сохраняем старый, если новый не предоставлен.
			refreshToken: refreshedTokens.refreshToken || token.refreshToken,
			accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
		};
	} catch (error) {
		console.error("Error refreshing access token:", error);
		// Важно: в случае ошибки обновления, помечаем токен ошибкой, чтобы сессия могла быть обработана
		return {
			...token,
			error: "RefreshAccessTokenError", // Добавляем свойство ошибки для обработки на клиенте/сервере
		};
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// Базовая проверка входных учетных данных
				if (!credentials?.username || !credentials?.password) {
					return null; // Или throw new Error("Missing username or password.");
				}

				const { username, password } =
					await loginBodySchema.parseAsync(credentials);

				// Аутентификация через внешний API [12]
				// Подходит, если ваша база данных пользователей и логика аутентификации находятся в отдельном бэкенд-сервисе.
				const authResult = await login({
					body: {
						username,
						password,
					},
				});

				const accessToken = authResult?.token;

				if (!accessToken) {
					return null; // Аутентификация не удалась на внешнем API
				}

				const decodedToken = jwtDecode<{ exp: number }>(accessToken);

				// Возвращаем объект пользователя с данными для хранения в JWT, включая токены из API
				return {
					id: username,
					// name: authResult.user.name,
					username: username,
					// role: authResult.user.role, // Пример пользовательских данных из вашего API
					accessToken,
					// refreshToken: authResult.refreshToken,
					accessTokenExpires: decodedToken.exp * 1000, // Вычисление срока действия
				};
			},
		}),
	],
	session: {
		strategy: "jwt", // Обязательно для CredentialsProvider [4, 8, 10]
		maxAge: 7 * 24 * 60 * 60, // Максимальный срок действия сессии 7 дней [12] - Настройте по необходимости
	},
	secret: process.env.AUTH_SECRET, // Ваш сгенерированный секрет
	pages: {
		signIn: "/login", // Путь к пользовательской странице входа [4, 5]
		error: "/login", // Путь к пользовательской странице ошибки [4]
	},
	callbacks: {
		async jwt({ token, user }) {
			// Начальный вход (объект user присутствует только при первом входе)
			if (user) {
				return {
					...token,
					id: user.id,
					// role: user.role, // Пользовательские данные
					accessToken: user.accessToken,
					// refreshToken: user.refreshToken,
					accessTokenExpires: user.accessTokenExpires,
				};
			}

			// Если токен доступа все еще действителен, возвращаем его
			if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
				return token;
			}
			// // Токен доступа истек, пытаемся его обновить
			// return await refreshAccessToken(token);
			return token;
		},
		// Колбэк сессии будет подробно описан в Разделе 5.3
		async session({ session, token }) {
			// Отправляем свойства в объект клиентской сессии
			if (token) {
				session.user.id = token.id;
				// session.user.role = token.role; // Пользовательские данные
				session.accessToken = token.accessToken;
				session.error = token.error; // Распространяем ошибку токена обновления
			}
			return session;
		},

		authorized: async ({ auth }) => {
			return !!auth;
		},
	},
});
