import {createContext, ReactNode, useEffect, useState} from "react";

import DecksService, {Card, Deck} from "../../../../services/decks";

interface DeckEditorContextI {
    status?: string
    enableSave: boolean
    name: string
    cards: Card[]
    setName: (name: string) => void
    hasCard: (card: Card) => boolean
    addCard: (card: Card) => void
    remCard: (card: Card) => void
    save: () => Promise<void>
    cancel: () => void
}

const DeckEditorContext = createContext<DeckEditorContextI>({
    status: undefined,
    enableSave: false,
    name: '',
    cards: [],
    setName: () => {},
    hasCard: () => false,
    addCard: () => {},
    remCard: () => {},
    save: async () => { throw new Error('deck not implemented') },
    cancel: () => {}
})

interface Props {
    deck?: Deck
    children?: ReactNode
    onSave?: (deck: Deck) => void
    onCancel?: () => void
}

const DeckEditorProvider = (props: Props) => {
    const [status, setStatus] = useState<string | undefined>(undefined);

    const [name, setName] = useState<string>('');
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        setName(props.deck?.name || '');
        setCards(props.deck?.cards || []);

        return () => {}
    }, [props])

    useEffect(() => {
        let newStatus: string | undefined = undefined;

        if (name.length < 3) newStatus = 'Nombre del Mazo corto';
        else if (cards.length !== 10) newStatus = 'El mazo debe contener 10 cartas';

        setStatus(newStatus);

        return () => {}
    }, [setStatus, name, cards])

    const hasCard = (card: Card) => {
        return !!cards.find(c => c.id === card.id);
    }

    const addCard = (card: Card) => {
        setCards([...cards, card]);
    }

    const remCard = (card: Card) => {
        setCards(cards.filter(c => c.id !== card.id));
    }

    const save = async (): Promise<void> => {
        let deck: Deck;

        if (props.deck) deck = await DecksService.Update({ id: props.deck.id, name, cards });
        else deck = await DecksService.Create({ name, cards });

        props.onSave?.(deck)
    }

    const cancel = async (): Promise<void> => {
        props.onCancel?.();
    }

    const enableSave = !status && (props.deck?.name !== name || props.deck.cards !== cards);

    return <DeckEditorContext.Provider value={{
        status,
        enableSave,
        name,
        cards,
        setName,
        hasCard,
        addCard,
        remCard,
        save,
        cancel
    }}>
        { props.children }
    </DeckEditorContext.Provider>
}

export default DeckEditorContext;
export {
    DeckEditorProvider
}