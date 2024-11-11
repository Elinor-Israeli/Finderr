// import { GigIndex } from "./gig/GigIndex";

export function GigMenu() {
    return (
        <section className="categories-menu full main-layout">
            <button className="category-btn fa-solid chevron-left left" onClick={slideLeft}></button>
                     <ul className="categories">
                <li>Graphic & Design</li>
                <li>Digital Marketing</li>
                <li>Writing & Translation</li>
                <li>Video & Animation</li>
                <li>Music & Audio</li>
                <li>Programming & Tech</li>
                <li>Business</li>
                <li>Lifestyle</li>
                <li>Trending</li>
                </ul>
            </section>
    )
}


