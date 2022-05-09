import {ReactNode} from "react";

import useJoinClassNames from "../../../../hooks/className";

import DashboardHeader from "../header";

import style from './style.module.scss';

interface Props {
    className?: string
    children?: ReactNode
}

const DashboardPage = (props: Props) => {
    const contentClassName = useJoinClassNames(style.content, props.className);

    return <main className={style.container}>
        <DashboardHeader className={style.header} />
        <div className={contentClassName}>
            { props.children }
        </div>
    </main>
}

export default DashboardPage;