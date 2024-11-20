import React from 'react';

export function ProgressChart({ count, total, bgc, label }) {
    const percent = total > 0 ? count / total : 0; // Prevent division by zero
    const strokePercent = 236 - (236 * percent); // Stroke for the progress circle

    return (
        <section className="progress-chart">
            <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px">
                {/* Background Circle */}
                <circle 
                    cx="40" 
                    cy="40" 
                    r="35" 
                    strokeLinecap="round" 
                    stroke="#ddd" 
                    strokeWidth="5" 
                    fill="white" /* Set the inner circle background */
                />
                {/* Progress Circle */}
                <circle
                    cx="40"
                    cy="40"
                    r="35"
                    strokeLinecap="round"
                    strokeDasharray="236"
                    strokeDashoffset={strokePercent}
                    stroke={bgc}
                    strokeWidth="5"
                    fill="none" /* Ensure the progress circle doesn’t fill the center */
                />
                {/* Text Inside the Circle */}
                <text
                    x="40"
                    y="45"
                    textAnchor="middle"
                    fontSize="14px"
                    fontWeight="bold"
                    fill="#333" /* Text color */
                >
                    {(percent * 100).toFixed(0)}%
                </text>
            </svg>
            {/* Label Below the Chart */}
            <p className="circle-label">{label}</p>
        </section>
    );
}