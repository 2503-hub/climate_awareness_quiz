import {  useState } from "react";
import { saveAs } from "file-saver";
import { fetchReports } from "../api/reportApi";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Could not fetch reports. Please try again.");
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
    saveAs(blob, "report.csv");
  };

  return (
    <div className="reports-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={20} /> Dashboard
      </button>

      <h2>Generate Reports</h2>

      <div className="report-filters">
        <input
          type="date"
          name="startDate"
          value={params.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          value={params.endDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={params.category}
          onChange={handleInputChange}
        />
        <button className="primary-btn" onClick={handleFetchReports}>
          Fetch Reports
        </button>
        {reports.length > 0 && (
          <button className="secondary-btn" onClick={handleDownloadCSV}>
            Download CSV
          </button>
        )}
      </div>

      {loading && <p className="loading">Loading reports…</p>}

      {!loading && errorMessage && <p className="error-msg">{errorMessage}</p>}
      {!loading && hasSearched && !errorMessage && reports.length === 0 && (
        <p className="empty-msg">
          No reports found for these filters. Try leaving category blank or using "general".
        </p>
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
                  <td>{r.user}</td>
                  <td>{r.email}</td>
                  <td>{r.questionCount}</td>
                  <td>{r.score}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Embedded CSS */}
      <style>{`
        .reports-container {
          padding: 2rem;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #e6f4ff, #f5fbff);
          font-family: 'Segoe UI', sans-serif;
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #1e3a8a;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1rem;
        }

        .back-btn:hover {
          color: #1d4ed8;
        }

        .report-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .report-filters input {
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          border: 1px solid #93c5fd;
          outline: none;
          background: #ffffff;
          transition: 0.2s ease;
        }

        .report-filters input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }

        .primary-btn {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: none;
          background: #2563eb;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .primary-btn:hover {
          background: #1d4ed8;
        }

        .secondary-btn {
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: none;
          background: #0ea5e9;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .secondary-btn:hover {
          background: #0284c7;
        }

        .loading {
          color: #2563eb;
          font-weight: 500;
        }

        .error-msg {
          color: #b91c1c;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .empty-msg {
          color: #334155;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .report-table {
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
          padding: 1rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background-color: #dbeafe;
          color: #1e3a8a;
          padding: 0.8rem;
          text-align: left;
          font-size: 0.9rem;
        }

        td {
          padding: 0.8rem;
          border-top: 1px solid #e5e7eb;
          font-size: 0.9rem;
        }

        tr:hover {
          background-color: #f0f9ff;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .report-filters {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
          }

          th, td {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
