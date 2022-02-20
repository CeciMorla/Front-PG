import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext.js";
import { loginTheater, loginViewer } from "../redux/actions/index.js";


const useUser = () => {
  const { status, setStatus,loginData,setLoginData,id,setId,error,setError} = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });
  const [stateG, setStateG] = useState({ loading: false, error: false });
  const [idV,setIdV] = useState('');
  const [idT,setIdT] = useState('');
  const [statusIdV,setStatusIdV] = useState('');
  const [statusIdT,setStatusIdT] = useState('');
  const [errorG,setErrorG] = useState('');
  

  const login = useCallback(
    (input) => {
      setState({ loading: true, error: false });
      loginTheater(input)
        .then((data) => {
          window.sessionStorage.setItem("status", data.isLogged);
          window.sessionStorage.setItem("id", data.id);
          
          setState({ loading: false, error: false });
          setStatus(data.isLogged);
          setStatusIdT(window.sessionStorage.getItem('id').valueOf())
        })
        .catch((err) => {
          window.sessionStorage.removeItem("status");
          window.sessionStorage.removeItem("id");
          
          setState({ loading: false, error: true });
          console.error(err);
        });
    },
    [setStatus]
  );

  const loginviewer = useCallback(
    (input) => {
      setState({ loading: true, error: false });
      loginViewer(input)
        .then((data) => {
          window.sessionStorage.setItem("status", data.isLogged);
          window.sessionStorage.setItem("id", data.id);
          setState({ loading: false, error: false });
          setStatus(data.isLogged);
          setStatusIdV(window.sessionStorage.getItem('id').valueOf())
          
        })
        .catch((err) => {
          window.sessionStorage.removeItem("status");
          window.sessionStorage.removeItem("id");
          
          setState({ loading: false, error: true });
          console.error(err);
        });
    },
    [setStatus]
  );

  const googleLoginViewer = async (googleData) => {
    try {
      const res = await fetch('http://localhost:3001/login/google/viewer', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await res.json();
    
    if(JSON.stringify(data.id) > 0){
      setLoginData(data.token);
      
      sessionStorage.setItem('loginData', JSON.stringify(data.token));
      sessionStorage.setItem('id', JSON.stringify(data.id));
      setIdV(window.sessionStorage.getItem('id').valueOf())
    }else{
      setStateG({ loading: false, error: true });
    }
    
    } catch (err) {
          window.sessionStorage.removeItem("loginData");
          window.sessionStorage.removeItem("id");
          
          setState({ loading: false, error: true });
          console.error(err);
    }
    
  };
  
  const googleLoginTheater = async (googleData) => {
    const res = await fetch('http://localhost:3001/login/google/theater', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await res.json();
    if(JSON.stringify(data.id) > 0){
      setLoginData(data.token);
      
      sessionStorage.setItem('loginData', JSON.stringify(data.token));
      sessionStorage.setItem('id', JSON.stringify(data.id));
      setIdT(window.sessionStorage.getItem('id').valueOf())
    }else{
      setStateG({ loading: false, error: true });
    }
    
    
  };
 

   const logout = useCallback(() => {
    window.sessionStorage.removeItem("status");
    window.sessionStorage.removeItem("loginData");
    window.sessionStorage.removeItem("id");
    
    setStatusIdV(null);
    setStatus(null);
    setLoginData(null);
    setId(null);
    window.location.href="http://localhost:3000/"
  }, [setStatus,setLoginData,setId])

  return {
    isLogged: Boolean(status),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    hasLoginErrorG: stateG.error,
    login,
    logout,
    loginviewer,
    googleLoginViewer,
    googleLoginTheater,
    idV,
    idT,
    statusIdV,
    statusIdT
    
    
    
  };
};

export default useUser;
