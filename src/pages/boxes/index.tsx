import useGetBoxes from "../../hooks/getBoxes";

import BoxCard from "../../components/customs/box";
import Loading from "../../components/commons/loading";

import style from './style.module.scss';

const BoxesPage = () => {
    const [loading, boxes] = useGetBoxes();

    return <div className={style.container}>
        { loading  && <Loading /> }
        {
            !loading && boxes.map((box, index) => {
                return <BoxCard
                    className={style.box}
                    key={index}
                    box={box}
                />
            })
        }
    </div>
}

export default BoxesPage;