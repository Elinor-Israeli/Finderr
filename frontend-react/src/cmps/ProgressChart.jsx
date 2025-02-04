export function ProgressChart({ count, total, bgc, label }) {
    const percent = total > 0 ? count / total : 0
    const strokePercent = 236 - (236 * percent)

    return (
        <section className="progress-chart">
            <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px">
                <circle 
                    cx="40" 
                    cy="40" 
                    r="35" 
                    strokeLinecap="round" 
                    stroke="#ddd" 
                    strokeWidth="5" 
                    fill="white" 
                />
               
                <circle
                    cx="40"
                    cy="40"
                    r="35"
                    strokeLinecap="round"
                    strokeDasharray="236"
                    strokeDashoffset={strokePercent}
                    stroke={bgc}
                    strokeWidth="5"
                    fill="none" 
                />
                
                <text
                    x="40"
                    y="45"
                    textAnchor="middle"
                    fontSize="14px"
                    fontWeight="bold"
                    fill="#333"
                >
                    {(percent * 100).toFixed(0)}%
                </text>
            </svg>
            <p className="circle-label">{label}</p>
        </section>
    )
}