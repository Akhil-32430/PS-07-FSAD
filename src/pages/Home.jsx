import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function Home() {
  const videoSrc = `${import.meta.env.BASE_URL}videos/india-theme.mp4`;
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }

    const tryPlay = () => {
      const playPromise = videoEl.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay can be blocked; leave muted/inline so user interaction will start it.
        });
      }
    };

    tryPlay();
    videoEl.addEventListener("loadedmetadata", tryPlay);
    videoEl.addEventListener("canplay", tryPlay);

    return () => {
      videoEl.removeEventListener("loadedmetadata", tryPlay);
      videoEl.removeEventListener("canplay", tryPlay);
    };
  }, []);

  const highlights = [
    {
      title: "Live Integrity Monitoring",
      value: "99.2%",
      note: "compliance score across monitored stations",
    },
    {
      title: "Reported Incidents Resolved",
      value: "1,248",
      note: "issues validated and closed with audit trail",
    },
    {
      title: "Real-Time Public Participation",
      value: "88K+",
      note: "citizens actively engaging in election services",
    },
  ];

  return (
    <section className="page">
      <div className="hero-card">
        <video
          ref={videoRef}
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay" />

        <div className="hero-content">
        <p className="eyebrow">Trusted National Election Platform</p>
        <h1 className="hero-title">Professional Election Monitoring & Decision Support</h1>
        <p className="hero-subtitle">
          A unified digital control center for citizens, observers, analysts, and administrators
          to ensure transparent, secure, and data-driven election operations.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary">
            Access Role Panel
          </Link>
          <a href="#platform-overview" className="btn btn-secondary">
            Explore Features
          </a>
        </div>
        </div>
      </div>

      <div id="platform-overview" className="stats-grid">
        {highlights.map((item) => (
          <article key={item.title} className="glass-card">
            <p className="stat-label">{item.title}</p>
            <h3 className="stat-value">{item.value}</h3>
            <p className="muted-text">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="grid-2">
        <article className="panel-card">
          <h3>Role-Based Secure Access</h3>
          <p>
            Every panel is gated by credentials and role validation so users can only view the
            data and controls relevant to their election responsibilities.
          </p>
        </article>
        <article className="panel-card">
          <h3>Actionable Intelligence</h3>
          <p>
            Dashboards combine turnout trends, incident metrics, and operational KPIs into clear
            interfaces for faster, accurate electoral decisions.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Home;