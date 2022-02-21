import styles from './whiteblock.module.scss'
import clsx from "clsx";

export default function StepWrapper ({children, className}) {
    return (
        <div className={clsx(styles.whiteblock, className)}>
            {children}
        </div>
    );
}