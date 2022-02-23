import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  allShows,
  getViewerDetail,
  getAllTickets,
  allTheaters,
} from "../../redux/actions/index.js";
import NavBarPerfilViewer from "../NavBar/NavBarPerfilViewer.js";
import Review from "../ReviewV/ReviewV.js";
import style from "./ViewerHistory.module.css";
import { Button, Card } from "react-bootstrap";

const ViewerHistory = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.shows);
  const viewer = useSelector((state) => state.viewerDetail);
  const ticket = useSelector((state) => state.tickets);
  const theater = useSelector((state) => state.theaters);
  const [button, setButton] = useState(true);
  const { id } = useParams();
  
  let img = window.sessionStorage.getItem('img').valueOf();
  

  useEffect(() => {
    dispatch(allShows());
    dispatch(getViewerDetail(id));
    dispatch(getAllTickets());
    dispatch(allTheaters());
  }, [dispatch, id]);

  function onClick(e) {
    e.preventDefault();
    setButton(false);
  }

  let filterTickets = ticket?.filter(e => e.viewerId === viewer?.id)
  let filterTicketsShow = filterTickets?.filter(e => e.showId === Number(idShow))
  let filterTheaterId = filterTicketsShow?.map(e => e.show?.theaterId)
  let filterTheater = theater?.find(e => e.id === filterTheaterId[0])

  console.log('filterTicketsShow',filterTicketsShow)

  return (
    <div>
      <div className={style.navContainer}>
        <NavBarPerfilViewer img={img} name={viewer?.name} />
      </div>
      <h2>Opiniones</h2>

      <div className={style.container}>
        {filterShow?.length && filterTicket?.length ? (
          filterShow?.map((e) => {
            return (
              <div key={e.id}>
                <div className={style.card}>
                  <Card border="dark" style={{ width: "18rem" }}>
                    <Card.Header>{filterTheater?.name}</Card.Header>
                    <Card.Body>
                      <Card.Title>{e.name}</Card.Title>
                      <Card.Text>
                        <p>
                          Función: {e.date} {e.time}
                        </p>
                        <h5>Cantidad: {filterTicket?.length}</h5>
                        <h5>
                          Total: $
                          {total?.reduce(function (a, b) {
                            return a + b;
                          })}
                        </h5>
                      </Card.Text>
                      <Link to={`/ticket/${id}/${e.id}`}>
                      <Button variant="dark">
                        Descargar Ticket
                      </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
                <Button variant="dark" onClick={onClick}>
                  Agrega tu opinión
                </Button>
                <div>
                  {!button ? (
                    <Review
                      nameTheater={filterTheater?.name}
                      nameShow={e.name}
                      nameViewer={viewer.name}
                      status={status}
                    />
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <div>
          {/*<img src='https://media.giphy.com/media/q15kbCtGFqwx8wYx1n/giphy.gif' alt='img'/>*/}
          <p>NO HAY SHOWS PARA MOSTRAR</p>
          </div>
        )}
      </div>
      <br />
    </div>
  );
};

export default ViewerHistory;
