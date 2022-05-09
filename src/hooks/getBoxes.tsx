import {useEffect, useState} from "react";

import CardsService, {BoxType} from "../services/cards";

const useGetBoxes = (): [boolean, BoxType[]] => {
    const [loading, setLoading] = useState(false);
    const [boxes, setBoxes] = useState<BoxType[]>([]);

    useEffect(() => {
        setLoading(true);

        CardsService.GetBoxType()
            .then(setBoxes)
            .finally(() => setLoading(false))

    }, [])

    return [loading, boxes];
}

export default useGetBoxes;