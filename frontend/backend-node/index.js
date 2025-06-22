import express from 'express'
import { mockUsers } from './mockData.js'

const app = express()
const port = 3000

app.use(express.json()) 

let users = [...mockUsers]

app.get('/api/users', (req, res) => {
  res.send(users)
})

app.post('/api/signup', (req, res) => {
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
  res.status(201).json({ message: 'User registered successfully', user: newUser });
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
