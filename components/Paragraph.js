import classNames from "classnames"

export default function Paragraph({children, className}){
    return (
        <p className={classNames("text-sm font-regular text-white",className)}>
            {children}
        </p>
    )
}

export function BulletedList({children, className}){
    return (
        <li className={classNames("text-md font-regular text-white tracking-widest w-full",className)}>
            {children}
        </li>
    )
}

export function ContentParagraph({children, className}){
    return (
        <p className={classNames("md:text-lg font-regular text-white tracking-widest w-full md:leading-10 leading-9 ",className)}>
            {children}
        </p>
    )
}

export function ContentWithLink({children, className}){
    return (
        <p className={classNames("md:text-lg font-regular text-white tracking-widest md:leading-10 leading-9 ",className)}>
            {children}
        </p>
    )
}

export function Title({children, className}){
    return (
        <p className={classNames("text-4xl font-semibold text-white tracking-widest",className)}>
            {children}
        </p>
     )
}

export function ContentH1({children, className}){
    return (
        <p className={classNames("text-3xl font-semibold text-white tracking-widest",className)}>
            {children}
        </p>
     )
}

export function ContentH2({children, className}){
    return (
        <p className={classNames("text-xl font-regular text-white tracking-wider",className)}>
            {children}
        </p>
    )
}

export function ContentH3({children, className}){
    return (
        <p className={classNames("text-lg font-regular text-white tracking-wider",className)}>
            {children}
        </p>
    )
}
