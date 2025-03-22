const FooterLinkList = ({ title, links }: { title: string; links: string[] }) => (
    <div className="item">
        <ul>
            <h2>{title}</h2>
            {links.map((link, idx) => (
                <li key={idx}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
) 
export function AppFooter() {
    
    const categories = [
        'Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio',
        'Programming & Tech', 'AI Services', 'Consulting', 'Data', 'Business', 'Personal Growth & Hobbies',
        'Finance', 'Photography', 'End-to-End Projects', 'Service Catalog'
    ];

    const forClients = [
        'Visit Example', 'How finderr Works', 'Customer Success Stories', 'Trust & Safety', 'Quality Guide',
        'finderr Learn', 'finderr Guides', 'finderr Answers'
    ];

    const forFreelancers = [
        'Become a finderr Freelancer', 'Become an Agency', 'Kickstart', 'Community Hub', 'Forum', 'Events'
    ];

    const businessSolutions = [
        'finderr Pro', 'Project Management Service', 'ClearVoice Content Marketing', 'Working Not Working Creative Talent',
        'AutoDS Dropshipping Tool', 'finderr Logo Maker', 'Contact Sales'
    ]

    const companyLinks = [
        'About finderr', 'Help & Support', 'Social Impact', 'Careers', 'Terms of Service', 'Privacy Policy',
        'Partnerships', 'Creator Network', 'Affiliates', 'Invite a Friend', 'Press & News', 'Investor Relations',
        'Project Management Service'
    ]

    return (
        <section className="footer-container full">
            <div className="footer main-layout">
                <div className="container">
                    <div className="top main-layout">
                        <FooterLinkList title="Categories" links={categories} />
                        <FooterLinkList title="For Clients" links={forClients} />
                        <FooterLinkList title="For Freelancers" links={forFreelancers} />
                        <FooterLinkList title="Business Solutions" links={businessSolutions} />
                        <FooterLinkList title="Company" links={companyLinks} />
                    </div>
                    <hr />
                    <div className="bottom">
                        <div className="left">
                            <div className="logo">
                                <span className="logo-text">finderr</span>
                                <span className="logo-dot">.</span>
                            </div>
                            <span className="footer-logo">© finderr International Ltd. 2024</span>
                        </div>
                        <div className="right">
                            <div className="social">
                                <a href="https://www.tiktok.com/fiverr/" aria-label="TikTok">
                                    <img src="/img/tiktok.svg" alt="TikTok" />
                                </a>
                                <a href="https://twitter.com/fiverr" aria-label="Twitter">
                                    <img src="/img/twitter.png" alt="Twitter" />
                                </a>
                                <a href="https://www.facebook.com/Fiverr/" aria-label="Facebook">
                                    <img src="/img/facebook.png" alt="Facebook" />
                                </a>
                                <a href="https://www.linkedin.com/company/fiverr-com" aria-label="LinkedIn">
                                    <img src="/img/linkedin.png" alt="LinkedIn" />
                                </a>
                                <a href="https://www.pinterest.com/fiverr/" aria-label="Pinterest">
                                    <img src="/img/pinterest.png" alt="Pinterest" />
                                </a>
                                <a href="https://www.instagram.com/fiverr/" aria-label="Instagram">
                                    <img src="/img/instagram.png" alt="Instagram" />
                                </a>
                            </div>
                            <div className="link">
                                <img src="/img/language.png" alt="Language" />
                                <span>English</span>
                            </div>
                            <div className="link">
                                <img src="/img/coin.png" alt="Currency" />
                                <span>USD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}