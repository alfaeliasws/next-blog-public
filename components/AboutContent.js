import { ContentH1, ContentParagraph } from "./Paragraph";

export default function AboutContent(){
    return (
        <div className="w-full 2xl:mt-20 mb-10">
            <ContentH1 className="text-center sm:text-left">ABOUT</ContentH1>
            <ContentParagraph className="pt-5 pb-3" >I am Alfaelias Waristino Simanjuntak, a generalist.</ContentParagraph>
            <ContentParagraph className="pt-0" >My love of learning new things is the one that makes me create this blog. I started learning coding 3 months ago and I love to do it too. This blog is my pilot project that can be maintained over time and I enjoy to maintain it too.</ContentParagraph>
            <ContentParagraph className="pt-4 pb-3" >Why blog?</ContentParagraph>
            <ContentParagraph className="pt-0" >Other than coding I have many things as my hobby too, and I think there should be a way for everything that I learnt to be useful, at least for me in the future, and hopefully many people, in the form of writings. The other reason is I want to make a project that can be use not just to have a job or earnings, but I would love to have project that I really love to maintain and it can be the project that enhance my creativity.</ContentParagraph>
            <p className="pt-4"> </p>
            <ContentParagraph className="pt-0">This project is the slice of my interests, there will be variation of topics in this content. This blog will cover the topics of music, fiction, technology, philosophy, Chritianity, productivity, applications and my view about many things.</ContentParagraph>
            <p className="pt-4"> </p>
            <ContentParagraph className="pt-0">In technology and coding perspective, this project is for my curiosity perspective. This blog is created with using Next.js and Notion as database. And I will explore in features and maybe interesting frameworks.</ContentParagraph>
            <p className="pt-4"> </p>
            <ContentParagraph className="pt-0">I hope this blog can make people understand about being a generalist in the world that still wanting specialist even though the world needs both. And I hope people that is generalist will not get their spirit down, because it is a blessing to be this curious.</ContentParagraph>
        </div>
    )
}