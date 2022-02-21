import styles from './preloaderProcess.module.scss'
export const PreloaderProcess = ({textLoading}) => {
    return (
        <div className="flex-column al-center gap-20">
            <h2>{textLoading}</h2>
            <div className={styles.ldsRipple}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}