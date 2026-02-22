import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [leads, setLeads] = useState(100);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(1500);
  const [improvement, setImprovement] = useState(30);
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const currentRevenue = leads * (closeRate / 100) * dealValue;
  const projectedLeads = leads * (1 + improvement / 100);
  const projectedRevenue = projectedLeads * (closeRate / 100) * dealValue;
  const monthlyIncrease = projectedRevenue - currentRevenue;
  const annualIncrease = monthlyIncrease * 12;

  const maxBar = Math.max(currentRevenue, projectedRevenue) || 1;
  const currentBarWidth = (currentRevenue / maxBar) * 100;
  const projectedBarWidth = (projectedRevenue / maxBar) * 100;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!email) return;
    setUnlocked(true);
    setTimeout(() => setShowResults(true), 50);
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showResults]);

  return (
    <div className="app">
      <div className="calculator">
        <div className="header">
          <h1>GHL ROI Calculator</h1>
          <p className="subtitle">
            See how GoHighLevel automation can transform your revenue
          </p>
        </div>

        <div className="inputs-section">
          <div className="input-group fade-in" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="leads">Current Leads Per Month</label>
            <input
              id="leads"
              type="number"
              min="0"
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
            />
          </div>

          <div className="input-group fade-in" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="closeRate">Current Close Rate (%)</label>
            <div className="input-with-suffix">
              <input
                id="closeRate"
                type="number"
                min="0"
                max="100"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
              />
              <span className="suffix">%</span>
            </div>
          </div>

          <div className="input-group fade-in" style={{ animationDelay: '0.3s' }}>
            <label htmlFor="dealValue">Average Deal Value ($)</label>
            <div className="input-with-prefix">
              <span className="prefix">$</span>
              <input
                id="dealValue"
                type="number"
                min="0"
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="input-group fade-in" style={{ animationDelay: '0.4s' }}>
            <label htmlFor="improvement">Expected Improvement with Automation (%)</label>
            <div className="input-with-suffix">
              <input
                id="improvement"
                type="number"
                min="0"
                max="500"
                value={improvement}
                onChange={(e) => setImprovement(Number(e.target.value))}
              />
              <span className="suffix">%</span>
            </div>
          </div>
        </div>

        {!unlocked ? (
          <form className="email-gate fade-in" onSubmit={handleUnlock}>
            <p className="gate-text">Enter your email to see your projected results</p>
            <div className="gate-row">
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="unlock-button">Show My Results</button>
            </div>
          </form>
        ) : (
          <div ref={resultsRef} className={`results-wrapper ${showResults ? 'results-visible' : ''}`}>
            <div className="chart-section">
              <h2>Revenue Comparison</h2>
              <div className="chart">
                <div className="chart-row">
                  <span className="chart-label">Current</span>
                  <div className="bar-track">
                    <div
                      className="bar bar-current"
                      style={{ width: showResults ? `${currentBarWidth}%` : '0%' }}
                    />
                  </div>
                  <span className="chart-value">{formatCurrency(currentRevenue)}</span>
                </div>
                <div className="chart-row">
                  <span className="chart-label">With GHL</span>
                  <div className="bar-track">
                    <div
                      className="bar bar-projected"
                      style={{ width: showResults ? `${projectedBarWidth}%` : '0%' }}
                    />
                  </div>
                  <span className="chart-value chart-value-highlight">{formatCurrency(projectedRevenue)}</span>
                </div>
              </div>
            </div>

            <div className="results-section">
              <h2>Your Projected Results</h2>
              <div className="results-grid">
                <div className="result-card pop-in" style={{ animationDelay: '0.2s' }}>
                  <span className="result-label">Current Monthly Revenue</span>
                  <span className="result-value">{formatCurrency(currentRevenue)}</span>
                </div>
                <div className="result-card highlight pop-in" style={{ animationDelay: '0.35s' }}>
                  <span className="result-label">Projected Revenue with GHL</span>
                  <span className="result-value">{formatCurrency(projectedRevenue)}</span>
                </div>
                <div className="result-card accent pop-in" style={{ animationDelay: '0.5s' }}>
                  <span className="result-label">Monthly Revenue Increase</span>
                  <span className="result-value increase">+{formatCurrency(monthlyIncrease)}</span>
                </div>
                <div className="result-card accent pop-in" style={{ animationDelay: '0.65s' }}>
                  <span className="result-label">Annual Revenue Increase</span>
                  <span className="result-value increase">+{formatCurrency(annualIncrease)}</span>
                </div>
              </div>
            </div>

            <a href="https://calendar.app.google/JHhe6yPMPQURi63T9" target="_blank" rel="noopener noreferrer" className="cta-button pop-in" style={{ animationDelay: '0.8s' }}>
              Book a Free GHL Strategy Call
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
