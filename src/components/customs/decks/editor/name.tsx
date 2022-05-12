import {useContext} from "react";

import DeckEditorContext from "./context";

import FieldHeader from "../../../commons/fields/header";
import {InputText} from "../../../commons/fields/input";

import style from "./style.module.scss";

const EditorDeckName = () => {
    const { name, setName } = useContext(DeckEditorContext);

    return <div className={style.name}>
        <FieldHeader title={'Nombre del Maso'} />
        <InputText
            placeholder={'nombre'}
            className={style.name}
            value={name}
            onChange={setName}
        />
    </div>
}

export default EditorDeckName;