// types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			// role: string;
			username: string;
			accessToken: string;
			error?: "RefreshAccessTokenError";
		} & DefaultSession["user"]; // Сохраняем стандартные свойства
		accessToken: string; // Добавляем accessToken непосредственно в объект сессии
		error?: "RefreshAccessTokenError"; // Добавляем ошибку непосредственно в объект сессии
	}

	interface User extends DefaultUser {
		id: string;
		// role: string;
		username: string;
		accessToken: string;
		// refreshToken: string;
		accessTokenExpires: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		// role: string;
		accessToken: string;
		// refreshToken: string;
		accessTokenExpires: number;
		error?: "RefreshAccessTokenError";
	}
}
