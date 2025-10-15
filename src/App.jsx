import './App.css';
import { useState } from 'react';
import { data } from './data.js';

function App() {
  const [filterField, setFilterField] = useState("all");
  const [search, setSearch] = useState("");

  // Get unique options for dropdown
  const companyOptions = [...new Set(data.map(item => item.company_name))];
  const locationOptions = [...new Set(data.map(item => item.location))];
  const industryOptions = [...new Set(data.map(item => item.industry_type))];

  const options =
    filterField === "company_name"
      ? companyOptions
      : filterField === "location"
        ? locationOptions
        : filterField === "industry_type"
          ? industryOptions
          : [];

  return (
    <div className="container">
      <h3>Filter Table Data</h3>

      <form>
        <select onChange={(e) => setFilterField(e.target.value)} value={filterField}>
          <option value="all">All</option>
          <option value="company_name">Company Name</option>
          <option value="location">Location</option>
          <option value="industry_type">Industry Type</option>
        </select>

        {filterField !== "all" && (
          <select onChange={(e) => setSearch(e.target.value)} value={search}>
            <option value="">Select {filterField.replace("_", " ")}</option>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Search Text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Location</th>
            <th>Industry Type</th>
          </tr>
        </thead>

        <tbody>
          {data
            .filter((item) => {
              const searchLower = search.toLowerCase();

              if (!search) return true;

              if (filterField === "all") {
                return (
                  item.company_name.toLowerCase().includes(searchLower) ||
                  item.location.toLowerCase().includes(searchLower) ||
                  item.industry_type.toLowerCase().includes(searchLower)
                );
              } else {
                return item[filterField].toLowerCase().includes(searchLower);
              }
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.company_name}</td>
                <td>{item.location}</td>
                <td>{item.industry_type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
