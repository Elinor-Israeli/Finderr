import { useEffect, useState } from 'react'
import { categories } from '../../utils/ui'
import useOnSetFilter from '../../utils/hooks'

export function GigCategoryMenu() {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900)
    const onSetFilter = useOnSetFilter()
   
    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 900)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            <nav>
                <ul className="categories2" id="categories2" >
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => onSetFilter({categories: category.categories})} className="card-container">
                            {isWideScreen ? (
                                <li className="card">
                                    <a href="#">
                                        <img src={category.imgSrc} alt={category.title} loading="lazy" className="z0qhg80" />
                                        <span>{category.title}</span>
                                    </a>
                                </li>
                            ) : (
                                <>
                                    <li className="card">
                                        <img src={category.imgSrc} alt={category.title} loading="lazy" className="z0qhg80" />
                                    </li>
                                    <a href="#">{category.title}</a>
                                </>
                            )}
                        </div>
                    ))}
                </ul>
            </nav>
        </>
    )
}
