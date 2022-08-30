import { getProperties } from "../../pages/api/GetAllStaticProps";
import { getPages } from "../../pages/api/GetPropsId";
import NavPages from "../../components/NavPages";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN });
import { useState } from "react";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import Paragraph, { BulletedList, ContentH1, ContentH2, ContentH3, ContentParagraph } from "../../components/Paragraph";
import Search from "../../components/Search";

export default function BlogPage({mappedContents, displayedPage, mappedDatabase}){
    const [data, setData] = useState('');

    function childToParent(childData){
        setData(childData)
    }

    const filteredDatabase = mappedDatabase.filter((page) => {
        return page.title.toLowerCase().includes(data.toLowerCase()) || page.desc.toLowerCase().includes(data.toLowerCase())
    })


    return (
    // <pre>{JSON.stringify(images, null, 2)}</pre>
    <div className="bg-main-200 min-h-screen overflow-x-auto overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-main-50">
        <NavPages childToParent={childToParent}/>
        <Search childToParent={childToParent} className2="h-[45px] w-[250px] lg:w-[300px] xl:invisible w-full mx-auto my-10 xl:hidden" />
        { data === '' ? 
        <content className="flex mx-12 sm:mx-24 my-10 sm:px-5 py-5 min-h-screen flex-wrap">
            <ContentH1 className="uppercase mb-12 sm:text-left text-center">{displayedPage.title}</ContentH1>
            {
                mappedContents.map(blocks => {
                    if(blocks.type === "paragraph") return <ContentParagraph className="mb-7">{blocks.content}</ContentParagraph>
                    if(blocks.type === "heading_1") return <ContentH1 className="mb-7">{blocks.content}</ContentH1>
                    if(blocks.type === "heading_2") return <ContentH2 className="mb-7">{blocks.content}</ContentH2>
                    if(blocks.type === "heading_3") return <ContentH3 className="mb-7">{blocks.content}</ContentH3>
                    if(blocks.type === "bulleted_list_item") return <BulletedList className="mb-2">{blocks.content}</BulletedList>
                    if(blocks.type === "quote") return <ContentParagraph className="italic mb-7 whitespace-pre-line	">{blocks.content}</ContentParagraph>
                    if(blocks.type === "image") return <div className="flex flex-wrap justify-center"><img src={blocks.content} className="h-[350px] rounded-xl"/><br/><Paragraph className="opacity-20 mb-1"><a href={blocks.content}>{blocks.content}</a></Paragraph></div>
                })
            }
        </content> : filteredDatabase.length !== 0 ? <div></div> : <div className="min-h-screen flex text-white text-4xl justify-center items-center tracking-widest uppercase w-full">Not Found ...</div>
        }
        <div className="mt-20 flex flex-wrap justify-center w-full">
            {filteredDatabase.map(page =>
            {
                return (
                    <ContentCard imgSrc={page.cover} key={page.pageId} title={page.title} headline={page.desc} slug={page.slugz}/>
                )
            }
            ).slice(0,3)}
        </div>
        <Footer/>
    </div>
)}


export async function getServerSideProps(context) {
    const slug = context.params.slug

    const database = await getPages()
    const dateId = process.env.NEXT_PUBLIC_NOTION_DATE
    const titleId = process.env.NEXT_PUBLIC_NOTION_TITLE
    const coverId = process.env.NEXT_PUBLIC_NOTION_COVER
    const descId = process.env.NEXT_PUBLIC_NOTION_DESC
    const slugzId = process.env.NEXT_PUBLIC_NOTION_SLUGZ

    const mappedDatabase = await Promise.all(database.map(async (page) => {
        const pageId = page.properties.pageId
        const date = await getProperties(pageId, dateId)
        const title = await getProperties(pageId, titleId)
        const cover = await getProperties (pageId, coverId)
        const desc = await getProperties (pageId, descId)
        const slugz = await getProperties(pageId,slugzId)

    return {title: title.results[0].title.text.content ,
            pageId,
            date: date.date.start,
            cover: cover.url,
            desc: desc.results[0].rich_text.text.content,
            slugz: slugz.formula.string}
    })).catch(function(err){
        console.log(err.message)
    })

    const displayedPage = mappedDatabase.filter((page) => {
        return page.slugz.toLowerCase() === slug.toLowerCase()
    })

    const page = await notion.blocks.children.list({ block_id: `${displayedPage[0].pageId}`})

    const mappedContents = page.results
    .filter((page) => {
        return page.type !== "callout" && page.type !== "toggle" &&  page.type !== "code" && page.type !== "child_database" && page.type !== "embed"
    })
    .map((page) => {
        const content = page.paragraph?.rich_text[0].plain_text || page.heading_1?.rich_text[0].plain_text || page.heading_2?.rich_text[0].plain_text || page.heading_3?.rich_text[0].plain_text || page.bulleted_list_item?.rich_text[0].plain_text || page.quote?.rich_text[0].plain_text || page.image?.external.url
        return {
            type : page.type,
            content: content
        }
    })

    return {props:  {mappedDatabase, displayedPage: displayedPage[0], mappedContents}
    }
}