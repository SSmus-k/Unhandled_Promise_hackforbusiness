import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useCsvData } from '../context/CsvContext';

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const { setCsvData } = useCsvData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const json = results.data;

        // API lai data pathako
        await fetch('/auth/companydata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
        });

        // API bata data taneko
        const res = await fetch('/auth/companydata');
        const finalData = await res.json();
        setCsvData(finalData); 
        localStorage.setItem("csvData", JSON.stringify(finalData));
      },
    });
  };
  useEffect(() => {
  const savedData = localStorage.getItem("csvData");
  if (savedData) {
    setCsvData(JSON.parse(savedData));
  }
}, []);

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input text-gray-900"
      />
      <button className="btn" type="submit">Upload</button>
    </form>
  );
}
