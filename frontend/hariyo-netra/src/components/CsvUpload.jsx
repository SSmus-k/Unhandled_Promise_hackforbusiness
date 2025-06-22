import React, { useState } from 'react'

export default function CsvUpload() {
  const [file, setFile] = useState(null)

 const handleSubmit = async (e) => {
  e.preventDefault();
  const fileInput = e.target.csv_file;
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert("Please select a CSV file to upload.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("csv_file", file);

  try {
    const res = await fetch("/api/upload_csv/", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    alert(result.message);
  } catch (error) {
    alert("Upload failed");
    console.error(error);
  }
};



  return (
    <form className="text-md font-bold flex gap-4" onSubmit={handleSubmit}>
      <input
        type="file"
        name='csv_file'
        accept=".csv"
        className="file-input"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn" type="submit">Upload</button>
    </form>
  )
}
