import {useEffect, useState} from "react";

import CardsService, {Card} from "../services/cards";

const useGetCards = (): [boolean, Card[]] => {
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        setLoading(true);

        CardsService.UserCards()
            .then(setCards)
            .finally(() => setLoading(false))

    }, [])

    return [loading, cards];
}

export default useGetCards;