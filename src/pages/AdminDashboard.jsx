import { useState } from "react";

function AdminDashboard() {
  const metrics = [
    { label: "Total Registered Users", value: "124,580", trend: "+6.3% this week" },
    { label: "Pending Reports", value: "35", trend: "12 require high priority" },
    { label: "Active Elections", value: "3", trend: "2 state, 1 district" },
    { label: "System Uptime", value: "99.94%", trend: "Last 30 days" },
  ];

  const securityMetrics = [
    { label: "Fraud Risk Score", value: "2.3%", status: "Low", trend: "Safe" },
    { label: "System Security", value: "98.7%", status: "Excellent", trend: "Protected" },
    { label: "Data Integrity", value: "100%", status: "Perfect", trend: "Verified" },
  ];

  const fraudAlerts = [
    { id: 1, type: "Duplicate Registration", station: "Zone-A", severity: "Critical", timestamp: "2 hrs ago", action: "Block" },
    { id: 2, type: "Unusual Voting Pattern", station: "Zone-C", severity: "Warning", timestamp: "45 min ago", action: "Review" },
    { id: 3, type: "Device Tampering Detected", station: "Zone-B", severity: "High", timestamp: "30 min ago", action: "Investigate" },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [showSecurityDashboard, setShowSecurityDashboard] = useState(false);

  const elections = [
    {
      id: 1,
      name: "State Assembly Election 2026",
      date: "2026-03-15",
      stations: 2845,
      status: "Scheduled",
    },
    {
      id: 2,
      name: "District Municipal Election",
      date: "2026-02-28",
      stations: 412,
      status: "Live",
    },
    {
      id: 3,
      name: "Local Village Panchayat",
      date: "2026-03-22",
      stations: 186,
      status: "Scheduled",
    },
  ];

  const pendingReports = [
    { id: 1, station: "Station #45, Zone-A", issue: "Queuing anomaly detected", priority: "High" },
    { id: 2, station: "Station #127, Zone-B", issue: "Equipment calibration needed", priority: "Medium" },
    { id: 3, station: "Station #89, Zone-C", issue: "Observer arrival delay", priority: "Low" },
  ];

  return (
    <section className="page">
      <div className="section-header">
        <p className="eyebrow">Administrator Control Center</p>
        <h2>Admin Dashboard</h2>
      </div>

      <div className="stats-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="glass-card">
            <p className="stat-label">{metric.label}</p>
            <h3 className="stat-value">{metric.value}</h3>
            <p className="muted-text">{metric.trend}</p>
          </article>
        ))}
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          System Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "elections" ? "active" : ""}`}
          onClick={() => setActiveTab("elections")}
        >
          Election Management
        </button>
        <button
          className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Pending Reports
        </button>
        <button
          className={`tab-btn ${activeTab === "fraud" ? "active" : ""}`}
          onClick={() => setActiveTab("fraud")}
        >
          🚨 Fraud Alerts ({fraudAlerts.length})
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          {showSecurityDashboard && (
            <div className="security-metrics-grid">
              {securityMetrics.map((metric) => (
                <article key={metric.label} className="glass-card security-card">
                  <p className="stat-label">{metric.label}</p>
                  <h3 className="stat-value">{metric.value}</h3>
                  <span className={`security-badge security-${metric.status.toLowerCase()}`}>
                    {metric.status}
                  </span>
                </article>
              ))}
            </div>
          )}
          <div className="grid-2">
            <article className="panel-card">
              <h3>🔒 Active Security Controls</h3>
              <ul className="clean-list">
                <li>✓ End-to-end encryption enabled</li>
                <li>✓ Two-factor authentication active</li>
                <li>✓ IP whitelist monitoring in place</li>
                <li>✓ Real-time threat detection running</li>
              </ul>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: "12px" }}
                onClick={() => setShowSecurityDashboard(!showSecurityDashboard)}
              >
                {showSecurityDashboard ? "Hide Security Metrics" : "View Security Metrics"}
              </button>
            </article>

            <article className="panel-card">
              <h3>Operations Queue</h3>
              <ul className="clean-list">
                <li>Validate 14 new polling station requests</li>
                <li>Approve observer assignment batches</li>
                <li>Review district anomaly heatmap</li>
              </ul>
            </article>
          </div>
        </>
      )}

      {activeTab === "elections" && (
        <div className="table-container">
          <h3>Active & Upcoming Elections</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Election Name</th>
                <th>Date</th>
                <th>Stations</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr key={election.id}>
                  <td>{election.name}</td>
                  <td>{new Date(election.date).toLocaleDateString()}</td>
                  <td>{election.stations}</td>
                  <td>
                    <span className={`badge badge-${election.status.toLowerCase()}`}>
                      {election.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="table-container">
          <h3>Pending Validation Reports</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Station</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.station}</td>
                  <td>{report.issue}</td>
                  <td>
                    <span className={`priority-badge priority-${report.priority.toLowerCase()}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "fraud" && (
        <div className="table-container">
          <h3>🚨 Real-Time Fraud Detection Alerts</h3>
          <p className="muted-text" style={{ marginBottom: "14px" }}>
            Advanced ML-powered anomaly detection monitoring all election activities
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Alert Type</th>
                <th>Station</th>
                <th>Severity</th>
                <th>Detected</th>
                <th>Action Required</th>
              </tr>
            </thead>
            <tbody>
              {fraudAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.type}</td>
                  <td>{alert.station}</td>
                  <td>
                    <span className={`severity-badge severity-${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td>{alert.timestamp}</td>
                  <td>
                    <button className={`action-btn action-${alert.severity.toLowerCase()}`}>
                      {alert.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;