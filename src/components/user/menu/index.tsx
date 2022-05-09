import {useState, MouseEvent} from "react";

import useJoinClassNames from "../../../hooks/className";
import useAuthContext from "../../../hooks/auth";

import {SecondaryButton} from "../../commons/buttons/main";
import Loading from "../../commons/loading";

import style from './style.module.scss';

interface Props {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
    className?: string
}

const UserMenu = (props: Props) => {
    const auth = useAuthContext();

    const [loading, setLoading] = useState(false);

    const containerClassName = useJoinClassNames(style.container, props.className);

    const signOut = () => {
        setLoading(true);

        auth.signOut()
            .finally(() => setLoading(false))
    }

    return <div className={containerClassName} onClick={props.onClick}>
        <SecondaryButton onClick={signOut} className={style.button}>
            { loading ? <Loading light /> : 'Salir' }
        </SecondaryButton>
    </div>
}

export default UserMenu;