import BoxSrc from "../../../assets/icons/chest.png";

import {BoxType} from "../../../services/cards";

import useJoinClassNames from "../../../hooks/className";
import useOpenBox from "../../../hooks/openBox";

import {PrimaryButton} from "../../commons/buttons/main";
import Loading from "../../commons/loading";

import style from './style.module.scss';

interface Props {
    box: BoxType
    className?: string
}

const BoxCard = (props: Props) => {
    const [open, opening, box, clearBox] = useOpenBox();

    const containerClassName = useJoinClassNames(style.container, props.className);

    return <div className={containerClassName}>
        {
            box && <div className={style.box}>
                <div className={style.cards}>
                    {
                        box.cards.map((card, index) => {
                            return <img
                                className={style.card}
                                key={index}
                                src={card.img}
                                alt={'card'}
                            />
                        })
                    }
                </div>
                <PrimaryButton onClick={clearBox}>
                    Listo
                </PrimaryButton>
            </div>
        }
        <h3 className={style.title}>Caja {props.box.type}</h3>
        <label  className={style.cost}>{props.box.cost} pt</label>
        <img className={style.img} src={BoxSrc} alt={'box'} />
        <PrimaryButton className={style.button} onClick={() => open(props.box.id)}>
            { opening ? <Loading light /> : 'Abrir' }
        </PrimaryButton>

    </div>
}

export default BoxCard;