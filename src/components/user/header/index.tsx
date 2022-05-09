import useJoinClassNames from "../../../hooks/className";

import UserButton from "../button";

import style from './style.module.scss';

interface Props {
    className?: string
}

const UserHeader = (props: Props) => {
    const containerClassName = useJoinClassNames(style.container, props.className);

    return <div className={containerClassName}>
        <label className={style.points}>
            200 pt
        </label>
        <UserButton className={style.user} />
    </div>
}

export default UserHeader;