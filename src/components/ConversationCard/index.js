import styles from './conversationCard.module.scss'
import clsx from "clsx";

export default function ConversationCard({
    title,
    avatars = [],
    users = [],
    usersCount,
    messagesCount
    }) {
    return (
        <div className={clsx('gap-20', 'bg-white', 'flex-column', styles.cardConversation)}>
            <h2>{title}</h2>
            <div style={{flex: 0.9}} className="d-f gap-20">
                <div className={styles.avatars}>
                    {
                        avatars.map((val, index) => (
                            <img
                                key={index}
                                src={val}
                                className={avatars.length === 1 ? styles.avatarSingle : styles.avatarEl}
                                alt=""/>
                        ))
                    }

                </div>
                <div className={clsx('flex-column gap-20 js-between', styles.cardContent)}>
                    <ul className="flex-column gap-5">
                        {
                            users.map((val, index) => (
                                <li key={index}>{val}</li>
                            ))
                        }
                    </ul>
                    <div className="d-f gap-15">
                        <div className={styles.infoItem}>
                            {usersCount}
                            <img src="static/img/userIcon.svg" alt=""/>
                        </div>
                        <div className={styles.infoItem}>
                            {messagesCount}
                            <img src="static/img/messageIcon.svg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}