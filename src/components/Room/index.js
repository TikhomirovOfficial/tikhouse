import styles from './room.module.scss'
import BackButton from "../BackButton";
export default function Room ({title}) {
    return (
        <div className="flex-column h-100p">
            <div className="wrapper w-100p">
                <BackButton href={'/rooms'} title={"All rooms"}/>
            </div>
            <div className={styles.Room}>
                <div className="wrapper">
                    <div className="flex-row-betw">
                        <h1>
                            {title}
                        </h1>
                        <button className={styles.leave}>
                            Leave queitly
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}