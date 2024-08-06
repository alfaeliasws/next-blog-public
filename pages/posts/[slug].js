import { getProperties } from "../../pages/api/GetAllStaticProps";
import { getPages } from "../../pages/api/GetPropsId";
import NavPages from "../../components/NavPages";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_TOKEN });
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import ContentCard from "../../components/ContentCard";
import Paragraph, { BulletedList, ContentH1, ContentH2, ContentH3, ContentParagraph, Title, ContentWithLink } from "../../components/Paragraph";
import Search from "../../components/Search";
import Link from "next/link";

export default function BlogPage({details}){
    const [data, setData] = useState('');

    useEffect(() => {
        document.title = `${details.displayedPage.title} - Alfaelias' Blog`
    })

    function childToParent(childData){
        setData(childData)
    }

    const filteredDatabase = details.mappedDatabase.filter((page) => {
        return page.title.toLowerCase().includes(data.toLowerCase()) || page.desc.toLowerCase().includes(data.toLowerCase())
    })

    const newMap = []

    details.mappedContents.map(blocks => {
            if(blocks.type === "paragraph" && typeof blocks.content === "string") {return newMap.push(<ContentParagraph className="mb-7">{blocks.content}</ContentParagraph>)}
            if(blocks.type === "paragraph" && typeof blocks.content === "object") {
                return newMap.push(
                <ContentWithLink class="w-full">
                    {blocks.content.map(p => {
                        if(typeof p === "string") {return <span>{p}</span>}
                        if(typeof p === "object") {return <span><Link href={p.href}><a className="opacity-50">{p.content}</a></Link></span>}
                    })
                    }
                </ContentWithLink>
            )}
            if(blocks.type === "heading_1") return newMap.push(<ContentH1 className="mb-7">{blocks.content}</ContentH1>)
            if(blocks.type === "heading_2") return newMap.push(<ContentH2 className="mb-7">{blocks.content}</ContentH2>)
            if(blocks.type === "heading_3") return newMap.push(<ContentH3 className="mb-7">{blocks.content}</ContentH3>)
            if(blocks.type === "bulleted_list_item") return newMap.push(<BulletedList className="mb-2">{blocks.content}</BulletedList>)
            if(blocks.type === "quote") return newMap.push(<ContentParagraph className="italic mb-7 whitespace-pre-line	">{blocks.content}</ContentParagraph>)
            if(blocks.type === "image") return newMap.push(<div className="flex flex-wrap justify-center"><img src={blocks.content} alt="Photos Not Loaded" className="h-[350px] rounded-xl"/><br/><Paragraph className="opacity-20 mb-1"><a href={blocks.content}>{blocks.content}</a></Paragraph></div>)
        })
    return (
    // <pre>{JSON.stringify(images, null, 2)}</pre>
    <div className="bg-main-200 min-h-screen overflow-x-auto overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-main-50">
        <NavPages childToParent={childToParent}/>
        <Search childToParent={childToParent} className2="h-[45px] w-[250px] lg:w-[300px] xl:invisible w-full mx-auto my-10 xl:hidden" />
        { data === '' ? 
        <main className="flex mx-12 sm:mx-40 my-10 sm:px-5 py-5 min-h-screen flex-wrap">
            <Title className="uppercase mb-12 sm:text-left text-center w-full">{details.displayedPage.title}</Title>
            {newMap}
        </main> : filteredDatabase.length !== 0 ? <div></div> : <div className="min-h-screen flex text-white text-4xl justify-center items-center tracking-widest uppercase w-full">Not Found ...</div>
        }
        <div className="mt-20 flex flex-wrap justify-center w-full">
            {filteredDatabase.map(page =>
            {
                return (
                    <ContentCard imgSrc={page.cover} title={page.title} headline={page.desc} slug={page.slugz}/>
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

    async function pageData(page){
        const pageId = page.properties.pageId

        const data = {}

        const date = getProperties(pageId, dateId)
        const title = getProperties(pageId, titleId)
        const cover = getProperties (pageId, coverId)
        const desc = getProperties (pageId, descId)
        const slugz = getProperties(pageId,slugzId)

        const results = await Promise.all([date, title, cover, desc, slugz])
        results.forEach((item) => {
            if (item.type === "date") {
                return data[item.type] = item.date.start
            } 
            if (item.results && item["property_item"].type === "title") {
                return data["title"] = item.results[0].title.text.content
            }
            if (item.type  === "url") {
                return data["cover"] = item.url
            }
            if (item.results && item["property_item"].type === "rich_text") {
                return data["desc"] = item.results[0].rich_text.text.content
            }
            if (item.type === "formula") {
                return data["slugz"] = item.formula.string
            }
        })

        return{...data,pageId}
    }

    const database2 = database.map(page => pageData(page))

    const results = await Promise.all(database2)

    // const resultsKeyword = results.map((data) =>
    //     {
    //         const slugKeyword = data.slugz.toLowerCase().split("-")
    //         const descKeyword = data.desc.toLowerCase().split(" ")
    //         const keyword = slugKeyword.concat(descKeyword)
    //     }
    // )

    const displayedPage = await Promise.all(results.filter((page) => {
        return page.slugz.toLowerCase() === slug.toLowerCase()
    }))

    // console.log(displayedPage)

    const getAPage = async() => {
        const result = await notion.blocks.children.list({ block_id: `${displayedPage[0].pageId}`})
        return result
    }

    const pageContent = await getAPage()

    const mappedContents = pageContent.results
            .filter((page) => {
                return page.type !== "callout" && page.type !== "toggle" &&  page.type !== "code" && page.type !== "child_database" && page.type !== "embed"
            })
            .map((page) => {
                const check = page.paragraph?.rich_text
                const content = 
                    (check.toString() === "[]" || "" )
                    || ((check?.length == 1 || !page.paragraph) ? page.paragraph?.rich_text[0].plain_text : check?.map(p =>
                    {
                        if(p.href === null) return p.plain_text
                        if(p.href !== null) return {href: p.href, content: p.plain_text}
                    }))
                    || page.heading_1?.rich_text[0].plain_text
                    || page.heading_2?.rich_text[0].plain_text
                    || page.heading_3?.rich_text[0].plain_text
                    || page.bulleted_list_item?.rich_text[0].plain_text
                    || page.quote?.rich_text[0].plain_text
                    || page.image?.external.url
                return {
                    type: page.type,
                    content: content,
                    check: page.paragraph ? page.paragraph : ""
                }
            })

    return {props:  {details: {mappedContents, results, displayedPage: displayedPage[0], slug}}
    }
}
