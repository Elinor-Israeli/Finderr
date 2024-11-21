import React, { useState, useEffect } from "react"

export function MonthlyRevenueVisualizer({
  monthlyRevenue,
  monthlyRevenueGoal,
  pastMonthlyRevenue = [],
}) {
  const [percentage, setPercentage] = useState(0)
  const [trendingColor, setTrendingColor] = useState("blue")
  const [isGrowing, setIsGrowing] = useState(true)

  useEffect(() => {
    if (monthlyRevenueGoal) {
      const calcPercentage = Math.min((monthlyRevenue / monthlyRevenueGoal) * 100, 100)
      setPercentage(calcPercentage)

      if (pastMonthlyRevenue.length > 0) {
        const lastMonth = pastMonthlyRevenue[pastMonthlyRevenue.length - 1]
        setIsGrowing(monthlyRevenue >= lastMonth)
        setTrendingColor(monthlyRevenue >= lastMonth ? "green" : "red")
      }
    }
  }, [monthlyRevenue, monthlyRevenueGoal, pastMonthlyRevenue])

  return (
    <div className="monthly-revenue-visualizer">
      <header>
        <h2>Monthly Revenue</h2>
        <p className="revenue-summary">
          <span
            className="status-badge"
            style={{ backgroundColor: trendingColor }}
          >
            {isGrowing ? "Growing" : "Declining"}
          </span>
        </p>
      </header>

      <section className="progress-bar-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${trendingColor}, ${trendingColor}90)`,
            }}
          />
        </div>
        <p className="progress-label">{percentage.toFixed(1)}% of Goal Achieved</p>
      </section>

      <section className="trend-chart">
        <h3>Revenue Trends</h3>
        <div className="trend-container">
          {pastMonthlyRevenue.length === 0 ? (
            <p>No past data available.</p>
          ) : (
            pastMonthlyRevenue.map((revenue, idx) => (
              <div
                key={idx}
                className="trend-bar"
                style={{
                  height: `${Math.min((revenue / monthlyRevenueGoal) * 100, 100)}%`,
                  backgroundColor: revenue <= monthlyRevenue ? "green" : "red",
                }}
              >
                <span className="trend-label">${revenue.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="insights">
        <h3>Insights</h3>
        <ul>
          <li>
            Your monthly revenue target is:{" "}
            <strong>${monthlyRevenueGoal}</strong>.
          </li>
          <li>
            You have generated <strong>${monthlyRevenue}</strong>{" "}
            this month, which is{" "}
            <strong>{(monthlyRevenue / monthlyRevenueGoal).toFixed(2) * 100}%</strong>{" "}
            of your target.
          </li>
          <li>
            {isGrowing
              ? "Great job! Your revenue is growing compared to last month."
              : "Revenue has decreased compared to last month. Consider focusing on sales strategies."}
          </li>
        </ul>
      </section>
    </div>
  )
}
