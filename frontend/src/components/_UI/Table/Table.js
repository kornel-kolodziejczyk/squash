import React from "react";

// Classes
import classes from "./Table.module.css";

const Table = (props) => (
  <div className={classes.table}>
    <div className={classes.table__header} style={props.styles}>
      {props.header.map((headerItem, index) => (
        <div key={index} className={[classes.table__cell, classes["table__cell--header"]].join(" ")}>
          <span className={classes.table__item}>{headerItem}</span>
        </div>
      ))}
    </div>
    {props.body && (
      <div className={classes.table__body}>
        {props.body.map((bodyRow, rowIndex) => (
          <div key={rowIndex} className={classes.table__row} style={props.styles}>
            {bodyRow.map((rowItem, itemIndex) => (
              <div key={itemIndex} className={[classes.table__cell, ...(rowIndex % 2 ? [classes["table__cell--dark"]] : [])].join(" ")}>
                <span className={classes.table__item}>{rowItem}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Table;
