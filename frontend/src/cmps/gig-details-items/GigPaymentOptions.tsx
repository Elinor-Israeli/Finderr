import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Gig } from '../../types/Gig'

interface GigPaymentOptionsProps {
    gig: Gig
}

const renderCheckIcon = () => (
    <span className="svg-payment fa-solid fa-check">
      <svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill">
        <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
      </svg>
    </span>
  )

export function GigPaymentOptions(props: GigPaymentOptionsProps) {
    const [program, setProgram] = useState<number>(1)

    function handleProgram(num: number) {
        setProgram(num)
    }
    const randomDiscount = Math.floor(Math.random() * (25 - 5 + 1)) + 5
    const programDetails = [
        {
          label: 'Basic',
          multiplier: 1,
          deliveryTime: '3 Days Delivery',
          revisions: '3 Revisions',
          conceptsIncluded: 1,
          show3DMockup: false,
          additionalFeatures: ['Logo transparency'],
        },
        {
          label: 'Standard',
          multiplier: 2,
          deliveryTime: '2 Days Delivery',
          revisions: '5 Revisions',
          conceptsIncluded: 2,
          show3DMockup: true,
          additionalFeatures: ['Logo transparency', 'Vector file'],
        },
        {
          label: 'Premium',
          multiplier: 3,
          deliveryTime: '1 Day Delivery',
          revisions: 'Unlimited Revisions',
          conceptsIncluded: 3,
          show3DMockup: true,
          additionalFeatures: ['Logo transparency ++ Social Media Kit', 'VIP Support', 'Vector file'],
        },
      ]
    
      const currentProgram = programDetails[program - 1]
      const programPrice = props.gig.price * currentProgram.multiplier
    
      return (
        <div className="gig-details-side">
          <div className="gig-program">
            <div className="gig-program-name">
              {programDetails.map((prog, idx) => (
                <button
                  key={prog.label}
                  onClick={() => handleProgram(idx + 1)}
                  className={program === idx + 1 ? 'active-basic' : ''}
                >
                  {prog.label}
                </button>
              ))}
            </div>
    
            <div className="gig-program-info">
              <h2 className="gig-program-price">${programPrice}</h2>
              <p>
                Save up to {randomDiscount}% with{' '}
                <span style={{ color: 'green' }}>Subscribe to Save</span>
              </p>
              <p className="dec-gig">{props.gig.title}</p>
              <p className="delivery">
                <span className="delivery-time fa-regular clock">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                    <path d="M9 4H7v5h5V7H9V4z"></path>
                  </svg>
                </span>
                <span>{currentProgram.deliveryTime}</span>
                <span className="fa-solid arrows-rotate">{currentProgram.revisions}</span>
              </p>
    
              <ul>
                <li>
                  {renderCheckIcon()}
                  <span>{currentProgram.conceptsIncluded} concept included</span>
                </li>
                <li>
                  {renderCheckIcon()}
                  <span>Include source file</span>
                </li>
                {currentProgram.show3DMockup && (
                  <li>
                    {renderCheckIcon()}
                    <span>Include 3D mockup</span>
                  </li>
                )}
                {currentProgram.additionalFeatures.map((feature, idx) => (
                  <li key={idx}>
                    {renderCheckIcon()}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
    
              <Link
                className="gig-program-link-continue"
                to={`/payment/${props.gig._id}?price=${programPrice}&selectedPackage=${currentProgram.label}`}
              >
                Continue
              </Link>
            </div>
            <a href="/compare-packages" className="center-container">
            <button className="compare-packages-button">
              <a style={{ scrollBehavior: 'smooth', fontFamily: 'Macan', color: '#404145' }} href="#Compare packages">
                Compare packages
              </a>
            </button>
          </a>
          </div>
    
         
        </div>
      )
    }