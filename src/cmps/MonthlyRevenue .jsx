import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


export function MonthlyRevenue({ monthlyRevenue, monthlyRevenueGoal }) {
    const [progress, setProgress] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [goalReached, setGoalReached] = useState(false)

    useEffect(() => {
        const progressPercentage = (monthlyRevenue / monthlyRevenueGoal) * 100
        setProgress(progressPercentage)
        setRevenue(monthlyRevenue)

        if (progressPercentage >= 100) {
            setGoalReached(true)
        }
    }, [monthlyRevenue, monthlyRevenueGoal])

    const data = {
        labels: ['Start', 'Mid', 'End'], 
        datasets: [
            {
                label: 'Monthly Revenue Growth',
                data: [0, revenue / 2, revenue], 
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }
        ]
    }
    
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Revenue Growth Over Time'
            }
        }
    }

    return (
        <div className="monthly-revenue-container">
            <div className="revenue-info">
                <span className="revenue-title">Monthly Revenue</span>
                <h3 className="revenue-amount">${revenue}</h3>
                <div className="goal-status">
                    <span className={`goal-status-text ${goalReached ? 'achieved' : 'pending'}`}>
                        {goalReached ? 'Goal Achieved!' : 'Goal Pending'}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="goal-info">
                    <span className="goal-title">Goal: </span>
                    <span className="goal-amount">${monthlyRevenueGoal}</span>
                </div>
            </div>

            <div className="chart-container">
                <Line data={data} options={options} />
            </div>

            <div className="revenue-stats">
                <div className="stat-item">
                    <span className="stat-title">Revenue Progress:</span>
                    <span className="stat-value">{Math.round(progress)}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-title">Monthly Goal:</span>
                    <span className="stat-value">${monthlyRevenueGoal}</span>
                </div>
            </div>
        </div>
    )

}
