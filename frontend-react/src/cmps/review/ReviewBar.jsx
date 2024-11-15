export function ReviewBar({ userReviews }) {
    const stars = getStarsCount()

    function getStarsCount() {
        if (!userReviews) return
        const accInit = { count: [0, 0, 0, 0, 0, 0], sumCount: 0 }
        const stars = userReviews.reduce((acc, review) => {
            const { rate } = review

            if (rate) {
                const rateFloor = Math.floor(rate)
                acc.sumCount++
                acc.count[rateFloor]++
            }

            return acc
        }, accInit)
        return stars
    }

    return <div className="review-bars">
        {stars.count.slice(1).map((count, idx) =>
            <div className="review-bars-container" key={idx}>
                <div >{`${idx + 1} Stars`}</div>
                <div className="review-rate-bar">
                    <span className="percent" style={{ padding:'10px 10px 0px 6px',width: `${(count / stars.sumCount) * 100}%` }}></span>
                </div>
                <span>{`(${count})`}</span>
            </div>)}
    </div>
}