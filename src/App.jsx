import './App.css';
import { useState } from 'react';
import { data } from './data.js';

function App() {
  const [filterField, setFilterField] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const filteredData = data.filter((item) => {
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
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Company Directory</h1>

        <form className="flex flex-wrap gap-4 mb-6 items-center justify-center">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => { setFilterField(e.target.value); setSearch(""); setCurrentPage(1); }}
            value={filterField}
          >
            <option value="all">All</option>
            <option value="company_name">Company Name</option>
            <option value="location">Location</option>
            <option value="industry_type">Industry Type</option>
          </select>

          {filterField !== "all" && (
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              value={search}
            >
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
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-60"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Company Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Industry Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-3 text-gray-700">{item.company_name}</td>
                  <td className="px-6 py-3 text-gray-700">{item.location}</td>
                  <td className="px-6 py-3 text-gray-700">{item.industry_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
