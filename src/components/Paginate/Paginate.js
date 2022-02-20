import React from "react";
import style from "./Paginate.module.css";
import Button from "react-bootstrap/Button";

export default function Paginate({ qty, allshows, paginate }) {
  const page = [];
  for (var i = 1; i <= Math.ceil(allshows / qty); i++) {
    page.push(i);
  }
  return (
    <div>
      <ul className={style.number}>
        {page &&
          page.map((number) => (
            <li key={number}>
              <Button
                variant="outline-dark"
                onClick={() => paginate(number)}
                key={number + 1}
                className={style.btn}
              >
                {number}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}

//este return lo probe con las flechitas y Previos y Next en lugar de los numeros
//     return (
//         <div>

//             <div>
//                 <button onClick={previusPage} className={styles.btn}>
//                     &laquo; Previous
//                 </button>
//                 <button onClick={nextPage} className={styles.btn}>
//                     Next &raquo;
//                 </button>
//             </div>

//         </div>
//     );
