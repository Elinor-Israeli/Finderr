export function ProgressChart({ count, total, bgc }) {
    const percent = total > 0 ? count / total : 0
    const strokePercent = 283 - (283 * percent)
    const gradientId = `progressGradient-${bgc}`

    return (
        <section className="progress-chart">
            <svg xmlns="http://www.w3.org/2000/svg" width="120px" height="120px">
                {/* Background Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    strokeLinecap="round"
                    stroke="#f3f3f3"
                    strokeWidth="10"
                    fill="white"
                />
                {/* Single-Color Progress */}
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: bgc, stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: bgc, stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={strokePercent}
                    stroke={`url(#${gradientId})`}
                    strokeWidth="10"
                    fill="none"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                />
                {/* Text Inside */}
                <text
                    x="60"
                    y="65"
                    textAnchor="middle"
                    fontSize="16px"
                    fontWeight="bold"
                    fill="#333"
                >
                    {(percent * 100).toFixed(0)}%
                </text>
            </svg>
        </section>
    );
}
