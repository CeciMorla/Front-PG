import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { Link, Redirect } from "react-router-dom";
import useUser from "../../hooks/useUser.js";
import { getAllViewers } from "../../redux/actions/index.js";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Form, Container, Button } from "react-bootstrap";
import style from "./LoginViewer.module.css";
import swal from "sweetalert";


function validate(input) {
  let errors = {};
  if (input.email === "") {
    errors.email = "e-mail no puede estar vacio";
  }
  if (!input.email.includes("@")) {
    errors.email = "No es un email valido";
  }
  if (input.password === "") {
    errors.password = "password no puede estar vacio";
  }

  return errors;
}

const LogInViewer = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { hasLoginError,hasLoginErrorG, loginviewer,googleLoginViewer,idV, statusIdV} = useUser();
  const viewers = useSelector((state) => state.viewers);
  

  
  console.log('statusIdV',statusIdV)
  console.log('hasLoginError',hasLoginError)
  useEffect(() => {
    dispatch(getAllViewers());
  }, [dispatch]);

  

  const filterViewer = viewers?.find(
    (e) => e.email === input.email && e.password === input.password
  );
  console.log(filterViewer);
  console.log('hasLoginErrorG',hasLoginErrorG)
  

  const handleFailure = (response) => {
    if(hasLoginErrorG){
      swal('Usuario invalido');
    }
    console.log(response)
  };

  
  function handleLogin (googleData) {
    googleLoginViewer(googleData)
    console.log('googleData',googleData)
  };
  console.log('idV',idV)
  function inputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginviewer(input);
    setInput({ email: "", password: "" });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  return (
    <div>
      {/* <div className={style.header}>
        <Link to="/">
          <img className={style.logo} src={logo} alt="A sala llena" />
        </Link>
      </div>
      <div className={style.formContainer}>
        <form className={style.inputs} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email..."
            value={input.email}
            name="email"
            onChange={inputChange}
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            type="password"
            placeholder="password"
            value={input.password}
            name="password"
            onChange={inputChange}
          />
          {errors.password && <p>{errors.password}</p>}
          <Link to={`/viewerHome/${filterViewer?.id}`}>
            <button>LogIn</button>
          </Link>
        </form>
        {hasLoginError && <strong>Usuario o contraseña invalidos</strong>}
        <br></br>
        <br></br>

        <GoogleLogin
          clientId="506901482868-h6pf1ffiuv7vicavl8btlunj18oeamjr.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
        <p>o</p>
        <Link to="/formViewerRegister">
          <button>REGISTRARSE</button>
        </Link>
        <Link to="/passwordRecoveryViewer">Olvide mi contraseña</Link>
      </div> */}

      <Navbar
        className={style.heigthConfig}
        bg="dark"
        variant="dark"
        expand={false}
      >
        <Container fluid>
          <Navbar.Brand href="/">A Sala Llena</Navbar.Brand>
        </Container>
      </Navbar>
      
      <div className={style.loginContainer}>
        {
          statusIdV ? 
          <Redirect to={`/viewerHome/${btoa(statusIdV)}`}/> : 
          <form onSubmit={handleSubmit}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email..."
              value={input.email}
              name="email"
              onChange={inputChange}
            />
            {errors.email && <p>{errors.email}</p>}
            <Form.Text className="text-muted">
              Nunca compartiremos esta información
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={inputChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </Form.Group>
          
          
            <Button variant="dark" type="submit" onClick={handleSubmit}>
              Iniciar Sesion
            </Button>
          
        </Form>
        {hasLoginError && <strong>Usuario o contraseña invalidos</strong>}
        </form>
        }
        
        
        <div className={style.btn}>
          <Link to="/formViewerRegister">
            <Button variant="dark" type="submit">
              Registrarse
            </Button>
          </Link>
        </div>
        <Link to="/passwordRecoveryViewer">¿Olvidaste tu contraseña?</Link>
        {
          idV > 0 ? 
            <Redirect to={`/viewerHome/${btoa(idV)}`}/> :
          <form>
          <GoogleLogin
          clientId="506901482868-h6pf1ffiuv7vicavl8btlunj18oeamjr.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
          />
          
          {hasLoginErrorG && <strong>Usuario invalido</strong>}
          </form>
        }
        
      </div>
    </div>
  );
};

export default LogInViewer;
