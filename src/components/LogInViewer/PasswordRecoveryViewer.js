import React, { useState, useEffect } from "react";
import { postPasswordRecoveryViewer } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllViewers } from "../../redux/actions/index.js";
import style from "./LoginViewer.module.css";
import { Navbar, Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom.min";

import swal from "sweetalert";

const PasswordRecoveryViewer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const viewers = useSelector((state) => state.viewers);
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(getAllViewers());
  }, [dispatch]);

  function inputChange(e) {
    setEmail(
       e.target.value,
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const filterViewer = viewers?.find((e) => e.email === email);
    if (filterViewer) {
      dispatch(postPasswordRecoveryViewer(email));
      swal("Email enviado!", "", "success");
      history.push('https://front-pg.vercel.app') 
      setEmail("");
    } else {
      swal("", "Este email no esta registrado!", "error");
    }
  }

  return (
    <div>
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
      <h2>Ingresa tu correo electronico</h2>
      <div className={style.loginContainer}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Email..."
              value={email}
              name="email"
              onChange={inputChange}
            />
          </Form.Group>
          <Button variant="dark" type="submit" onClick={handleSubmit}>
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PasswordRecoveryViewer;
