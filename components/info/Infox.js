import React from "react";
import css from "./info.module.scss";
import { data_info } from "../data";

const Infox = () => {
  return (
    <div className={css.info}>
        <div className={css["info__title"]}>
      <h1 className={css.h1}>Instant Liscence</h1>
      <h3 className={css.h3}>
        Purchase Legit and Genuine License Keys for Windows and Mac Instantly.
      </h3>

        </div>
      <div className={css["info__product"]}>
        {data_info.map(info => (
          <div className={css["info__product__item"]} key={info.id}>
            <div className={css["info__product__item-icon"]}>
                {info.icon}
            </div>
            <div className={css["info__product__item-title"]}>
                {info.name}
            </div>
            <div className={css["info__product__item-desc"]}>
                {info.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Infox;
