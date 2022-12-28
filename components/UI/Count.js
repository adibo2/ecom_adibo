import React from 'react'
import css from "./Count.module.scss";

const Count = (props) => {
  return (
    <>
    <div className={css.titre}>
        <div className={css.flex}>
        <div className={css.titre_2}>Search: {props.search}</div>
        <div className={css.titre_3}>showing {props.taille} products</div>

      </div>

        <hr className={css.hro}></hr>
        </div>
    
    </>
  )
}

export default Count