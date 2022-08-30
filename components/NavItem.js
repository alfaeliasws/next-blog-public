import Link from "next/link"
import classNames from "classnames"

export default function NavItem({ href, children, className }){
    return (
        <li><Link href={href}><a className={classNames("tracking-widest transition text-md sm:text-sm lg:text-md xl:text-lg text-opacity-70 font-regular hover:opacity-50",className)}>{ children }</a></Link></li>
    )
}