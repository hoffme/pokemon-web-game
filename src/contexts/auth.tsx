import {useNavigate} from "react-router-dom";
import {createContext, ReactNode, useCallback, useEffect, useState} from "react";

import AuthService, {SignInParams, SignUpParams, TokensResult} from "../services/auth";
import Storage from "../services/storage";

interface AuthContextI {
    logged: boolean
    signUp: (params: SignUpParams) => Promise<void>
    signIn: (params: SignInParams) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextI>({
    logged: false,
    signUp: async () => { throw new Error('auth provider not implemented') },
    signIn: async () => { throw new Error('auth provider not implemented') },
    signOut: async () => { throw new Error('auth provider not implemented') },
});

interface Props {
    children?: ReactNode
}

const AuthProvider = (props: Props) => {
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);

    const access = useCallback((tokens?: TokensResult) => {
        Storage.SetAccessToken(tokens?.refreshToken);
        Storage.SetRefreshToken(tokens?.accessToken);
        setLogged(!!tokens);
    }, [])

    useEffect(() => {
        if (!logged) navigate('/');
        return () => {}
    }, [navigate, logged])

    useEffect(() => {
        const refreshToken = Storage.GetRefreshToken();
        if (refreshToken) {
            AuthService.Access(refreshToken)
                .then(access)
                .catch(() => access())
        } else { access() }

        return () => {}
    }, [access])

    const signUp = async (params: SignUpParams) => {
        try {
            access(await AuthService.SignUp(params));
        } catch (err: any) {
            access();
            throw err;
        }
    }

    const signIn = async (params: SignInParams) => {
        try {
            access(await AuthService.SignIn(params));
        } catch (err: any) {
            access();
            throw err;
        }
    }

    const signOut = async () => {
        const refreshToken = Storage.GetRefreshToken();
        if (refreshToken) {
            AuthService.SignOut(refreshToken).catch(console.error)
        }

        access();
    }

    return <AuthContext.Provider value={{
        logged,
        signUp,
        signIn,
        signOut
    }}>
        { props.children }
    </AuthContext.Provider>
}

export default AuthContext;
export {
    AuthProvider
}