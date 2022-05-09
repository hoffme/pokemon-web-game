import useJoinClassNames from "../../../../hooks/className";

import style from './style.module.scss';

interface Props {
    title?: string
    className?: string
}

const FieldHeader = (props: Props) => {
    const containerClassName = useJoinClassNames(style.container, props.className);

    return <div className={containerClassName}>
        { props.title && <label className={style.title} children={props.title} /> }
    </div>
}

export default FieldHeader;