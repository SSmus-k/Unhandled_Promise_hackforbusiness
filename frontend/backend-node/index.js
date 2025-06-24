import express from 'express'
import cors from 'cors'
import { mockUsers } from './mockData.js'
import fs from 'node:fs'

import CompanydataRoute from './routes/CompanyData.js'
import path from 'node:path'
const app = express()
app.use(cors())
const port = 3000

app.use(express.json()) 

let users = [...mockUsers]

app.get('/auth/users', (req, res) => {
  res.send(users)
})

// API for Authentication

app.post('/auth/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    isSubscribed: false,
    totalProducts: 0,
    totalMaterials: 0,
    waste_type: '',
    is_sustainable: false,
    waste_amount: 0
  };
  console.log('📥 Signup request received for:', email);


  users.push(newUser);
    const dataToWrite = `export const mockUsers = ${JSON.stringify(users, null, 2)};`;
  fs.writeFile(path.join(process.cwd(),('/mockData.js')), dataToWrite, err=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("📥 " + newUser.name + " registered succesfully.") 
    }
})
  res.status(201).json({ message: 'User registered successfully', user: newUser });
})


// API for Company Data

app.use(express.json());

app.use("/auth/companydata", CompanydataRoute);

app.listen(3000, () => console.log("Server running on port 3000"));
