import React from "react";
import { checkoutPay } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";

export default function Checkout({price, id, idV, selected, setSelected, idShow}) {
    const show = useSelector((state) => state.showdetail);
    console.log(show)
    const showId = id;
    const idViewer = idV;
    const seatNumber = selected; //array de asientos elegidos
    console.log(seatNumber)
    const link = useSelector((state) => state.link);
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.tickets)
    console.log(tickets)
    // var ticketsPrice = tickets?.map((t) => t.seatNumber)
    // console.log(ticketsPrice)
    var equalShowId = tickets?.filter((t) => t?.showId === Number(showId))
    console.log(equalShowId) // me trae solo los tickets de los asientos disponibles
    //var total = equalShowId?.price * seatNumber?.length;
    console.log('equalShowId',equalShowId)
    var total = 0;
    if(seatNumber.length > 0){
      for(var i = 0; i < 1; i++) {
        total = equalShowId[i]?.price * seatNumber?.length
      }
    }
    
    

    function buttonMp () {
        dispatch(checkoutPay({seatNumber, showId, idViewer}))
    }

    return (
        <div>
           
            <div>
              <label>Numero de entradas:</label>
              <input value={selected} disabled onChange={(e) => setSelected(e)}></input>
            </div>
            <div>
              <label>Total:</label>
              <input disabled value={total}></input>
            </div>
            <div>
           <button variant="dark" onClick={(e) => buttonMp(e)}>
                Confirmar pago
              </button>
              {
                    link && window.open(link)
              }
            </div> 
    </div>
  )


}

// export default function Checkout({precio}) {
//     const show = useSelector((state) => state.showdetail);
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const COOKIES_POLICY = "http://localhost:3000"

//     useEffect(() => {
//         dispatch(checkoutPay(id));
//     }, [dispatch]);

//     // function checkoutOnClick () {
//     //     document.location.href = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${keyMP}`
//     // }

//     return (
//         <div>
//             <Link to="/">
//                 <img src={logo} className={style.logo} alt="A sala llena" />
//             </Link>
//             <h1>{show.name}</h1>
//             <div>
//             <h3>Fecha: </h3>
//             <h4>{show.date} </h4>
//             <h3>Precio</h3>
//             <h3>Cantidad de entradas</h3>
//             <h3>Total:</h3>
//             </div>
//             {show.tickets?.map(t => {
//                 return (
//                     <div>
//                         <div class="#button-checkout" id="button-checkout" cookiePolicy={COOKIES_POLICY}></div>

//                     </div>
//                 )
//             })}
//         </div>
//     )

// }