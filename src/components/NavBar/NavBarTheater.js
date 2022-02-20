import React from "react";
import { useHistory, Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import style from "./NavBarTheater.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar, Container, Button } from "react-bootstrap";

export default function NavBarTheater({ id, img }) {
  const { logout } = useUser();

  const history = useHistory();

  function handleLogOut(e) {
    e.preventDefault();
    logout();
  }

  return (
    <div className={style.navContainer}>
      <Navbar
        className={style.heigthConfig}
        bg="dark"
        variant="dark"
        expand={false}
      >
        <Container fluid>
          <div className={style.left}>
            <Navbar.Brand href={`/theaterHome/${btoa(id)}`}>
              A Sala Llena
            </Navbar.Brand>
            <img className={style.profileImage} src={img} alt="img" />
          </div>

          <div className={style.buttonsContainer}>
            {/* //------------------Boton Dropdown------------------------- */}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Mi cuenta
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`/create/${btoa(id)}`}>
                  <Button variant="outline-dark" href={`/create/${btoa(id)}`}>
                    Agregar espectáculos
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item href={`/salesHistory/${btoa(id)}`}>
                  <Button variant="outline-dark">Ventas</Button>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => history.push(`/editProfileTheater/${btoa(id)}`)}
                >
                  <Button variant="outline-dark">Perfil</Button>
                </Dropdown.Item>
                <Dropdown.Item href="">
                  <Button variant="outline-dark" onClick={handleLogOut}>
                    Cerrar Sesión
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
