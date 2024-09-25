

//context for authorization

import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';



const AuthContext = createContext('');


const useAuth =()=> useContext(AuthContext)

const AuthProvider = ({ children }) => {
      
    const [auth, setAuth] = useState({
    name:'',
    token:'',
    isAdmin:false
    });

    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(()=>{
    const data = localStorage.getItem('auth');
    if(data){
        const {name,token,isAdmin} = JSON.parse(data); 
        setAuth({...auth,name,token,isAdmin});
        axios.defaults.headers.common['Authorization'] = token
    }
    },[])

    return (
        <AuthContext.Provider value={[ auth, setAuth ] }>
        {children}
        </AuthContext.Provider>
    );
  };


  export { useAuth, AuthProvider };
  