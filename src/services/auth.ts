interface SignUpParams {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
}

interface SignInParams {
    username: string
    password: string
}

interface Token {
    value: string
    expireAt: number
}

interface TokensResult {
    refreshToken: Token
    accessToken: Token
}

class AuthService {

    public static async SignUp(params: SignUpParams): Promise<TokensResult> {
        return {} as any;
    }

    public static async SignIn(params: SignInParams): Promise<TokensResult> {
        return {} as any;
    }

    public static async SignOut(refreshToken: string): Promise<void> {
        return {} as any;
    }

    public static async Access(refreshToken: string): Promise<TokensResult> {
        return {} as any;
    }

}

export default AuthService;
export type {
    SignUpParams,
    SignInParams,
    Token,
    TokensResult
}