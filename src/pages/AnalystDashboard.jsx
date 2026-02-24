import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function AnalystDashboard() {
  const [activeTab, setActiveTab] = useState("turnout");

  const turnoutData = {
    labels: ["North", "South", "East", "West", "Central"],
    datasets: [
      {
        label: "Voter Turnout (%)",
        data: [78, 83, 74, 81, 76],
        backgroundColor: "rgba(255, 153, 51, 0.75)",
        borderColor: "rgba(255, 153, 51, 1)",
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const timeSeriesData = {
    labels: [
      "8:00 AM",
      "10:00 AM",
      "12:00 PM",
      "2:00 PM",
      "4:00 PM",
      "6:00 PM",
    ],
    datasets: [
      {
        label: "Cumulative Votes Cast",
        data: [8500, 16200, 24800, 35600, 42100, 48900],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#dbeafe",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#bfdbfe" },
        grid: { color: "rgba(148, 163, 184, 0.2)" },
      },
      y: {
        ticks: { color: "#bfdbfe" },
        grid: { color: "rgba(148, 163, 184, 0.2)" },
      },
    },
  };

  const keyMetrics = [
    {
      label: "Overall Turnout",
      value: "78.4%",
      trend: "+2.1% vs previous election",
    },
    {
      label: "Anomaly Detection Rate",
      value: "0.8%",
      trend: "Well within tolerance",
    },
    {
      label: "Gender Participation Gap",
      value: "1.2%",
      trend: "Near parity achieved",
    },
    {
      label: "Fraud Risk Assessment",
      value: "2.3%",
      trend: "Low risk - excellent integrity",
    },
  ];

  const predictiveInsights = [
    { metric: "Expected Final Turnout", value: "81.2%", confidence: "94% accuracy", icon: "📊" },
    { metric: "Peak Voting Hour", value: "1:30 PM", confidence: "Based on 8-hour trend", icon: "⏰" },
    { metric: "Estimated Critical Hours", value: "12:00-2:00 PM", confidence: "Dynamic prediction", icon: "⚠️" },
    { metric: "Predicted Bottleneck Zones", value: "East Zone, 3 stations", confidence: "97% certainty", icon: "🚨" },
  ];

  const geographicInsights = [
    {
      region: "North Zone",
      turnout: "78%",
      issues: "3 minor queuing delays",
      recommendation: "Adequate booth distribution",
    },
    {
      region: "South Zone",
      turnout: "83%",
      issues: "None reported",
      recommendation: "Best performing region",
    },
    {
      region: "East Zone",
      turnout: "74%",
      issues: "5 equipment recalibrations",
      recommendation: "Add 2 additional booths for next election",
    },
  ];

  return (
    <section className="page">
      <div className="section-header">
        <p className="eyebrow">Election Intelligence Hub</p>
        <h2>Analyst Dashboard</h2>
        <p className="muted-text">
          Real-time election data analysis, trends, and comprehensive reporting.
        </p>
      </div>

      <div className="stats-grid">
        {keyMetrics.map((metric) => (
          <article key={metric.label} className="glass-card">
            <p className="stat-label">{metric.label}</p>
            <h3 className="stat-value">{metric.value}</h3>
            <p className="muted-text">{metric.trend}</p>
          </article>
        ))}
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "turnout" ? "active" : ""}`}
          onClick={() => setActiveTab("turnout")}
        >
          Turnout Analysis
        </button>
        <button
          className={`tab-btn ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          Time Series
        </button>
        <button
          className={`tab-btn ${activeTab === "geographic" ? "active" : ""}`}
          onClick={() => setActiveTab("geographic")}
        >
          Geographic Insights
        </button>
        <button
          className={`tab-btn ${activeTab === "predict" ? "active" : ""}`}
          onClick={() => setActiveTab("predict")}
        >
          🤖 ML Predictions
        </button>
      </div>

      {activeTab === "turnout" && (
        <article className="panel-card chart-card">
          <h3>Turnout Performance by Region</h3>
          <div className="chart-wrap">
            <Bar data={turnoutData} options={chartOptions} />
          </div>
        </article>
      )}

      {activeTab === "timeline" && (
        <article className="panel-card chart-card">
          <h3>Voting Trend Throughout the Day</h3>
          <div className="chart-wrap">
            <Line data={timeSeriesData} options={chartOptions} />
          </div>
        </article>
      )}

      {activeTab === "geographic" && (
        <div className="table-container">
          <h3>Regional Performance & Recommendations</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Turnout</th>
                <th>Issues Reported</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {geographicInsights.map((insight) => (
                <tr key={insight.region}>
                  <td>{insight.region}</td>
                  <td>
                    <strong>{insight.turnout}</strong>
                  </td>
                  <td>{insight.issues}</td>
                  <td className="recommendation">{insight.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "predict" && (
        <div className="predictions-container">
          <h3>🤖 Machine Learning Predictions</h3>
          <p className="muted-text" style={{ marginBottom: "20px" }}>
            AI-powered analysis predicting election outcomes with high confidence
          </p>
          
          <div className="prediction-grid">
            {predictiveInsights.map((insight) => (
              <article key={insight.metric} className="prediction-card">
                <div className="prediction-icon">{insight.icon}</div>
                <h4>{insight.metric}</h4>
                <p className="prediction-value">{insight.value}</p>
                <p className="prediction-confidence">{insight.confidence}</p>
              </article>
            ))}
          </div>

          <article className="panel-card" style={{ marginTop: "20px" }}>
            <h3>📈 Advanced Analytics Summary</h3>
            <ul className="clean-list">
              <li>✓ Current trend indicates strong voter engagement across demographics.</li>
              <li>✓ Early morning surge suggests high civic participation rates.</li>
              <li>✓ AI model predicts final turnout: 81% ± 2.8% confidence interval.</li>
              <li>✓ Geographic variance minimal - suggests equitable access across zones.</li>
              <li>✓ Anomaly clustering pattern suggests isolated issues, not systemic problems.</li>
            </ul>
          </article>
        </div>
      )}

      <article className="panel-card">
        <h3>Key Analyst Insights</h3>
        <ul className="clean-list">
          <li>✓ Highest projected turnout in South zone (+3.4% vs. average).</li>
          <li>✓ Early voting surge between 10 AM-12 PM across all regions.</li>
          <li>✓ Eastern zone saw faster grievance closures this cycle.</li>
          <li>✓ Queue optimization correlated with 2.1% turnout uplift.</li>
          <li>✓ Recommend 2-3 additional booths in East-West boundary zones.</li>
        </ul>
      </article>
    </section>
  );
}

export default AnalystDashboard;