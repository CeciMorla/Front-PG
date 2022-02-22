import React, { useState, useEffect } from "react";
import { postPasswordRecoveryViewer } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllViewers } from "../../redux/actions/index.js";
import style from "./PasswordRecoveryViewer.module.css";
import { Navbar, Form, Container, Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom';
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
    setEmail( e.target.value,
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const filterViewer = viewers?.find((e) => e.email === email);
    if (filterViewer) {
      postPasswordRecoveryViewer(email);
      swal("Email enviado!", "", "success");
      history.push('/')
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
          <Navbar.Brand href="/">
            <p className={style.logo}>A Sala Llena</p>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className={style.bodyContainer}>
        <h2>Ingresa tu correo electrónico</h2>
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
    </div>
  );
};

export default PasswordRecoveryViewer;
