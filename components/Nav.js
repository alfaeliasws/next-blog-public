import NavItem from "./NavItem";
import classNames from "classnames";
import { useRouter } from "next/router";


export default function Nav({ className }){
    const router = useRouter();

    return (
        <ul className={classNames("sm:flex lg:space-x-[45px] pt-[45px] pl-[20px] justify-center md:space-x-7 md:pr-7 lg:pr-20",className)}>
            <NavItem href="/" >Home</NavItem>
            <NavItem href="/posts">Posts</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="https://alfaeliasws.netlify.app/">Profile</NavItem>
            <NavItem href="https://alfaeliasws.netlify.app/#Contact">Contact</NavItem>
            {   router.pathname !== `/login` ? <NavItem href="/login">Login</NavItem> : "" }
            {   router.pathname !== `/register` ? <NavItem href="/register">Register</NavItem> : "" }
        </ul>
    )
}