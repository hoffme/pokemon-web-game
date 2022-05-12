import {useState} from "react";

import {Deck} from "../../services/decks";

import {PrimaryButton} from "../../components/commons/buttons/main";
import SelectDeck from "../../components/customs/decks/select";
import EditorDeck from "../../components/customs/decks/editor";

import style from './style.module.scss';

const DecksPage = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [deck, setDeck] = useState<Deck | undefined>(undefined);

    const handleNewDeck = () => {
        setDeck(undefined);
        setShowEditor(true);
    }

    const handleSaveEditor = (d: Deck) => {
        setDeck(d);
    }

    const handleCloseEditor = () => {
        setDeck(undefined);
        setShowEditor(false);
    }

    const handleSelectDeck = (d: Deck) => {
        setDeck(d)
        setShowEditor(true);
    }

    return <div className={style.container}>
        <div className={style.left}>
            <PrimaryButton
                className={style.create}
                onClick={handleNewDeck}
                children={'Nuevo Mazo'}
            />
            <SelectDeck
                className={style.select}
                onSelect={handleSelectDeck}
                value={deck}
            />
        </div>
        <div className={style.right}>
            {
                showEditor ?
                    <EditorDeck
                        className={style.editor}
                        deck={deck}
                        onSave={handleSaveEditor}
                        onCancel={handleCloseEditor}
                    /> :
                    <label
                        className={style.empty}
                        children={'Seleccione o cree un mazo para modificarlo'}
                    />
            }
        </div>
    </div>
}

export default DecksPage;