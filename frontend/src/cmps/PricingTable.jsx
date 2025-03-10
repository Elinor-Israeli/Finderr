import { Link } from 'react-router-dom'

export function PricingTable({ gig }) {
    
   const basicPrice = {price: gig.price, selectedPackage :'Basic'}
   const standardPrice = {price:gig.price*2, selectedPackage :'Standard'}
   const premiumPrice = {price:gig.price*3, selectedPackage :'Premium'}
    return (
        <div className="pricing-table">
            <div style={{ fontSize: '20px', scrollBehavior: 'smooth' }} id="Compare packages">Compare packages</div>
            <table>
                <thead>
                    <tr>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start' }}>
                            <p style={{ marginTop: '-1.25em' }}>Package</p>
                        </th>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}> <p style={{ textAlign: 'start', fontSize: '1.25rem' }}>${basicPrice.price}</p> Basic </th>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}> <p style={{ textAlign: 'start', fontSize: '1.25rem' }}>${standardPrice.price}</p> Standard</th>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}> <p style={{ textAlign: 'start', fontSize: '1.25rem' }}>${premiumPrice.price}</p> Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: 'none', backgroundColor: 'white' }}></td>
                        <td style={{ border: 'none', backgroundColor: 'white' }}>
                            <p>BASIC</p> <span>Basic design</span><br />
                            <span>1 graphic Icons,</span><br />
                            <span> social media design</span><br />
                            <span>basic one </span><br />
                            <span>pager design</span>
                        </td>
                        <td style={{ border: 'none', backgroundColor: 'white' }}>
                            <p>STANDARD</p> <span>Advanced design</span><br />
                            <span>1 graphic Social</span><br />
                            <span> media post</span><br />
                            <span>ads, basic</span><br />
                            <span> flyer, brochure</span>
                        </td>
                        <td style={{ border: 'none', backgroundColor: 'white' }}>
                            <p>FULL</p><span>1-2 Pro designs</span><br />
                            <span>with files </span><br />
                            <span>of all formats</span><br />
                            <span> illustration,</span><br />
                            <span>Professional logo</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Source File</td>
                        <td style={{ textAlign: 'center' }}>✔</td>
                        <td style={{ textAlign: 'center' }}>✔</td>
                        <td style={{ textAlign: 'center' }}>✔</td>
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td>High Resolution</td>
                        <td style={{ textAlign: 'center' }}>✔</td>
                        <td style={{ textAlign: 'center' }}>✔</td>
                        <td style={{ textAlign: 'center' }}>✔</td>
                    </tr>
                    <tr>
                        <td>Number of Images</td>
                        <td style={{ textAlign: 'center' }}>1</td>
                        <td style={{ textAlign: 'center' }}>1</td>
                        <td style={{ textAlign: 'center' }}>2</td>
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td>Revisions</td>
                        <td style={{ textAlign: 'center' }}>2 times </td>
                        <td style={{ textAlign: 'center' }}>3 times</td>
                        <td style={{ textAlign: 'center' }}>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Delivery Time</td>
                        <td style={{ textAlign: 'center' }}>{gig.daysToMake} days</td>
                        <td style={{ textAlign: 'center' }}>{gig.daysToMake} days</td>
                        <td style={{ textAlign: 'center' }}>{gig.daysToMake - 1} days</td>
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td style={{ textAlign: 'center' }}></td>
                        <td style={{ textAlign: 'center' }}><button><Link to={`/payment/${gig._id}?price=${basicPrice.price}&selectedPackage=${basicPrice.selectedPackage }`}>Select</Link></button></td>
                        <td style={{ textAlign: 'center' }}><button><Link to={`/payment/${gig._id}?price=${standardPrice.price}&selectedPackage=${standardPrice.selectedPackage }`}>Select</Link></button></td>
                        <td style={{ textAlign: 'center' }}><button><Link to={`/payment/${gig._id}?price=${premiumPrice.price}&selectedPackage=${premiumPrice.selectedPackage}`}>Select</Link></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

