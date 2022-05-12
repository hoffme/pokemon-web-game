import {useContext} from "react";

import {Card} from "../../../../services/cards";

import DeckEditorContext from "./context";

import {PrimaryButton, SecondaryButton} from "../../../commons/buttons/main";

import style from './style.module.scss';

interface Props {
    card: Card
}

const DeckCard = (props: Props) => {
    const { hasCard, addCard, remCard } = useContext(DeckEditorContext);

    const selected = hasCard(props.card);

    return <div className={style.card}>
        <div className={style.img}>
            <img src={props.card.img} alt={''} />
        </div>
        {
            selected ?
                <SecondaryButton
                    className={style.button}
                    children={'Remover'}
                    onClick={() => remCard(props.card)}
                /> :
                <PrimaryButton
                    className={style.button}
                    children={'Agregar'}
                    onClick={() => addCard(props.card)}
                />
        }
    </div>
}

export default DeckCard;