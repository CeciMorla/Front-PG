import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allTheaters,
  // allShows,
  filterPerGenre,
  filterPerProvince,
  filterPerTheater,
  filterPerRated,
  // filterPerTicketsQty,
} from "../../redux/actions";
import style from "./Filters.module.css";
import Form from "react-bootstrap/Form";

export default function Filters({ setActualPage, setOrder }) {
  const dispatch = useDispatch();
  const theaters = useSelector((state) => state.theaters);

  useEffect(() => {
    dispatch(allTheaters());
    // dispatch(allShows());
  }, [dispatch]);

  function handleFilterProvince(prov) {
    prov.preventDefault();
    dispatch(filterPerProvince(prov.target.value));
    setActualPage(1);
    setOrder(`Filter by ${prov.target.value}`);
  }

  function handleFilterTheater(e) {
    e.preventDefault();
    dispatch(filterPerTheater(e.target.value));
    setActualPage(1);
    setOrder(e.target.value);
  }
  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterPerGenre(e.target.value));
    setActualPage(1);
    setOrder(e.target.value);
  }
  function handleFilterRated(e) {
    e.preventDefault();
    dispatch(filterPerRated(e.target.value));
    setActualPage(1);
    setOrder(e.target.value);
  }
  // function handleFilterTicketsQty(e) {
  //   e.preventDefault();
  //   dispatch(filterPerTicketsQty(e.target.value));
  // }

  return (
    <div className={style.navContainer}>
      <div>
        <Form.Select
          size="lg"
          onChange={(prov) => handleFilterProvince(prov)}
          name="province"
        >
          <option defaultValue="" hidden>
            Ubicación
          </option>
          <option value="all">Todas</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Cordoba">Cordoba</option>
          <option value="Santa Fe">Santa Fe</option>
          <option value="Catamarca">Catamarca</option>
          <option value="Chaco">Chaco</option>
          <option value="Chubut">Chubut</option>
          <option value="Corrientes">Corrientes</option>
          <option value="Entre Rios">Entre Rios</option>
          <option value="Formosa">Formosa</option>
          <option value="Jujuy">Jujuy</option>
          <option value="La Pampa">La Pampa</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Mendoza">Mendoza</option>
          <option value="Misiones">Misiones</option>
          <option value="Neuquen">Neuquen</option>
          <option value="Rio Negro">Rio Negro</option>
          <option value="Salta">Salta</option>
          <option value="San Juan">San Juan</option>
          <option value="San Luis">San Luis</option>
          <option value="Santa Cruz">Santa Cruz</option>
          <option value="Santiago del Estero">Santiago del Estero</option>
          <option value="Tierra del Fuego">Tierra del Fuego</option>
          <option value="Tucuman">Tucuman</option>
          <option value="CABA">CABA</option>
        </Form.Select>
      </div>
      <br />
      {/* // ------------- filtro por Teatro---------- */}
      <div>
        <Form.Select
          size="lg"
          onChange={(e) => handleFilterTheater(e)}
          name="name"
        >
          <option defaultValue="" hidden>
            Teatro
          </option>
          <option value="all">Todos</option>
          {theaters?.map((theater) => (
            <option value={theater.name} key={theater.id}>
              {theater.name}
            </option>
          ))}
        </Form.Select>
      </div>
      <br />
      {/* // ------------- filtro por Genero---------- */}
      <div>
        <Form.Select
          size="lg"
          onChange={(e) => handleFilterGenre(e)}
          name="genre"
        >
          <option defaultValue="" hidden>
            Género
          </option>
          <option value="all">Todos</option>
          <option>Comedia</option>
          <option>Drama</option>
          <option>Tragedia</option>
          <option>Tragicomedia</option>
          <option>Monologo</option>
          <option>Ópera</option>
          <option>Musical</option>
          <option>Danza</option>
        </Form.Select>
      </div>
      <br />
      {/* // ------------- filtro por Clasificacion---------- */}
      <div>
        <Form.Select
          size="lg"
          onChange={(e) => handleFilterRated(e)}
          name="rated"
        >
          <option defaultValue="" hidden>
            Clasificación
          </option>
          <option value="all">Todas</option>
          <option value="Todas las edades">Apta para todo público</option>
          <option value="Apta para mayores de 13 años">
            Apta para mayores de 13 años
          </option>
          <option value="Apta para mayores de 16 años">
            Apta para mayores de 16 años
          </option>
          <option value="Apta para mayores de 18 años">
            Apta para mayores de 18 años
          </option>
          <option value="Exhibición condicionada.">
            Exhibición condicionada.
          </option>
        </Form.Select>
      </div>
      {/* // ------------- filtro por Cantidad de entradas----------
      <div className={style.puntuacion}>
        <input
          type="number"
          placeholder="Entradas requeridas"
          min="1"
          max="20"
          onChange={(e) => handleFilterTicketsQty(e)}
        />
      </div> */}
    </div>
  );
}
