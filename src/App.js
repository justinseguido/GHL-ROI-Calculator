import { useState } from 'react';
import './App.css';

function App() {
  const [leads, setLeads] = useState(100);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(1500);
  const [improvement, setImprovement] = useState(30);

  const currentRevenue = leads * (closeRate / 100) * dealValue;
  const projectedLeads = leads * (1 + improvement / 100);
  const projectedRevenue = projectedLeads * (closeRate / 100) * dealValue;
  const monthlyIncrease = projectedRevenue - currentRevenue;
  const annualIncrease = monthlyIncrease * 12;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

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
          <div className="input-group">
            <label htmlFor="leads">Current Leads Per Month</label>
            <input
              id="leads"
              type="number"
              min="0"
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
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

          <div className="input-group">
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

          <div className="input-group">
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

        <div className="results-section">
          <h2>Your Projected Results</h2>
          <div className="results-grid">
            <div className="result-card">
              <span className="result-label">Current Monthly Revenue</span>
              <span className="result-value">{formatCurrency(currentRevenue)}</span>
            </div>
            <div className="result-card highlight">
              <span className="result-label">Projected Revenue with GHL</span>
              <span className="result-value">{formatCurrency(projectedRevenue)}</span>
            </div>
            <div className="result-card accent">
              <span className="result-label">Monthly Revenue Increase</span>
              <span className="result-value increase">+{formatCurrency(monthlyIncrease)}</span>
            </div>
            <div className="result-card accent">
              <span className="result-label">Annual Revenue Increase</span>
              <span className="result-value increase">+{formatCurrency(annualIncrease)}</span>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="cta-button">
          Book a Free GHL Strategy Call
        </a>
      </div>
    </div>
  );
}

export default App;
