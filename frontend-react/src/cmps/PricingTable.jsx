import { Link } from 'react-router-dom';

function PricingTable({ gig }) {
    const randomDiscount = Math.floor(Math.random() * (25 - 5 + 1)) + 5

   let randomValue = null

    function generateRandom(min = 20, max = 90, reset = false) {
        if (reset || randomValue === null) {
            randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return randomValue
    }

    return (
        <div className="pricing-table">
            <div style={{fontSize:'20px',  scrollBehavior: 'smooth'}} id="Compare packages">Compare packages</div>
            <table>
                <thead>
                    <tr>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start' }}>
                            <p style={{ marginTop: '-1.25em' }}>Package</p>
                        </th>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}> <p style={{ textAlign: 'start', fontSize: '1.25rem' }}>${gig.price}</p> Basic </th>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}> <p style={{ textAlign: 'start', fontSize: '1.25rem' }}>${gig.price + generateRandom(10, 50, true)}</p> Standard</th>
                        <th style={{ border: 'none', backgroundColor: 'white', textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}> <p style={{ textAlign: 'start', fontSize: '1.25rem' }}>${gig.price + generateRandom(60, 90, true)}</p> Premium</th>
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
                            <span> flyer, brochur</span>
                        </td>
                        <td style={{ border: 'none', backgroundColor: 'white' }}>
                            <p>FULL</p> <span>1-2 Pro designs</span><br />
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
                        <td style={{ textAlign: 'center' }}>Unlimited</td>
                        <td style={{ textAlign: 'center' }}>Unlimited</td>
                        <td style={{ textAlign: 'center' }}>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Delivery Time</td>
                        <td style={{ textAlign: 'center' }}>3 days</td>
                        <td style={{ textAlign: 'center' }}>1 day</td>
                        <td style={{ textAlign: 'center' }}>7 days</td>
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td style={{ textAlign: 'center' }}></td>
                        <td style={{ textAlign: 'center' }}><button><Link to={`/payment/${gig._id}`}>Select</Link></button></td>
                        <td style={{ textAlign: 'center' }}><button>Select</button></td>
                        <td style={{ textAlign: 'center' }}><button>Select</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



export default PricingTable;
