import {useEffect, useState, MouseEvent} from "react";

import { ReactComponent as UserIcon } from "../../../assets/icons/user.svg";

import useJoinClassNames from "../../../hooks/className";

import UserMenu from "../menu";

import style from './style.module.scss';

interface Props {
    className?: string
}

const UserButton = (props: Props) => {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const listener = () => setShowMenu(false);

        window.addEventListener('click', listener);
        return () => { window.removeEventListener('click', listener); }
    }, [])

    const onMenuClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

    const onButtonMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowMenu(!showMenu)
    }

    const containerClassName = useJoinClassNames(style.container, props.className);

    return <div className={containerClassName}>
        <button
            className={style.menuButton}
            children={<UserIcon />}
            onClick={onButtonMenuClick}
        />
        { showMenu && <UserMenu className={style.menu} onClick={onMenuClick} /> }
    </div>
}

export default UserButton;