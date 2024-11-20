
import { Link, useLocation, useParams } from 'react-router-dom'

export function GigBreadcrumbs() {
    const location = useLocation()
    const { id, title } = useParams()

    
    const pathSegments = location.pathname.split('/').filter(Boolean)

    
    const generateLink = (path, label) => (
        <Link key={path} to={`/${path}`} className="breadcrumb-link">
            {label}
        </Link>
    )

    return (
        <div className="nav-links-breadcrumb">
            <nav className="nav-breadcrumbs">
               
               

                {generateLink('', <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.666 13.548H3.333a.667.667 0 01-.667-.666v-6h-2L7.552.621a.667.667 0 01.897 0l6.885 6.26h-2v6a.667.667 0 01-.667.666zm-4-1.333H12V5.653L8 2.017 4 5.653v6.562h3.333v-4h1.333v4z" fill="#404145"/></svg>)}

               
                {pathSegments[0] === 'graphics-design' && (
                    <>
                        {' / '}
                        {generateLink('graphics-design', 'Graphics & Design')}
                    </>
                )}

               
                {pathSegments[1] && pathSegments[0] === 'gig' && (
                    <>
                        {' / '}
                        {generateLink(`gig/${id}`, title ? title : 'Logo Design')}
                    </>
                )}

               
            </nav>

            
        </div>
    )
}
