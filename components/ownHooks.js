import { useEffect } from "react";

export default function useFade(something)
{

useEffect(function(){
        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add('show')
            }
            else {
                entry.target.classList.remove('show')
            }
        })
    });

    const checkElements = document.querySelectorAll(`.${something}`)
    checkElements.forEach((el) => observer.observe(el))
})

}