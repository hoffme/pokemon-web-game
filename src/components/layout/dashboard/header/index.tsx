import {NavLink} from "react-router-dom";

import LogoSrc from '../../../../assets/logo.png';

import useJoinClassNames from "../../../../hooks/className";

import UserHeader from "../../../user/header";

import style from './style.module.scss';

interface Props {
    className?: string
}

const DashboardHeader = (props: Props) => {
    const containerClassName = useJoinClassNames(style.container, props.className);

    return <header className={containerClassName}>
        <img className={style.logo} src={LogoSrc} alt={'logo'} />
        <nav className={style.menu}>
            <NavLink
                to={'/'}
                children={"Hall"}
                className={({ isActive }) => isActive ? style.active : undefined}
            />
            <NavLink
                to={'/decks'}
                children={"Mazos"}
                className={({ isActive }) => isActive ? style.active : undefined}
            />
            <NavLink
                to={'/boxes'}
                children={"Cajas"}
                className={({ isActive }) => isActive ? style.active : undefined}
            />
        </nav>
        <UserHeader className={style.user} />
    </header>
}

export default DashboardHeader;