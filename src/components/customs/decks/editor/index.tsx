import {Deck} from '../../../../services/decks';

import useJoinClassNames from "../../../../hooks/className";

import {DeckEditorProvider} from "./context";

import Surface from "../../../commons/surface";

import EditorDeckAction from "./actions";
import EditorDeckName from "./name";
import EditorDeckCards from "./cards";
import EditorDeckStatus from './status';

import style from './style.module.scss';

interface Props {
    deck?: Deck
    onSave?: (deck: Deck) => void
    onCancel?: () => void
    className?: string
}

const EditorDeck = (props: Props) => {
    const containerClassName = useJoinClassNames(style.container, props.className);

    return <Surface className={containerClassName}>
        <DeckEditorProvider
            deck={props.deck}
            onSave={props.onSave}
            onCancel={props.onCancel}
        >
            <EditorDeckName />
            <EditorDeckCards />
            <EditorDeckStatus />
            <EditorDeckAction />
        </DeckEditorProvider>
    </Surface>
}

export default EditorDeck;