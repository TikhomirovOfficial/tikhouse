import clsx from "clsx";
export default function Button ({children, disabled, className, onClick}) {
    return (
        <button onClick={onClick} disabled={disabled} className={clsx(className)}>
            {children}
        </button>
    )
}