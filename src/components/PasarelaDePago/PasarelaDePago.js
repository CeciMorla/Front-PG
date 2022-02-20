import React, {useState, useEffect}from 'react'
import Seat from '../Seats/Seats'
import { useDispatch, useSelector} from 'react-redux'
import { showDetail, getAllTickets } from "../../redux/actions/index.js";
import { useParams, Link } from "react-router-dom";
import logo from "../../assets/logo a sala llena-sinfondo.png";
import style from "./PasarelaDePago.module.css";



const PasarelaDePago =  ({props}) => {
    const [seatNumber, setSeatNumber] = useState(0)
    const show = useSelector((state) => state.showdetail.tickets);
    console.log(show)
    // const jaja = show[0]
    // console.log(jaja)
    const hola = show?.map((t) => t.price)
    console.log(hola)
   
    const dispatch = useDispatch();
    const {id, idV} = useParams()
    //const [tickets , setTickets]= useState()
    //let variable = false;
    const onChange = ({target: {name, value}}) => {
    setSeatNumber(value)
    }
    const [decodShowId,setDecodShowId] = useState('');
    const [decodViewerId,setDecodViewerId] = useState('');

    useEffect(async ()=>{
      await setDecodShowId(atob(id))
      await setDecodViewerId(atob(idV))
    },[id,idV])

  useEffect(() => {
    dispatch(getAllTickets())
  },[dispatch])
  useEffect(()=>{
    dispatch(showDetail(decodShowId))
  },[dispatch,decodShowId])
  // console.log(tickets, "Tickets")
  return (
    <div>
      <Link to="/">
          <img src={logo} className={style.logo} alt="A sala llena" />
      </Link>
        <h3>Pasarela se Pago</h3>   
        <label>Selecciona # de entradas</label>    
        <input name='seatnumber' min={0} max={show?show.length:80} type={'number'} onChange={(e)=>{onChange(e)}}></input>
        <div className={style.seat}>
        <Seat seatsNumber={seatNumber} show={show} id={decodShowId} idV={decodViewerId}/>
        </div>
        
    </div>
  )
}

export default PasarelaDePago