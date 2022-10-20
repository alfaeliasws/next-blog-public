import ContentCard from '../components/ContentCard'
import { getProperties } from "./api/GetAllStaticProps";
import { getPages } from "./api/GetPropsId";
import Footer from '../components/Footer';
import { useState } from 'react';
import NavPages from '../components/NavPages';
import AboutContent from '../components/AboutContent';
import Search from '../components/Search';

export default function About({mappedDatabase}) {
    const [data, setData] = useState('');

    function childToParent(childData){
    setData(childData)
    }

    const filteredDatabase = mappedDatabase.filter((page) => {
        return page.title.toLowerCase().includes(data.toLowerCase()) || page.desc.toLowerCase().includes(data.toLowerCase())
    })

    return (
        <div className="bg-main-200 min-h-screen overflow-x-auto overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-main-50">
            <NavPages childToParent={childToParent}/>
            <Search childToParent={childToParent} className2="h-[45px] w-[250px] xl:hidden lg:w-[340px] w-full mx-auto my-10" />
            { 
            data === '' ?
            <div className="flex 2xl:my-0 xl:pt-20 2xl:py-0 2xl:min-h-[700px]  sm:mx-15 mx-12 xl:my-1 md:mx-24 lg:my-2 md:my-10 md:px-5 md:py-5 flex-wrap">
                <AboutContent />
            </div> : 
            filteredDatabase.length !== 0 ? <div></div> : <div className="min-h-[300px] py-[210px] flex text-white text-4xl justify-center items-center tracking-widest uppercase w-full">Not Found ...</div>
            }
            <div className="xl:mt-14 flex flex-wrap justify-center w-full">
            {filteredDatabase.map(page =>
            {
                return (
                    <ContentCard imgSrc={page.cover} title={page.title} headline={page.desc} slug={page.slugz}/>
                )
            }
            ).slice(0,3)}
            </div>
            <div className="w-full object-fill">
                <Footer />
            </div>
        </div>
    )
}

export async function getStaticProps() {
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

    return {props:  {mappedDatabase}
    }
}