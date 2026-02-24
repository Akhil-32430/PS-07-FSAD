import { useState } from "react";

function ObserverDashboard() {
  const observerFeed = [
    { title: "Stations Under Live Review", value: "142", note: "across 9 critical zones" },
    { title: "Flagged Irregularities", value: "18", note: "awaiting final verification" },
    { title: "Submitted Field Reports", value: "327", note: "updated in last 24 hours" },
    { title: "Real-Time Anomalies Detected", value: "7", note: "AI-powered system monitoring" },
  ];

  const [activeTab, setActiveTab] = useState("stations");
  const [anomalyFilter, setAnomalyFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const anomalyDatabase = [
    { id: 1, type: "Queue Overflow", severity: "Medium", station: "Station #45", detected: "15 min ago" },
    { id: 2, type: "Device Malfunction", severity: "Critical", station: "Station #127", detected: "22 min ago" },
    { id: 3, type: "Unusual Turnout Spike", severity: "Low", station: "Station #89", detected: "8 min ago" },
    { id: 4, type: "Observer Absence", severity: "High", station: "Station #234", detected: "3 min ago" },
    { id: 5, type: "Equipment Recalibration", severity: "Medium", station: "Station #156", detected: "19 min ago" },
    { id: 6, type: "Power Fluctuation", severity: "High", station: "Station #412", detected: "11 min ago" },
    { id: 7, type: "Voter List Mismatch", severity: "Critical", station: "Station #78", detected: "6 min ago" },
  ];

  const monitoredStations = [
    {
      id: 1,
      name: "Station #45, Zone-A",
      turnout: "68%",
      queueTime: "12 min",
      anomalies: "None",
      status: "Operational",
    },
    {
      id: 2,
      name: "Station #127, Zone-B",
      turnout: "74%",
      queueTime: "8 min",
      anomalies: "Minor queuing delay",
      status: "Operational",
    },
    {
      id: 3,
      name: "Station #89, Zone-C",
      turnout: "71%",
      queueTime: "24 min",
      anomalies: "Equipment check needed",
      status: "Under Review",
    },
  ];

  const fieldReports = [
    {
      id: 1,
      date: "2026-02-21",
      station: "Station #45",
      findings:
        "Station setup complete. All equipment calibrated. Voter flow smooth. No irregularities observed.",
    },
    {
      id: 2,
      date: "2026-02-20",
      station: "Station #127",
      findings:
        "Observer noted: Electronic voting machines functioning correctly. All backup systems in place.",
    },
    {
      id: 3,
      date: "2026-02-19",
      station: "Station #89",
      findings: "Queue management: Suggested 2 additional booths for better flow during peak hours.",
    },
  ];

  return (
    <section className="page">
      <div className="section-header">
        <p className="eyebrow">Independent Observation Desk</p>
        <h2>Observer Dashboard</h2>
      </div>

      <div className="stats-grid">
        {observerFeed.map((item) => (
          <article key={item.title} className="glass-card">
            <p className="stat-label">{item.title}</p>
            <h3 className="stat-value">{item.value}</h3>
            <p className="muted-text">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "stations" ? "active" : ""}`}
          onClick={() => setActiveTab("stations")}
        >
          Monitored Stations
        </button>
        <button
          className={`tab-btn ${activeTab === "anomalies" ? "active" : ""}`}
          onClick={() => setActiveTab("anomalies")}
        >
          🔍 Anomaly Detection ({anomalyDatabase.filter(a => severityFilter === "all" || a.severity === severityFilter).length})
        </button>
        <button
          className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Field Reports
        </button>
        <button
          className={`tab-btn ${activeTab === "submit" ? "active" : ""}`}
          onClick={() => setActiveTab("submit")}
        >
          Submit New Report
        </button>
      </div>

      {activeTab === "stations" && (
        <div className="table-container">
          <h3>Real-Time Station Monitoring</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Station</th>
                <th>Turnout</th>
                <th>Avg Queue Time</th>
                <th>Anomalies</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {monitoredStations.map((station) => (
                <tr key={station.id}>
                  <td>{station.name}</td>
                  <td>{station.turnout}</td>
                  <td>{station.queueTime}</td>
                  <td>{station.anomalies || "—"}</td>
                  <td>
                    <span className={`badge badge-${station.status.toLowerCase().replace(" ", "-")}`}>
                      {station.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "anomalies" && (
        <div className="table-container">
          <h3>🔍 Real-Time Anomaly Detection System</h3>
          <p className="muted-text" style={{ marginBottom: "14px" }}>
            AI-powered system detecting irregularities across all monitored stations
          </p>
          
          <div className="filter-controls" style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
            <select 
              value={severityFilter} 
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="input-field"
              style={{ flex: 1, maxWidth: "200px" }}
            >
              <option value="all">All Severity Levels</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High & Critical</option>
              <option value="Medium">Medium & Above</option>
            </select>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Anomaly Type</th>
                <th>Station</th>
                <th>Severity</th>
                <th>Detected</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {anomalyDatabase
                .filter(a => severityFilter === "all" || 
                  (severityFilter === "Critical" && a.severity === "Critical") ||
                  (severityFilter === "High" && (a.severity === "Critical" || a.severity === "High")) ||
                  (severityFilter === "Medium" && a.severity !== "Low")
                )
                .map((anomaly) => (
                <tr key={anomaly.id}>
                  <td>{anomaly.type}</td>
                  <td>{anomaly.station}</td>
                  <td>
                    <span className={`severity-badge severity-${anomaly.severity.toLowerCase()}`}>
                      {anomaly.severity}
                    </span>
                  </td>
                  <td>{anomaly.detected}</td>
                  <td>
                    <button className={`action-btn action-${anomaly.severity.toLowerCase()}`}>
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="reports-container">
          <h3>Field Reports & Observations</h3>
          {fieldReports.map((report) => (
            <article key={report.id} className="report-card">
              <div className="report-header">
                <h4>{report.station}</h4>
                <span className="report-date">{new Date(report.date).toLocaleDateString()}</span>
              </div>
              <p>{report.findings}</p>
            </article>
          ))}
        </div>
      )}

      {activeTab === "submit" && (
        <article className="panel-card">
          <h3>Submit Incident Report</h3>
          <form className="issue-form">
            <div className="form-group">
              <label htmlFor="obs-station">Station Name</label>
              <input
                id="obs-station"
                type="text"
                placeholder="Enter station name or ID"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="obs-type">Observation Type</label>
              <select id="obs-type" className="input-field">
                <option>Operational Status</option>
                <option>Queue Management</option>
                <option>Equipment Issue</option>
                <option>Irregularity Alert</option>
                <option>Compliance Check</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="obs-findings">Detailed Findings</label>
              <textarea
                id="obs-findings"
                placeholder="Document your observations and recommendations..."
                className="input-field"
                rows="6"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Observation Report
            </button>
          </form>
        </article>
      )}
    </section>
  );
}

export default ObserverDashboard;