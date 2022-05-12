import {useContext, useState} from "react";

import DeckEditorContext from "./context";

import {PrimaryButton, SecondaryButton} from "../../../commons/buttons/main";
import Loading from "../../../commons/loading";

import style from "./style.module.scss";

const EditorDeckAction = () => {
    const { enableSave, save, cancel } = useContext(DeckEditorContext);

    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);

        save().finally(() => setLoading(false));
    }

    return <div className={style.actions}>
        <SecondaryButton onClick={cancel}>Cancelar</SecondaryButton>
        {
            enableSave &&
                <PrimaryButton
                    onClick={handleSave}
                    children={ loading ? <Loading light /> : 'Guardar' }
                />
        }
    </div>
}

export default EditorDeckAction;