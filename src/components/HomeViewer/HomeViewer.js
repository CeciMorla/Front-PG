import React, { useEffect, useState } from "react";
import { allShows } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import Shows from "../Shows/Shows.js";
import NavBarViewer from "../NavBar/NavBarViewer.js";
import Paginate from "../Paginate/Paginate.js";
import style from "./HomeViewer.module.css";
import CarouselContainer from "../Carrousel/Carrousel.js";
import { useParams } from "react-router-dom";
import { getViewerDetail } from "../../redux/actions/index.js";

const HomeViewer = () => {
  const dispatch = useDispatch();
  // const show = useSelector((state) => state.shows);
  const allshows = useSelector((state) => state.shows);
  const [, setOrder] = useState("");
  const [actualPage, setActualPage] = useState(1);
  const [qty] = useState(8);
  const iLastShow = actualPage * qty; //8
  const iFirstShow = iLastShow - qty;
  const filterShow = allshows?.filter(e => e.released === false);
  const actualShow = filterShow?.slice(iFirstShow, iLastShow);
  const detail = useSelector((state) => state.viewerDetail);
  const { id } = useParams();
  const paginate = (number) => {
    setActualPage(number);
  };
  const [decod, setDecod] = useState("");

  useEffect(async () => {
    await setDecod(atob(id));
  }, [id]);

  useEffect(() => {
    dispatch(getViewerDetail(decod));
    dispatch(allShows());
  }, [dispatch, decod]);

  const shows = filterShow?.filter(
    (e) => e.theater?.province === detail?.province
  );
  // console.log(shows);

  return (
    <div className={style.homeContainer}>
      <div className={style.navContainer}>
        <NavBarViewer
          setActualPage={setActualPage}
          setOrder={setOrder}
          img={detail?.image}
          name={detail?.name}
        />
      </div>
      <div className={style.carouselContainer}>
        {shows?.length > 0 ? (
          <CarouselContainer allshows={shows} />
        ) : (
          <CarouselContainer allshows={filterShow} />
        )}
      </div>
      <div className={style.showsContainer}>
        {actualShow?.length ? (
          <Shows actualShow={actualShow} idV={decod} />
        ) : (
          <p>...</p>
        )}
      </div>
      <div className={style.paginate}>
        <Paginate qty={qty} allshows={filterShow?.length} paginate={paginate} />
      </div>
    </div>
  );
};

export default HomeViewer;
