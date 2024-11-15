
export function ProgressChart({ percent, bgc }) {
    const strokPercent = 236 - (236 * percent)

    return <section className="progress-chart">
        <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px">
            <circle cx="40" cy="40" r="35" strokeLinecap="round" />
            <circle cx="40" cy="40" r="35" strokeLinecap="round" strokeDashoffset={strokPercent} stroke={bgc} />
        </svg>
        <span>{(percent * 100).toFixed(0)}%</span>
    </section>
}