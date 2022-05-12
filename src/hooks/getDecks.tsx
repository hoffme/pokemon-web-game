import {useCallback, useEffect, useState} from "react";

import DecksService, {Deck} from "../services/decks";

const useGetDecks = (): [boolean, Deck[]] => {
    const [loading, setLoading] = useState(false);
    const [decks, setDecks] = useState<Deck[]>([]);

    const refresh = useCallback(() => {
        setLoading(true);

        DecksService.Decks()
            .then(setDecks)
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        refresh();

        return () => {}
    }, [refresh])

    useEffect(() => {
        const createSub = DecksService.events.create.subscribe(() => refresh());
        const updateSub = DecksService.events.update.subscribe(() => refresh());
        const removeSub = DecksService.events.remove.subscribe(() => refresh());

        return () => {
            createSub.unsubscribe();
            updateSub.unsubscribe();
            removeSub.unsubscribe();
        }
    }, [refresh])

    return [loading, decks];
}

export default useGetDecks;