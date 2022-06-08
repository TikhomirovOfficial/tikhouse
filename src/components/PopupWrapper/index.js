import clsx from "clsx";
import styles from "../PopupWrapper/popup.module.scss";

export default function PopupWrapper ({children, className}) {
    return (
       <div className={`${styles.popupWrapper} w-100p p-fix h-100p f-center-col`}>
           {children}
       </div>
    );
}