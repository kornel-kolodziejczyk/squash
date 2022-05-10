import React from "react";
import classes from "./Article.module.css";
import { customizeDate } from "../../../utils";

const Article = (props) => {
  return (
    <div className={classes.article}>
      <img className={classes.article__image} src={`/${props.article.image}`} alt="Zdjęcie artykułu" />
      <div className={classes.article__title}>{props.article.title}</div>
      <div className={classes.article__date}>{customizeDate(new Date(props.article.date))}</div>
      <div className={classes.article__text} dangerouslySetInnerHTML={{ __html: props.article.text }}></div>
    </div>
  );
};

export default Article;
