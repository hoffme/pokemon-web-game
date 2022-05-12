import { Deck } from '../../../../services/decks';

import useGetDecks from "../../../../hooks/getDecks";
import useJoinClassNames from "../../../../hooks/className";

import Loading from "../../../commons/loading";
import Surface from "../../../commons/surface";

import style from './style.module.scss';

interface Props {
    className?: string
    value?: Deck
    onSelect: (deck: Deck) => void
}

const DeckOption = (props: { deck: Deck, selected: boolean, onClick: () => void }) => {
    const containerClassName = useJoinClassNames(
        style.deck,
        props.selected ? style.selected : null
    );

    return <label onClick={props.onClick} className={containerClassName}>
        { props.deck.name }
    </label>
}

const SelectDeck = (props: Props) => {
    const [loading, decks] = useGetDecks();

    const containerClassName = useJoinClassNames(style.container, props.className);

    return <Surface className={containerClassName}>
        { loading && <Loading light /> }
        { !loading && decks.length === 0 && <label>No hay masos</label> }
        {
            !loading && decks.map((deck, index) => {
                return <DeckOption
                    key={index}
                    deck={deck}
                    selected={props.value?.id === deck.id}
                    onClick={() => props.onSelect(deck)}
                />
            })
        }
    </Surface>
}

export default SelectDeck;