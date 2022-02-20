import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { showDetail } from "../../redux/actions";
import NavBarPerfilViewer from "../NavBar/NavBarPerfilViewer";
import codigo from "../../assets/codigoQr.jpg";

export default function RedirectCheckout() {
    const {id, idV, seatNumber} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showDetail(id))
    }, [dispatch,id])
    const viewers = useSelector((state) => state.viewers);
    const findViewer = viewers?.find((v) => v.id === idV);
    const showdetail = useSelector((state) => state.showdetail);
    const tickets = showdetail?.tickets
    // console.log(tickets)
    const price = tickets?.map((t) => t.price)
    // console.log(price)
    var equalShowId = tickets?.filter((t) => t?.showId === Number(id))
    console.log(equalShowId) // me trae solo los tickets de los asientos disponibles
    // console.log(seatNumber)//quedo como un string con los asientos separados por ,
    var seats = seatNumber.split(',');
    console.log(seats);
    if(price?.length > 0){
      for(var i = 0; i < 1; i++) {
        var total = price[i] * seats?.length
      }
    }
    console.log(total)
    function printing() {
        setTimeout(() => 10000)
        window.print();
    }

    return (
        <div>
            <div>
                <NavBarPerfilViewer />
                <h2>Muchas gracias {findViewer?.name} por comprar en A Sala Llena</h2>
                <div>
                    <h3>Espectáculo: " {showdetail?.name} "</h3>
                    <h3>Teatro: {showdetail?.theater?.name}</h3>
                    <h3>Cantidad de entradas: {seats?.length}</h3>
                    <h3>Número de asientos: {seatNumber}</h3>
                    <h3>Fecha: {showdetail?.date}</h3>
                    <h3>Total: $ {total}</h3>
                </div>
                <div>
                    <img src={codigo} alt="cogido" />
                </div>
                <Link to={`/viewerHome/${idV}`}>
                    <button type="button" className="btn btn-primary">Volver</button>
                </Link>
                {/* <div>
                    <Link to={codigo} target='_blank' download>Download</Link>
                </div> */}
                <form>
                        <button type="button" className="btn btn-primary" onClick={() => printing()}>Imprimir o Descargar</button>
                </form>
            </div>
        </div>
    )
}