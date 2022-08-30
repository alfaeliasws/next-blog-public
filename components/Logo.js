import Link from 'next/link'

export default function Logo(){
    return (
    <Link href="/">
        <a>
            <div className="uppercase md:text-lg font-regular tracking-large text-white pt-8 lg:pl-20 md:pl-12 md:pb-5 pl-10 sm:text-lg">
                Alfaelias
            </div>
        </a>
    </Link>
    )
}