import { GigPreview } from "./GigPreview"
import { Link } from 'react-router-dom'


export function GigList({ gigs }) {
    return (
        
    <div className="gig-list-container">
         <nav className='nav-links'>
                <Link to="/"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.666 13.548H3.333a.667.667 0 01-.667-.666v-6h-2L7.552.621a.667.667 0 01.897 0l6.885 6.26h-2v6a.667.667 0 01-.667.666zm-4-1.333H12V5.653L8 2.017 4 5.653v6.562h3.333v-4h1.333v4z" fill="#404145"/></svg></Link>
                {' / '}
                <Link to="/graphics-design">Graphics & design</Link>
                {' / '}
                <Link to="/gig">Logo Design</Link>
            </nav>
            <h1 className="topic-head">Minimalist logo design</h1>
            <p className="topic-explain">Let us help you give your brand the best minimalist logo design by hiring an expert minimalist logo designer.

</p>
    <ul className="gig-list">
        {gigs.map(gig =>
            <li className="gig-preview" key={gig._id}>
                <GigPreview gig={gig} />
            </li>)}
    </ul>
    </div>
    )
}