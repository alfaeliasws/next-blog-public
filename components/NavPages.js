import classNames from "classnames";
import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";
import { useState } from "react";

export default function NavPages({childToParent, className}){
    const [offCanvas, setOffCanvas] = useState(false)

    return (
        <div className={classNames("flex bg-main-300 text-white text-xl text-center h-[120px] rounded-br-2xl rounded-bl-2xl shadow-skill",className)}>
            <div className="w-2/12 pt-4">
                <Logo />
            </div>
            <div className="sm:w-5/12 lg:w-8/12 md:w-4/12 flex justify-center items-center pt-1 pl-12 xl:visible invisible">
                <Search childToParent={childToParent} className2="h-[45px] lg:w-[280px] w-[0px] 2xl:w-[380px]" />
            </div>
            <div className="lg:w-5/12 md:visible invisible">
                <Nav/>
            </div>

            <div className="absolute md:hidden w-full top-12 right-8 flex justify-end">
                    <img src="/menu.svg" alt="" className="h-[25px]" onClick={() => setOffCanvas(true)}/>
            </div>

            <div className={classNames("fixed text-xl bg-main-200 z-10 top-0 h-full w-full md:hidden transition-all", offCanvas ? "right-0" : "-right-full")}>
                <img src="/x.svg" alt="" className="absolute top-10 right-10 bg-transparent" onClick={() => setOffCanvas(false)} />
                <div onClick={() => setOffCanvas(false)}>
                    <Nav className="flex-col text-white space-y-8 justify-center pt-24"/>
                </div>
            </div>
        </div>
    )
}