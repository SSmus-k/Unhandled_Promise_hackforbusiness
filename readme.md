# ♻️ Hariyo Netra – Smart Waste Management Dashboard

**Hariyo Netra** is a smart waste management web application built for the HackForBusiness Hackathon. It empowers businesses to monitor, analyze, and improve their environmental footprint through intuitive data visualizations, AI-powered insights, and sustainability tracking.

---

## 🚀 Features

- 📊 **CSV Upload & Parsing** – Upload company waste reports in CSV format.

- 🧠 **Waste Management Suggestions** – Get actionable tips on reducing and managing waste.

- 📈 **Dashboard Overview** – Visualize monthly trends, waste breakdowns, and reusable statistics.

- 🎯 **Sustainability Scoring** – Calculate recycling efficiency, carbon offset, and overall sustainability.

- 📍 **Bin Monitoring** – Track bins with location, fill level, and collection history.

- 📦 **Category-Wise Analysis** – Pie charts and line graphs by waste category (Plastic, Metal, Organic, etc.)

- ⭐ **Dynamic Rating System** – Star-based sustainability rating based on internal metrics.

- 🔒 **User Authentication** – Secure login system for personalized dashboards.

---

## 📁 Folder Structure
```
│
├── backend/ 
│ ├── api/
│ ├── hariyobase/
│ └── media/
│ └── db.sqlite3
│ └── manage.py
│ └── requirements.txt
│
├── frontend/ 
├ ├── backend-node
├ ├── routes/
├ ├── index.js
├ ├── mockData.js
├ ├── package.json
│
│ ├── components/ # Reusable UI components
│ ├── pages/ # Routes like Dashboard, Profile, Login, etc.
│ ├── context/ # Global state using Context API
│ ├── assets/ # Logos, images, etc.
│ └── App.jsx
│
├── README.md # This file

```


---

## 🧠 Sustainability Algorithm

We calculate sustainability based on:
- ♻️ **Recycling Efficiency**: `% of reusable waste out of total`

- 🌿 **Carbon Offset Per Product**: `CO2 offset / total units produced`

- 🧪 **Waste Efficiency**: `(waste per product) compared to safe threshold`

These values generate a **Sustainability Percent**, and a star rating is assigned accordingly.

---

## 📦 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/hariyo-netra.git
cd hariyo-netra
```
### 2. Start Backend (Express)
```
cd frontend/backend-node
npm i
npm run start
```
### 3. Start Frontend (React)
```
cd frontend/hariyo-netra
npm i
npm run dev
```

## 💡 Future Improvements
- 📍 Real-time bin tracking with sensors

- 🤖 Integrate OpenAI or DeepSeek LLM directly for natural language suggestions

- 🌐 Cloud storage for uploaded reports

- 📱 Mobile responsive version

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts

- **Backend**: Node.js, Express.js, MongoDB

- **CSV Parsing**: PapaParse

- **AI Integration**: OpenAI (planned), DeepSeek (planned)

## 👥 Team Members

1. **Puskar Niraula** – Frontend, Data Logic, Visualizations

2. **Prakriti Shrestha** – Frontend, Presentation
3. **Prithak Koirala** – Frontend, Visualizations
4. **Sujan Bhusal** – Backend, Data Logic

## 🙌 Acknowledgements
This project was built with 💚 for the **HackForBusiness Hackathon**. Special thanks to mentors and organizers for making it possible.