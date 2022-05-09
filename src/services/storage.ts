import {Token} from "./auth";

class Storage {

    private static readonly RefreshTokenKey = 'rt';

    private static accessToken: Token | undefined = undefined;

    public static SetRefreshToken(token?: Token) {
        if (token) {
            window.localStorage.setItem(this.RefreshTokenKey, JSON.stringify(token));
        } else {
            window.localStorage.removeItem(this.RefreshTokenKey);
        }
    }

    public static GetRefreshToken(): string | undefined {
        const data = window.localStorage.getItem(this.RefreshTokenKey) || undefined;
        if (!data) return undefined;

        const token: Token = JSON.parse(data);
        if (new Date().getTime() <= token.expireAt) return undefined;

        return data;
    }

    public static SetAccessToken(token?: Token) {
        this.accessToken = token;
    }

    public static GetAccessToken(): string | undefined {
        if (!this.accessToken) return undefined;

        if (new Date().getTime() <= this.accessToken.expireAt) return undefined;

        return this.accessToken.value;
    }

}

export default Storage;