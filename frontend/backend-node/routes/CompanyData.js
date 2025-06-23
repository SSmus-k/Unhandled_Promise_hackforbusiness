// routes/CompanyData.js
import express from 'express';

const router = express.Router();

let companyDataStore = []; // In-memory store

router.post('/', (req, res) => {
  const data = req.body;
  if (!data || data.length === 0) {
    return res.status(400).json({ message: 'No data received' });
  }
  companyDataStore = data;
  console.log("✅ Company data stored:", companyDataStore.length, "records");
  res.status(200).json({ message: "Company data stored successfully" });
});

router.get('/', (req, res) => {
  res.status(200).json(companyDataStore);
});

export default router;
