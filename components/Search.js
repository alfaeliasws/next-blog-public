import { useState, useEffect } from "react";
import classNames from "classnames";

export default function Search({ className, childToParent, className2 }){
    const [ value, setValue ] = useState("")

    function onChangeHandler (e) {
        e.preventDefault()
        setValue(e.target.value)
    }

    useEffect(() => {
        childToParent(value)
    }, [value]);

    return (
        <div className={classNames("flex h-[45px] w-[300px] bg-main-50 px-2 pt-2 pb-1 rounded-xl shadow-skill pr-5", className2)}>
            <div className="w-2/12">
                <img alt="" src="/search.png" className="h-[30px] pt-1 ml-1 pb-1"/>
            </div>
            <div className="w-10/12">
                <input onChange={onChangeHandler} value={value} type="text" className={classNames("w-full pt-[6px] text-white tracking-kinda pb-2 bg-main-50 text-sm placeholder-gray-600", className)} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Search All Blog Posts...'}/>
            </div>
        </div>
    )
}