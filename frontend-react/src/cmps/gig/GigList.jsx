import { GigPreview } from "./GigPreview"
import { Link } from 'react-router-dom'


export function GigList({ gigs }) {
    console.log('GigList gigs: ', gigs)
    return (
        
    <div className="gig-list-container main layout full">
        
    <ul className="gig-list  ">
        {gigs.map(gig =>
            <li className="gig-preview" key={gig._id}>
                <GigPreview gig={gig} />
            </li>)}
    </ul>
    </div>
    )
}