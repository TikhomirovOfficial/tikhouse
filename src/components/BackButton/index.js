import clsx from "clsx";
import Link from "next/link";
export default function BackButton ({title, href}) {
    return (
        <Link href={href}>
            <a className="d-f gap-10" style={{marginBottom: 40}}>
                <img width={25} src="/static/arrow-back.svg" alt=""/>
                <h2>{title}</h2>
            </a>
        </Link>
    )
}