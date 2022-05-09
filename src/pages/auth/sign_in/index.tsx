import {FormEvent, useState} from "react";

import useAuthContext from "../../../hooks/auth";

import FieldHeader from "../../../components/commons/fields/header";
import {InputPassword, InputText} from "../../../components/commons/fields/input";
import {PrimaryButton} from "../../../components/commons/buttons/main";
import Surface from "../../../components/commons/surface";
import Loading from "../../../components/commons/loading";

import style from './style.module.scss';

const SignInPage = () => {
    const { signIn } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        signIn({ username, password })
            .finally(() => setLoading(false));
    }

    return <div className={style.container}>
        <Surface className={style.content}>
            <form onSubmit={submit}>
                <h3>Ingresar</h3>
                <FieldHeader title={'Usuario'} className={style.field} />
                <InputText
                    className={style.input}
                    value={username}
                    onChange={setUsername}
                />
                <FieldHeader title={'Contraseña'} className={style.field} />
                <InputPassword
                    className={style.input}
                    value={password}
                    onChange={setPassword}
                />
                <PrimaryButton className={style.button}>
                    { loading ? <Loading light /> : 'Ingresar' }
                </PrimaryButton>
            </form>
        </Surface>
    </div>
}

export default SignInPage;