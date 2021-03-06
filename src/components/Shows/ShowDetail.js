import React, { useEffect, useState } from "react";
import { showDetail, totalPrice } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./ShowDetail.module.css";
import Countdown from "react-countdown";
import { Navbar, Container, Button } from "react-bootstrap";
import {putShow} from "../../redux/actions/index.js";
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
  
  
  const newrelased = {
    released: true,
  };
  

  useEffect(() => {
    
      dispatch(showDetail(id));
    
  }, [dispatch, id]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (<div>
        <p>La obra ya ha comenzado!</p>
      </div>);
    } else {
      return (
        <div className={style.timer}>
          <div className={style.timercont}>
          <h3>{days}</h3>
          <span className="text-muted"> Dias    </span>
          </div>
          <div className={style.timercont}>
          <h3>{hours} </h3>
          <span className="text-muted"> Horas   </span>
          </div>
          <div className={style.timercont}>
          <h3>{minutes}</h3>
          <span className="text-muted"> Minutos </span>
          </div>
          <div className={style.timercont}>
          <h3>{seconds}</h3>
          <span className="text-muted">Segundos</span>
          </div>
        </div>
      );
    }
  };
  const onStart = ({ days, hours }) => {
    setTiempo({
      dia: days,
      hora: hours,
    });
    console.log(tiempo.dia);
    numerodeporcentaje();
  };
  const handleComplete  = ()=>{
    dispatch(putShow(id, newrelased));
    
  }

  function numerodeporcentaje() {
    if (tiempo.dia === 0 && tiempo.hora < 12) {
      setPorcentaje(10);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia === 0 && tiempo.hora > 12) {
      setPorcentaje(15);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia === 1 && tiempo.hora < 12) {
      setPorcentaje(20);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia === 1 && tiempo.hora > 12) {
      setPorcentaje(25);
      porcentajefuncion(porcentaje);
    } else if (tiempo.dia >= 2 && tiempo.hora >= 0) {
      setPorcentaje(30);
      porcentajefuncion(porcentaje);
    }
  }

  console.log(tiempo.dia, "dia");

  const onSubmit = () => {
    for (let i = 0; i < show?.tickets.length; i++) {
      let tickets = {
        id: show?.tickets[i].id,
        seatNumber: show?.tickets[i].seatNumber,
        price: preciofinal,
      };
      dispatch(putTicket(show?.tickets[i].id, tickets));
      dispatch(totalPrice(preciofinal));
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
              <Navbar.Brand href="/">
                <p className={style.logo}>A Sala Llena</p>
              </Navbar.Brand>
            </div>
          </Container>
        </Navbar>
      </div>

      <div className={style.title}>
        <h1>{show?.name}</h1>
      </div>
      {/* //-------------------card---------------- */}
      <div className={style.cardDetail}>
        <div>
          <div>
            <img src={show?.image} className={style.image} alt="img" />
          </div>
          <div className={style.boxSummary}>
            <h3>Descripci??n</h3>
            <p>{show?.summary}</p>
          </div>
        </div>
        {/* //-------------------Timer--------------- */}
        <div className={style.timerContainer}>
          <h2 className={style.highlight}>Este show comienza en</h2>
          <Countdown date={dateTimer} renderer={renderer} onTick={onStart} onComplete={handleComplete}>
          </Countdown>
        </div>
        {/* //-------------------1row---------------- */}

        <div className={style.datos}>
          <div className={style.first}>
            <div className={style.box}>
              <h3>Tipo de p??blico </h3>
              <h4>{show?.rated} </h4>
            </div>
            <div className={style.box}>
              <h3>Duraci??n </h3>
              <h4>{show?.length} </h4>
            </div>
            <div className={style.box}>
              <h3>G??nero </h3>
              <h4>{show?.genre} </h4>
            </div>
          </div>

          {/* //-------------------2row---------------- */}

          <div className={style.first}>
            <div className={style.box1}>
              <h3>Precio Original</h3>
              <s>${show?.originPrice}</s>
            </div>
            <div className={style.box1}>
              <h2 className={style.highlight}>Precio Reducido</h2>
              <h3>${preciofinal}</h3>
            </div>
            <div className={style.box1}>
              <h3>Descuento actual</h3>
              <h4>{porcentaje}%</h4>
            </div>
          </div>
          {/* //-------------------3row---------------- */}
          <div className={style.first}>
            <div className={style.box}>
              <h3>Entradas disponibles</h3>
              <h4>{show?.seatsAvailable?.length} </h4>
            </div>
            <div className={style.box}>
              <h3>Fecha</h3>
              <h4>{show?.date} </h4>
            </div>
            <div className={style.box}>
              <h3>Hora</h3>
              <h4>{show?.time} </h4>
            </div>
          </div>
          {/* //---------------------------------- */}

          <div className={style.btnContainer}>
          {show?.seatsAvailable?.length > 0 && show?.released === false? (
            <Link
              to={`/pasarela/${id}/${idV}`}
              style={{ textDecoration: "none" }}
            >
                <Button className={style.btn} variant="dark" onClick={onSubmit}>
                Comprar
              </Button>
              </Link>
              ) : (
                <Button disabled className={style.btn} variant="dark" onClick={onSubmit}>
                Comprar
              </Button>
              )}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};
export default ShowDetail;
