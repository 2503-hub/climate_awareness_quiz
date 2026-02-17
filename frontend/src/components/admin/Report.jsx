import { useState } from "react";
import { saveAs } from "file-saver";
import { fetchReports } from "../api/reportApi";
import { ArrowLeft, Download, RefreshCw } from "lucide-react"; // Added modern icons
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Define your available quiz categories here
  const categories = [
    "Climate Science",
    "Renewable Energy",
    "Biodiversity",
    "Policy & Mitigation",
    "General"
  ];

  const [params, setParams] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const handleFetchReports = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const data = await fetchReports(params);
      setReports(data);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setReports([]);
      setHasSearched(true);
      setErrorMessage("Could not fetch reports. Ensure you are logged in as an Admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (!reports.length) return;
    const headers = Object.keys(reports[0]).join(",");
    const rows = reports
      .map((r) => Object.values(r).map((v) => `"${v}"`).join(","))
      .join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "climate_report.csv");
  };

  return (
    <div className="reports-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={20} /> Dashboard
      </button>

      <h2>Climate Quiz Analytics</h2>

      <div className="report-filters">
        <div className="input-wrapper">
          <label>From</label>
          <input
            type="date"
            name="startDate"
            value={params.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-wrapper">
          <label>To</label>
          <input
            type="date"
            name="endDate"
            value={params.endDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-wrapper">
          <label>Topic Category</label>
          <select
            name="category"
            value={params.category}
            onChange={handleInputChange}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button className="primary-btn" onClick={handleFetchReports} disabled={loading}>
          {loading ? <RefreshCw className="spinner" size={18} /> : "Fetch Reports"}
        </button>

        {reports.length > 0 && (
          <button className="secondary-btn" onClick={handleDownloadCSV}>
            <Download size={18} /> Download CSV
          </button>
        )}
      </div>

      {loading && <p className="loading">Searching database...</p>}

      {!loading && errorMessage && <p className="error-msg">{errorMessage}</p>}
      
      {!loading && hasSearched && !errorMessage && reports.length === 0 && (
        <div className="empty-msg-box">
          <p>No results found for these filters.</p>
          <span>Try expanding your date range or selecting "All Categories".</span>
        </div>
      )}

      <div className="report-table">
        {reports.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Questions</th>
                <th>Score</th>
                <th>Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, idx) => (
                <tr key={idx}>
                  <td><strong>{r.user}</strong></td>
                  <td>{r.email}</td>
                  <td>{r.questionCount}</td>
                  <td className={r.score > 70 ? "high-score" : ""}>{r.score}%</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td><span className="badge">{r.category}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .reports-container { padding: 2.5rem; min-height: 100vh; background: #f0f7ff; font-family: 'Inter', sans-serif; }
        h2 { margin-bottom: 2rem; color: #1e3a8a; font-weight: 700; }
        .back-btn { display: flex; align-items: center; gap: 6px; background: none; border: none; color: #2563eb; font-weight: 600; cursor: pointer; margin-bottom: 1.5rem; }
        
        .report-filters { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 1.5rem; 
          margin-bottom: 2rem; 
          background: white; 
          padding: 1.5rem; 
          border-radius: 12px; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          align-items: flex-end;
        }

        .input-wrapper { display: flex; flex-direction: column; gap: 0.5rem; }
        .input-wrapper label { font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; }

        .report-filters input, .category-select { 
          padding: 0.6rem 1rem; 
          border-radius: 8px; 
          border: 1px solid #cbd5e1; 
          background: #f8fafc;
          min-width: 200px;
        }

        .primary-btn { background: #2563eb; color: white; padding: 0.7rem 1.5rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .secondary-btn { background: #10b981; color: white; padding: 0.7rem 1.5rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        
        .report-table { background: white; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f1f5f9; color: #475569; padding: 1rem; text-align: left; font-size: 0.85rem; }
        td { padding: 1rem; border-top: 1px solid #f1f5f9; font-size: 0.9rem; }
        .high-score { color: #059669; font-weight: 700; }
        .badge { background: #dbeafe; color: #1e40af; padding: 0.2rem 0.6rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
        
        .empty-msg-box { background: #fffbeb; border: 1px solid #fef3c7; padding: 2rem; border-radius: 12px; text-align: center; }
        .empty-msg-box p { color: #92400e; font-weight: 700; margin: 0; }
        .empty-msg-box span { color: #b45309; font-size: 0.9rem; }

        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}