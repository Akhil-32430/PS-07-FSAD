import { useState } from "react";

function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("track");
  const [newDiscussion, setNewDiscussion] = useState("");

  const citizenActions = [
    "View Constituency Election Timeline",
    "Submit Issue with Evidence",
    "Track Complaint Resolution Status",
    "Read Verified Election Notifications",
  ];

  const reportedIssues = [
    {
      id: 1,
      station: "Booth #23, Sector-4",
      issue: "Long queuing delays reported",
      status: "In Resolution",
      date: "2026-02-20",
    },
    {
      id: 2,
      station: "Booth #45, Sector-7",
      issue: "Accessibility ramp not functional",
      status: "Resolved",
      date: "2026-02-18",
    },
    {
      id: 3,
      station: "Booth #12, Sector-2",
      issue: "Voter information materials unavailable",
      status: "Acknowledged",
      date: "2026-02-21",
    },
  ];

  const civicUpdates = [
    {
      title: "How to Register as a Voter",
      content: "Complete online registration at election.gov.in with Aadhaar or voter ID.",
    },
    {
      title: "Know Your Rights During Voting",
      content: "You have the right to cast your vote in secret with privacy curtains guaranteed.",
    },
    {
      title: "Election Schedule & Dates",
      content: "Municipal elections scheduled for Feb 28, 2026. Assembly elections March 15, 2026.",
    },
  ];

  const communityForum = [
    {
      id: 1,
      author: "Rajesh K.",
      topic: "First-time Voter Tips",
      replies: 28,
      views: 1240,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      author: "Priya M.",
      topic: "Accessibility Features at Polling Booths",
      replies: 15,
      views: 856,
      lastActivity: "4 hours ago",
    },
    {
      id: 3,
      author: "Amit N.",
      topic: "Understanding Electronic Voting Machines",
      replies: 42,
      views: 3120,
      lastActivity: "1 hour ago",
    },
  ];

  return (
    <section className="page">
      <div className="section-header">
        <p className="eyebrow">Citizen Service Portal</p>
        <h2>Citizen Dashboard</h2>
      </div>

      <div className="stats-grid">
        {citizenActions.map((action) => (
          <article key={action} className="glass-card">
            <h3 className="card-title">{action}</h3>
            <p className="muted-text">
              Access trusted information and contribute to transparent election monitoring.
            </p>
          </article>
        ))}
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "track" ? "active" : ""}`}
          onClick={() => setActiveTab("track")}
        >
          Track My Reports
        </button>
        <button
          className={`tab-btn ${activeTab === "submit" ? "active" : ""}`}
          onClick={() => setActiveTab("submit")}
        >
          Report an Issue
        </button>
        <button
          className={`tab-btn ${activeTab === "learn" ? "active" : ""}`}
          onClick={() => setActiveTab("learn")}
        >
          Learn About Elections
        </button>
        <button
          className={`tab-btn ${activeTab === "forums" ? "active" : ""}`}
          onClick={() => setActiveTab("forums")}
        >
          💬 Community Forums ({communityForum.length})
        </button>
      </div>

      {activeTab === "track" && (
        <div className="table-container">
          <h3>Your Reported Issues</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Station</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Reported</th>
              </tr>
            </thead>
            <tbody>
              {reportedIssues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.station}</td>
                  <td>{issue.issue}</td>
                  <td>
                    <span className={`badge badge-${issue.status.toLowerCase().replace(" ", "-")}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>{new Date(issue.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "submit" && (
        <article className="panel-card">
          <h3>Report an Election Issue</h3>
          <form className="issue-form">
            <div className="form-group">
              <label htmlFor="station">Polling Station</label>
              <input
                id="station"
                type="text"
                placeholder="Enter station name or number"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Issue Category</label>
              <select id="category" className="input-field">
                <option>Queue Management</option>
                <option>Accessibility</option>
                <option>Equipment Issues</option>
                <option>Staff Behavior</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Describe the issue in detail..."
                className="input-field"
                rows="5"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Report
            </button>
          </form>
        </article>
      )}

      {activeTab === "learn" && (
        <div className="grid-2">
          {civicUpdates.map((update) => (
            <article key={update.title} className="panel-card">
              <h3>{update.title}</h3>
              <p>{update.content}</p>
            </article>
          ))}
        </div>
      )}

      {activeTab === "forums" && (
        <div className="forums-container">
          <h3>💬 Civic Engagement Forum</h3>
          <p className="muted-text" style={{ marginBottom: "16px" }}>
            Join discussions with fellow citizens about voting, election processes, and civic participation
          </p>
          
          <article className="panel-card" style={{ marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0 }}>Start a New Discussion</h4>
            <textarea
              value={newDiscussion}
              onChange={(e) => setNewDiscussion(e.target.value)}
              placeholder="Share your question or topic..."
              className="input-field"
              rows="3"
            />
            <button className="btn btn-primary" style={{ marginTop: "10px" }}>
              Start Discussion
            </button>
          </article>

          <div className="forum-threads">
            {communityForum.map((thread) => (
              <article key={thread.id} className="forum-thread">
                <div className="thread-header">
                  <h4>{thread.topic}</h4>
                  <span className="thread-author">by {thread.author}</span>
                </div>
                <div className="thread-stats">
                  <span>💬 {thread.replies} replies</span>
                  <span>👁️ {thread.views} views</span>
                  <span className="thread-time">Last: {thread.lastActivity}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CitizenDashboard;