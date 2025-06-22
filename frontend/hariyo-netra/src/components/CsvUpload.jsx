import React, { useState } from 'react';

export default function CsvUpload() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileInput = e.target.csv_file;
    if (!fileInput || !fileInput.files.length) return alert("Select a file");

    const formData = new FormData();
    formData.append("csv_file", fileInput.files[0]);

    try {
      const res = await fetch("/api/process_csv/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input type="file" name="csv_file" accept=".csv" className="file-input" />
        <button className="btn" type="submit">Upload</button>
      </form>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Analysis Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
