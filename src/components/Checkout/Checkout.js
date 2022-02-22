import React, { useState } from "react";
import { checkoutPay, putShow } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./Checkout.module.css";
import Countdown from "react-countdown";

export default function Checkout({
  price,
  id,
  idV,
  selected,
  setSelected,
  idShow,
}) {
  const show = useSelector((state) => state.showdetail);
  console.log(show);
  const showId = id;
  const idViewer = idV;
  const seatNumber = selected; //array de asientos elegidos
  console.log(seatNumber);
  const link = useSelector((state) => state.link);
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  console.log(tickets);

  // var equalShowId = tickets?.filter((t) => t?.showId === Number(showId));
  // var equalShowId = show?.filter((s) => s?.showId === Number(showId));

  // console.log(equalShowId); // me trae solo los tickets de los asientos disponibles
  // var total = 0;
  // if (seatNumber.length > 0) {
  //   for (var i = 0; i < 1; i++) {
  //     total = equalShowId[i]?.price * seatNumber?.length;
  //   }
  // }

  function buttonMp() {
    dispatch(checkoutPay({ seatNumber, showId, idViewer }));
  }



  const [tiempo, setTiempo] = useState({
    dia: 0,
    hora: 0,
  });
  const [preciofinal, setPreciofinal] = useState("");
  const [porcentaje, setPorcentaje] = useState(null);
  const [decodShowId] = useState("");
  const newrelased = {
    released: true,
  };
  
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (<div>
        <p>La obra ya ha comenzado!</p>
      </div>);
    } else {
      return (
        <div className={style.timer}>
          <h3>{days}</h3>
          <h3>
            <small> Dias</small>
          </h3>
          <span>:</span>
          <h3>{hours} </h3>
          <h3>
            <small> Horas</small>
          </h3>
          <span>:</span>
          <h3>{minutes}</h3>
          <h3>
            <small> Minutos</small>
          </h3>
          <span>:</span>
          <h3>{seconds}</h3>
          <h3>
            <small> Segundos</small>
          </h3>
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
    dispatch(putShow(decodShowId, newrelased));
    
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

  function porcentajefuncion(porcentajes) {
    var descuento = (show?.originPrice * porcentajes) / 100;
    var preciofinal = show?.originPrice - descuento;
    setPreciofinal(preciofinal);
  }

  let dateTimer = `${show?.date} ${show?.time}`;

  return (
    <div>
      <div className={style.inputContainer}>
        <label>Número de entradas</label>
        <input
          value={selected}
          disabled
          onChange={(e) => setSelected(e)}
        ></input>
      </div>
      <div className={style.inputContainer}>
        <label>Total</label>
        {/* <input disabled value={preciofinal * seatNumber.length}></input> */}
        <h3>${preciofinal * seatNumber.length}</h3>
      </div>
      <div>
        <button className="btn btn-dark" onClick={(e) => buttonMp(e)}>
          Confirmar pago
        </button>
        {link && 
          window.open(link, '_self')
        }
      </div>
      <br />

      <br />
      <div className={style.timerContainer}>
          <Countdown date={dateTimer} renderer={renderer} onTick={onStart} onComplete={handleComplete}>
          </Countdown>
        </div>
    </div>
  );
}