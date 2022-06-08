import styles from './header.module.scss'
export default function Header({fullname}) {
    return (
        <header className={styles.header}>
            <div className="wrapper flex-row-betw">
                <div className="d-f gap-10 al-center">
                    <div style={{fontSize: 24}}>
                        👋
                    </div>
                    <h2>ClubHouse</h2>
                </div>
                <div className="d-f gap-10 al-center">
                    <h3>{fullname}</h3>
                    <img width={45} height={45} src="/static/img/primaryAvatar.png" className={styles.avatar} alt=""/>
                </div>
            </div>
        </header>

    )
}