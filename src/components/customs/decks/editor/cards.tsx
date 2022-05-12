import {useState} from "react";

import useGetCards from "../../../../hooks/getCards";

import FieldHeader from "../../../commons/fields/header";
import Pagination from "../../../commons/pagination";
import Loading from "../../../commons/loading";

import DeckCard from "./card";

import style from "./style.module.scss";

const EditorDeckCards = () => {
    const [loading, allCards] = useGetCards();

    const [pageIndex, setPageIndex] = useState(0);

    const cards = allCards.slice(pageIndex * 8, (pageIndex + 1) * 8);

    return <div className={style.cards}>
        <FieldHeader title={'Cartas'}>
            <Pagination
                index={pageIndex}
                onIndex={setPageIndex}
                max={Math.trunc(allCards.length / 8) + 1}
            />
        </FieldHeader>
        <div className={style.cardsList}>
            { loading && <Loading light /> }
            {
                !loading && cards.length === 0 &&
                    <label>No hay cartas disponibles</label>
            }
            {
                !loading && cards.map((card, index) => {
                    return <DeckCard card={card} key={index} />
                })
            }
        </div>
    </div>
}

export default EditorDeckCards;