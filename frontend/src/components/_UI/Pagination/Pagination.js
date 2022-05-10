import React from "react";

// Classes
import classes from "./Pagination.module.css";

// Icons
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = (props) => {
  return (
    <div className={classes.pagination}>
      <div className={classes.pagination__actions}>
        <div className={[classes.pagination__item, props.page === 1 ? classes["pagination__item--disabled"] : null].join(" ")} onClick={() => props.onClick(1)}>
          <FaAngleDoubleLeft />
        </div>
        <div
          className={[classes.pagination__item, props.page === 1 ? classes["pagination__item--disabled"] : null].join(" ")}
          onClick={() => props.onClick(props.page - 1 > 1 ? props.page - 1 : 1)}
        >
          <FaAngleLeft />
        </div>
      </div>
      {props.page > 1 && (
        <div className={classes.pagination__item} onClick={() => props.onClick(props.page - 1)}>
          {props.page - 1}
        </div>
      )}
      <div className={[classes.pagination__item, classes["pagination__item--active"]].join(" ")} onClick={() => props.onClick(props.page)}>
        {props.page}
      </div>
      {props.page < props.pages && (
        <div className={classes.pagination__item} onClick={() => props.onClick(props.page + 1)}>
          {props.page + 1}
        </div>
      )}
      <div className={classes.pagination__item}>...</div>
      <div className={classes.pagination__item} onClick={() => props.onClick(props.pages)}>
        {props.pages}
      </div>
      <div className={classes.pagination__actions}>
        <div
          className={[classes.pagination__item, props.page === props.pages ? classes["pagination__item--disabled"] : null].join(" ")}
          onClick={() => props.onClick(props.page + 1 <= props.pages ? props.page + 1 : props.pages)}
        >
          <FaAngleRight />
        </div>
        <div className={[classes.pagination__item, props.page === props.pages ? classes["pagination__item--disabled"] : null].join(" ")} onClick={() => props.onClick(props.pages)}>
          <FaAngleDoubleRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
