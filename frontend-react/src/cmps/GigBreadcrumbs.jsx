
// import { Link, useLocation, useParams } from 'react-router-dom'

// export function GigBreadcrumbs() {
//     const location = useLocation()
//     const { id, title } = useParams()

    
//     const pathSegments = location.pathname.split('/').filter(Boolean)

    
//     const generateLink = (path, label) => (
//         <Link key={path} to={`/${path}`} className="breadcrumb-link">
//             {label}
//         </Link>
//     )

//     return (
//         <div className="gig-breadcrumbs-container">
//             <nav className="nav-breadcrumbs">
               
//                 {generateLink('', <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.666 13.548H3.333a.667.667 0 01-.667-.666v-6h-2L7.552.621a.667.667 0 01.897 0l6.885 6.26h-2v6a.667.667 0 01-.667.666zm-4-1.333H12V5.653L8 2.017 4 5.653v6.562h3.333v-4h1.333v4z" fill="#404145"/></svg>)}

               
//                 {pathSegments[0] === 'graphics-design' && (
//                     <>
//                         {' / '}
//                         {generateLink('graphics-design', 'Graphics & Design')}
//                     </>
//                 )}

               
//                 {pathSegments[1] && pathSegments[0] === 'gig' && (
//                     <>
//                         {' / '}
//                         {generateLink(`gig/${id}`, title ? title : 'Logo Design')}
//                     </>
//                 )}

               
//             </nav>

            
//         </div>
//     )
// }
// import { GigPreview } from "./GigPreview"
// import { Link } from 'react-router-dom'


// export function GigBreadcrumbs({ gigs }) {
//     return (
        
//          <nav className='nav-links-breadcrumbs'>
//                 <Link to="/" className='home-breadcrumbs'>< svg width="13" height="13" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.666 13.548H3.333a.667.667 0 01-.667-.666v-6h-2L7.552.621a.667.667 0 01.897 0l6.885 6.26h-2v6a.667.667 0 01-.667.666zm-4-1.333H12V5.653L8 2.017 4 5.653v6.562h3.333v-4h1.333v4z" fill="#404145"/></svg></Link>
//                 {' / '}
//                 <Link to="/graphics-design"> Graphics & design</Link>
//                 {' / '}
//                 <Link to="/gig">Logo Design</Link>
//             </nav>
            
//     )
// }

// import { Link, useLocation, useParams } from 'react-router-dom';

// export function GigBreadcrumbs() {
//     const location = useLocation();
//     const { id, title } = useParams();

//     // Split the path into segments and filter out empty strings
//     const pathSegments = location.pathname.split('/').filter(Boolean);

//     // Helper function to generate breadcrumb links
//     const generateLink = (path, label) => (
//         <Link key={path} to={`/${path}`} className="breadcrumb-link">
//             {label}
//         </Link>
//     );

//     return (
//         <div className="gig-breadcrumbs-container">
//             <nav className="nav-breadcrumbs">
//                 {/* Home Link with SVG Icon */}
//                 {generateLink('', (
//                     <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12.666 13.548H3.333a.667.667 0 01-.667-.666v-6h-2L7.552.621a.667.667 0 01.897 0l6.885 6.26h-2v6a.667.667 0 01-.667.666zm-4-1.333H12V5.653L8 2.017 4 5.653v6.562h3.333v-4h1.333v4z" fill="#404145"/>
//                     </svg>
//                 ))}

//                 {/* Breadcrumb for Category (e.g., Graphics & Design) */}
//                 {pathSegments[0] === 'graphics-design' && (
//                     <>
//                         {' / '}
//                         {generateLink('graphics-design', 'Graphics & Design')}
//                     </>
//                 )}

//                 {/* Breadcrumb for Gig (e.g., Gig Name) */}
//                 {pathSegments[0] === 'gig' && id && (
//                     <>
//                         {' / '}
//                         {generateLink(`gig/${id}`, title || 'Gig Title')}
//                     </>
//                 )}

//                 {/* Optional: Add other breadcrumb segments for further pages if necessary */}
//             </nav>
//         </div>
//     );
// }
import { Link, useLocation, useParams } from 'react-router-dom';

export function GigBreadcrumbs() {
    const location = useLocation()
    const { id, title } = useParams()

    // Get query parameters
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const pathSegments = location.pathname.split('/').filter(Boolean);

    const generateLink = (path, label) => (
        <Link key={path} to={`/${path}`} className="breadcrumb-link">
            {label}
        </Link>
    )

    return (
        
        <div className="gig-breadcrumbs-container">
            <nav className="nav-breadcrumbs">
                {generateLink('', (
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.666 13.548H3.333a.667.667 0 01-.667-.666v-6h-2L7.552.621a.667.667 0 01.897 0l6.885 6.26h-2v6a.667.667 0 01-.667.666zm-4-1.333H12V5.653L8 2.017 4 5.653v6.562h3.333v-4h1.333v4z" fill="#404145"/>
                    </svg>
                ))}

                {category && (
                    <>
                        {' / '}
                        {generateLink(`gig?category=${category}`, category.replace('-', ' ').toUpperCase())}
                    </>
                )}

                {/* {pathSegments[0] === 'gig' && id && (
                    <>
                        {' / '}
                        {generateLink(`gig/${id}`, title || 'Gig Title')}
                    </>
                )} */}
            </nav>
        </div>
    )
}
