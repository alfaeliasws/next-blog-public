import ContentCard from '../../components/ContentCard'
import { getProperties } from "../../pages/api/GetAllStaticProps";
import { getPages } from "../../pages/api/GetPropsId";
import Footer from '../../components/Footer';
import { useState } from 'react';
import NavPages from '../../components/NavPages';
import Search from '../../components/Search';

export default function Home({mappedDatabase}) {
  const [data, setData] = useState('');

  function childToParent(childData){
    setData(childData)
  }

  const filteredDatabase = mappedDatabase.filter((page) => {
    return page.title.toLowerCase().includes(data.toLowerCase()) || page.desc.toLowerCase().includes(data.toLowerCase())
  })

  return (
      <div className="bg-main-200 min-h-screen">
        <NavPages childToParent={childToParent}/>
        <Search childToParent={childToParent} className2="h-[45px] w-[250px] lg:w-[300px] xl:invisible w-full mx-auto my-10 xl:hidden" />
        <div className="2xl:mt-10 xl:mt-20 flex flex-wrap justify-center w-full">
            {
            filteredDatabase.length !== 0 ?
            filteredDatabase.map(page =>
            {
                return (
                    <ContentCard imgSrc={page.cover} key={page.pageId} title={page.title} headline={page.desc} slug={page.slugz}/>
                )
            }
            ).slice(0,15) :
            <div className="min-h-[300px] pb-[150px] flex text-white text-4xl justify-center items-center tracking-widest uppercase w-full">Not Found ...</div>
          }
        </div>
        <div className="w-full">
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