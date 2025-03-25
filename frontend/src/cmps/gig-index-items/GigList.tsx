import { GigPreview } from "../GigPreview"
import { Gig } from '../../types/Gig'

interface GigListProps {
    gigs: Gig[]  
  }

export function GigList(props:GigListProps) {
    return ( 
    <div className="gig-list-container main layout full">
        
    <ul className="gig-list  ">
        {props.gigs.map(gig =>
            <li className="gig-preview" key={gig._id}>
                <GigPreview gig={gig} />
            </li>)}
    </ul>
    </div>
    )
}