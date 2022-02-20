import React, {useState} from 'react'



const Context = React.createContext({})

export function UserContextProvider ({children}) {
  
  const [status, setStatus] = useState(
    () => window.sessionStorage.getItem('status')
  );
  const [loginData, setLoginData] = useState(
    () => window.sessionStorage.getItem('loginData')
  );
  const [id,setId] = useState(
    () => window.sessionStorage.getItem('id')
  )
  ;
  const [error,setError] = useState(
    () => window.sessionStorage.getItem('error')
  )
  
  

  return <Context.Provider value={{
    status,
    setStatus,
    loginData,
    setLoginData,
    id,
    setId,
    error,
    setError
  }}>
    {children}
  </Context.Provider>
}

export default Context;