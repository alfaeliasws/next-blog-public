import classNames from "classnames";
import Paragraph from "./Paragraph";

export default function Footer({className}){
    return (
        <div className={classNames("min-h-[100px] bg-main-50 text-center py-9 mt-5",className)}>
            <Paragraph className="text-sm mx-2 sm:text-md tracking-kindof">Designed and Created By:</Paragraph>
            <Paragraph className="text-sm mx-2 sm:text-md tracking-large uppercase pb-2">ALFAELIAS</Paragraph>
            <Paragraph className="text-sm mx-2 sm:text-md tracking-kindof opacity-20">Technology used in creating this website:</Paragraph>
            <Paragraph className="text-sm mx-5 sm:text-md tracking-kindof opacity-20 pb-5">Figma (UI Design), Next.js (Web Development Framework), Tailwindcss (Styling Framework) & Notion (Database)</Paragraph>
        </div>
    )
}