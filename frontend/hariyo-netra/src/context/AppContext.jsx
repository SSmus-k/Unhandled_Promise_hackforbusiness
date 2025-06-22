import {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios';

const AppContext = createContext();

 export const AppProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    try {
      const res = await axios.get('/api/users')
      const users = res.data
      console.log("Users from API:", res.data)
      const foundUser = users.find(
        (u) => u.email.trim() === email.trim() && u.password === password
      )
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser))
        setUser(foundUser)
        return foundUser
      } else {
        throw new Error('Invalid Email or password.')
      }
    } catch (err) {
      console.error("Login error:", err.message)
      throw err
    }
    
  }


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

    return(
        <AppContext.Provider value={{user,login,logout,setUser}}>
            {children}
        </AppContext.Provider>
    )
}


export const useApp = ()=>(useContext(AppContext))