import React from 'react';

export function ProgressChart2({ count, total, bgc, label }) {
    const percent = total > 0 ? count / total : 0; // Prevent division by zero
    const strokePercent = 283 - (283 * percent); // Adjust stroke for the progress circle

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
                {/* Gradient for Progress */}
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: bgc, stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "orange", stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Shiny Glow Gradient */}
                    <radialGradient id="shinyEffect" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style={{ stopColor: "rgba(255,165,0, 0.6)", stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: "rgba(255,165,0, 0)", stopOpacity: 0 }} />
                    </radialGradient>
                </defs>
                {/* Progress Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={strokePercent}
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    fill="none"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                />
                {/* Shiny Glow Effect */}
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    stroke="url(#shinyEffect)"
                    strokeWidth="10"
                    fill="none"
                    className="shiny-glow"
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
    )
}

{/* <ProgressChart2
count={pendingOrdersCount}
total={totalOrders}
bgc="orange"
label="Pending Orders"
/> */}

// const totalOrders = orders.length
// const completedOrderPercent = orders.length > 0 ? completedOrdersCount / orders.length : 0;
// const pendingOrderPercent = orders.length > 0 ? pendingOrdersCount / orders.length : 0;