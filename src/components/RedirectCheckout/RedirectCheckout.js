import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketPay, showDetail, allShows, getAllViewers } from "../../redux/actions";
import NavBarPerfilViewer from "../NavBar/NavBarPerfilViewer";
import codigo from "../../assets/codigoQr.jpg";
import style from "./RedirectCheckout.module.css";

export default function RedirectCheckout() {
  const { id, idV, seatNumber } = useParams();
  const dispatch = useDispatch();
  const [decodId,setDecodId] = useState();
  const [decodIdV,setDecodIdV] = useState();
  const [price, ] = useState(JSON.parse(window.localStorage.getItem("price")));
  const queryParams = window.location.search;
  const statusQuery = new URLSearchParams(queryParams)
  const status = statusQuery.get('status')
  const decodIdN = Number(decodId)
  const decodIdVn = Number(decodIdV)

  useEffect(async () => {
    await setDecodId(atob(id));
    await setDecodIdV(atob(idV));
  }, [id,idV]);
  
  useEffect(() => {
    if(decodIdN > 0){
      dispatch(showDetail(decodIdN));
      dispatch(allShows());
      dispatch(getAllViewers())
      // dispatch(totalPrice())
    }
  }, [dispatch, decodId]);

    useEffect(()=>{
      if(decodIdN > 0 && decodIdVn > 0){
        dispatch(getTicketPay({ seatNumber, decodIdN, decodIdVn, status }));
      }
    })
    
  const viewers = useSelector((state) => state.viewers);
  const findViewer = viewers?.filter((v) => v.id === Number(decodId));
  const viewerName = findViewer?.map((v) => v?.name);
  // const show = useSelector((state) => state.showdetail);
  const shows = useSelector((state) => state.shows);
  const equalShow = shows?.filter((s) => s?.id === Number(decodIdV));
  const showName = equalShow?.map((s) => s?.name);
  const showTheater = equalShow?.map((s) => s?.theater.name);
  const showDate = equalShow?.map((s) => s?.date);
  const priceTicket = useSelector((state) => state.totalPrice);
  // console.log(priceTicket, 'priceTicket')
  var seats = seatNumber.split(",");

  function printing() {
    setTimeout(() => 10000);
    window.print();
  }
  
  var total = 0;
  if (priceTicket && seatNumber?.length > 0) {
      total = priceTicket * seats?.length;
    } else if(price && seats?.length > 0) {
      total = price * seats?.length;
    }
  
  return (
    <div>
      <div>
        <NavBarPerfilViewer />
        <h2 className={style.title}>
          Muchas gracias {viewerName} por comprar en A Sala Llena
        </h2>
        <div className={style.card}>
          <h2>Espectáculo: " {showName} "</h2>
          <h3>Teatro: {showTheater}</h3>
          <h3>Cantidad de entradas: {seats?.length}</h3>
          <h3>Número de asientos: {seatNumber}</h3>
          <h3>Fecha: {showDate}</h3>
          <h2>Total: $ {total}</h2>
          <div>
            <img className={style.codigoQr} src={codigo} alt="codigo" />
          </div>
        </div>
        <form>
          <div className={style.btnContainer}>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => printing()}
            >
              Imprimir o Descargar
            </button>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
}