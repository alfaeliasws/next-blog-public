import NavItem from "./NavItem";
import classNames from "classnames";

export default function Nav({ className }){
    return (
        <ul className={classNames("sm:flex lg:space-x-[45px] pt-[45px] pl-[20px] justify-center md:space-x-7 md:pr-7 lg:pr-20",className)}>
            <NavItem href="/" >Home</NavItem>
            <NavItem href="/posts">Posts</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="https://alfaeliasws.netlify.app/">Profile</NavItem>
            <NavItem href="https://alfaeliasws.netlify.app/#Contact">Contact</NavItem>
        </ul>
    )
}