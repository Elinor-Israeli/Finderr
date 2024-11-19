export function ProgressChart({ percent, bgc }) {
    const strokPercent = 236 - (236 * percent);
    console.log("strokPercent", strokPercent);  // Add this line to debug

    return (
        <section className="progress-chart">
            <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px">
                <circle cx="40" cy="40" r="35" strokeLinecap="round" stroke="#ccc" strokeWidth="5" />
                <circle cx="40" cy="40" r="35" strokeLinecap="round" strokeDashoffset={strokPercent} stroke={bgc} strokeWidth="5" />
            </svg>
            <span>{(percent * 100).toFixed(0)}%</span>
        </section>
    );
}
