import classNames from "classnames";
import Link from "next/link";
import Paragraph from "./Paragraph";

export default function ContentCard({className, imgSrc, title, headline, slug}){

return (
    <div className={classNames("mx-5 flex 2xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-full flex-wrap sm:max-w-[280px] sm:max-h-[300px] max-w-[380px] md:max-h-[550px] md:max-w-[340px] shadow-skill bg-main-100 min-h-[450px] rounded-lg mb-10 hover:pb-4 hover:-mt-4 hover:mb-6 hover:cursor-pointer hover:bg-neutral-800 transition-all hover:align-middle",className)}>
        <Link href={`/posts/${slug}`} className="cursor-pointer">
        <div className="mx-5 w-full my-5 flex flex-wrap">
            <div className="h-[350px] md:h-[350px] sm:h-[250px] flex w-full">
                <Link href={`/posts/${slug}`}><a className="w-full">
                    <img alt="" src={imgSrc} className="object-none w-full rounded-lg h-[350px] sm:h-[250px] md:h-[350px] text-center transition-all hover:brightness-115"/>
                </a></Link>
            </div>
            <div className="mt-5 w-full flex flex-wrap min-h-[120px]">
                <Link href={`/posts/${slug}`}><a className="max-h-[36px] h-[36px]">
                    <Paragraph className="w-full uppercase text-lg tracking-kinda transition-all card-title">{title}</Paragraph>
                </a></Link>
                <Paragraph className="w-full tracking-kinda leading-7 self-start h-[84px]">{headline}</Paragraph>
            </div>
        </div>
        </Link>
    </div>
)
}