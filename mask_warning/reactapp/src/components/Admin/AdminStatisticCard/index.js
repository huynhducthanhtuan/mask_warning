import styles from "./StatisticCard.module.css"

const StatisticCard = ({iconLink, cardName, data, dataType}) => {
    return(
        <div className={styles.cardMain}>
            <img src={iconLink}/>
            <p>{cardName}</p>
            <p>{data}{dataType}</p>
        </div>
    )
}
export default StatisticCard;