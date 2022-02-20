import React, { useEffect, useState } from "react";
import { showDetail } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./ShowDetail.module.css";
import Countdown from "react-countdown";
import { Navbar, Container, Button } from "react-bootstrap";

import { putTicket } from "../../redux/actions/index.js";

const ShowDetail = () => {
  const show = useSelector((state) => state.showdetail);
  const dispatch = useDispatch();
  const { id, idV } = useParams();
  //const [precio, setPrecio]= useState(null);
  const [tiempo, setTiempo] = useState({
    dia: 0,
    hora: 0,
  });
  const [preciofinal, setPreciofinal] = useState("");
  const [porcentaje, setPorcentaje] = useState(null);
  const [decodShowId, setDecodShowId] = useState("");
  const [decodViewerId, setDecodViewerId] = useState("");

  useEffect(async () => {
    await setDecodShowId(atob(id));
    await setDecodViewerId(atob(idV));
  }, [id, idV]);

  useEffect(() => {
    if(decodShowId > 0){
      dispatch(showDetail(decodShowId));
    }
  }, [dispatch, decodShowId]);
  console.log('decodShowId',decodShowId)
  console.log(show);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      <div>
        <p>La obra ya ha comenzado!</p>
      </div>;
    } else {
      return (
        <div className={style.timer}>
          <p>{days}</p>
          <p>
            <small> Dias</small>
          </p>
          <span>:</span>
          <p>{hours} </p>
          <p>
            <small> Horas</small>
          </p>
          <span>:</span>
          <p>{minutes}</p>
          <p>
            <small> Minutos</small>
          </p>
          <span>:</span>
          <p>{seconds}</p>
          <p>
            <small> Segundos</small>
          </p>
        </div>
      );
    }
  };
  const onStart = ({ days, hours }) => {
    setTiempo({
      dia: days,
      hora: hours,
    });
    numerodeporcentaje();
  };

  function numerodeporcentaje() {
    if (tiempo.dia === 0 && tiempo.hora < 6) {
      setPorcentaje(10);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia === 0 && tiempo.hora < 12) {
      setPorcentaje(15);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia === 0 && tiempo.hora > 12) {
      setPorcentaje(20);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia === 1 && tiempo.hora > 12) {
      setPorcentaje(25);
      porcentajefuncion(porcentaje);
    } else {
      setPorcentaje(30);
      porcentajefuncion(porcentaje);
    }
  }

  const onSubmit = () => {
    for (let i = 0; i < show?.tickets.length; i++) {
      let tickets = {
        id: show?.tickets[i].id,
        seatNumber: show?.tickets[i].seatNumber,
        price: preciofinal,
      };
      dispatch(putTicket(show?.tickets[i].id, tickets));
      console.log(tickets, "tikeron");
    }
  };

  function porcentajefuncion(porcentajes) {
    var descuento = (show?.originPrice * porcentajes) / 100;
    var preciofinal = show?.originPrice - descuento;
    setPreciofinal(preciofinal);
  }

  let dateTimer = `${show?.date} ${show?.time}`;
  return (
    <div className={style.detailContainer}>
      <div className={style.navDetail}>
        <Navbar
          className={style.heigthConfig}
          bg="dark"
          variant="dark"
          expand={false}
        >
          <Container fluid>
            <div className={style.left}>
              <Navbar.Brand href="/">A Sala Llena</Navbar.Brand>
            </div>
          </Container>
        </Navbar>
      </div>

      <div className={style.title}>
        <h1>{show?.name}</h1>
      </div>

      <div className={style.cardDetail}>
        <div>
          <div>
            <img src={show?.image} className={style.image} alt="img" />
          </div>
          <div className={style.description}>
            <h3>Descripcion : </h3>
            <p>{show?.summary}</p>
          </div>
        </div>
        <div className={style.der}>
          <div className={style.datos}>
            <div className={style.first}>
              <div>
                <h3>Tipo de publico </h3>
                <h4>{show?.rated} </h4>
              </div>
              <div>
                <h3>Duracion </h3>
                <h4>{show?.length} </h4>
              </div>
              <div>
                <h3>Genero </h3>
                <h4>{show?.genre} </h4>
              </div>
            </div>
            <div className={style.timerContainer}>
              <h3>Este show comienza en</h3>
              <Countdown date={dateTimer} renderer={renderer} onTick={onStart}>
                <div>
                  <p>La obra ya ha comenzado!</p>
                </div>
              </Countdown>
            </div>
            <div className={style.first}>
              <div>
                <h3>Entradas disponibles: </h3>
                <h4>{show?.ticketsQty} </h4>
              </div>
              <div>
                <h3>Fecha: </h3>
                <h4>{show?.date} </h4>
              </div>
              <div>
                <h3>Hora: </h3>
                <h4>{show?.time} </h4>
              </div>
            </div>
            <div className={style.first}>
              <div>
                <h3>Precio Original: </h3>
                <s>${show?.originPrice}</s>
              </div>
              <div>
                <h3>Precio Reducido:</h3>
                <h4>${preciofinal}</h4>
              </div>
              <div>
                <h3>Porcentaje de descuento actual:</h3>
                <h4>{porcentaje}%</h4>
              </div>
            </div>
            <div className={style.btnContainer}>
              <Link
                to={`/pasarela/${id}/${idV}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  className={style.btn}
                  variant="primary"
                  onClick={onSubmit}
                >
                  Comprar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default ShowDetail;
