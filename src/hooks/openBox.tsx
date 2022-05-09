import {useState} from "react";

import CardsService, {Box} from "../services/cards";

const useOpenBox = (): [(t: string) => void, boolean, Box | undefined, () => void] => {
    const [loading, setLoading] = useState(false);
    const [box, setBox] = useState<Box | undefined>(undefined);

    const open = async (boxTypeId: string) => {
        setLoading(true);

        try {
            setBox(await CardsService.OpenBox(boxTypeId));
        } catch (e: any) {
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const clear = () => setBox(undefined);

    return [open, loading, box, clear];
}

export default useOpenBox;