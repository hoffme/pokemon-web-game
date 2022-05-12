import {useContext} from "react";

import DeckEditorContext from "./context";

import style from "./style.module.scss";

const EditorDeckStatus = () => {
    const { status } = useContext(DeckEditorContext);

    return <label className={style.status}>
        {status}
    </label>
}

export default EditorDeckStatus;