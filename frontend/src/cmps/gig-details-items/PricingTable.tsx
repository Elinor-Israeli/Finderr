import { Link } from 'react-router-dom'
import type { Gig } from '../../types/Gig'

interface PricingTableProps {
    gig: Gig
}

const packages = [
    { label: 'Basic', multiplier: 1 },
    { label: 'Standard', multiplier: 2 },
    { label: 'Premium', multiplier: 3 },
]

export function PricingTable(props: PricingTableProps) {
    const { gig } = props
    const { price, daysToMake, _id } = gig

    const packagePrices = packages.map(pkg => ({
        ...pkg,
        price: price * pkg.multiplier,
        daysToMake: pkg.label === 'Premium' ? daysToMake - 1 : daysToMake, 
    }))

    const SelectButton = ({ price, selectedPackage }: { price: number; selectedPackage: string }) => (
        <button>
            <Link to={`/payment/${_id}?price=${price}&selectedPackage=${selectedPackage}`}>
                Select
            </Link>
        </button>
    )

    return (
        <div className="pricing-table">
            <div id="Compare packages" className="compare-header">Compare packages</div>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'start' }}>
                            <p>Package</p>
                        </th>
                        {packagePrices.map(({ price, label }) => (
                            <th key={label} style={{ textAlign: 'start', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                <p style={{ fontSize: '1.25rem' }}>${price}</p> {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        {packagePrices.map(({ label }) => (
                            <td key={label}>
                                <p>{label.toUpperCase()}</p>
                                <span>{label} design</span><br />
                                <span>{label === 'Premium' ? '1-2 Pro designs' : `1 graphic Icons`}</span><br />
                                <span>{label === 'Standard' ? 'Social media post' : ''}</span><br />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Source File</td>
                        {packagePrices.map(() => (
                            <td key="source-file" style={{ textAlign: 'center' }}>✔</td>
                        ))}
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td>High Resolution</td>
                        {packagePrices.map(() => (
                            <td key="high-resolution" style={{ textAlign: 'center' }}>✔</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Number of Images</td>
                        {packagePrices.map(({ label }) => (
                            <td key={label} style={{ textAlign: 'center' }}>
                                {label === 'Premium' ? '2' : '1'}
                            </td>
                        ))}
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td>Revisions</td>
                        {packagePrices.map(({ label }) => (
                            <td key={label} style={{ textAlign: 'center' }}>
                                {label === 'Premium' ? 'Unlimited' : `${label === 'Standard' ? '3' : '2'} times`}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Delivery Time</td>
                        {packagePrices.map(({ daysToMake, label }) => (
                            <td key={label} style={{ textAlign: 'center' }}>{daysToMake} days</td>
                        ))}
                    </tr>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td></td>
                        {packagePrices.map(({ price, label }) => (
                            <td key={label} style={{ textAlign: 'center' }}>
                                <SelectButton price={price} selectedPackage={label} />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

