import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./ArticleUpdate.module.css";

import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { ARTICLE_DETAILS_RESET, ARTICLE_UPDATE_RESET } from "../../../store/actionTypes/articleActionTypes";
import { articleDetailsAction, articleUpdateAction } from "../../../store/actions/articleActions";
import { useDispatch, useSelector } from "react-redux";

// Components

const ArticleUpdate = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  // Component State
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  // Redux State
  const articleDetails = useSelector((state) => state.articleDetails);
  const articleUpdate = useSelector((state) => state.articleUpdate);

  // Handlers
  const redirectHandler = () => {
    props.history.push({ pathname: `/`, state: props.location.state });
    resetArticleUpdateHandler();
  };

  const resetArticleDetailsHandler = useCallback(() => dispatch({ type: ARTICLE_DETAILS_RESET }), [dispatch]);
  const resetArticleUpdateHandler = () => dispatch({ type: ARTICLE_UPDATE_RESET });
  const setDateHandler = (e) => setDate(e.target.value);

  const setImageHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const setTextHandler = (e) => setText(e.target.value);
  const setTitleHandler = (e) => setTitle(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(articleUpdateAction({ id, title, text, date, image }));
  };

  useEffect(() => {
    dispatch(articleDetailsAction(id));
    return resetArticleDetailsHandler;
  }, [dispatch, id, resetArticleDetailsHandler]);

  useEffect(() => {
    if (articleDetails.data) {
      setDate(articleDetails.data.date.substring(0, 10));
      setText(articleDetails.data.text);
      setTitle(articleDetails.data.title);
    }
  }, [articleDetails]);

  return (
    <>
      <LoadingBox loading={articleDetails.loading || articleUpdate.loading} />
      <MessageBox message={articleDetails.error} title={"Wczytywanie artykułu"} onClick={resetArticleDetailsHandler} />
      <MessageBox message={articleUpdate.error} title={"Aktualizowanie artykułu"} onClick={resetArticleUpdateHandler} />
      <MessageBox message={articleUpdate.data} title={"Aktualizowanie artykułu"} onClick={redirectHandler} />
      {articleDetails.data && (
        <Card>
          <div className={classes.articleUpdate}>
            <img className={classes.articleUpdate__image} src={image ? URL.createObjectURL(image) : `/${articleDetails.data.image}`} alt="Zdjęcie artykułu"></img>
            <form className={classes.articleUpdate__form} onSubmit={submitHandler}>
              <input type="text" value={title} required placeholder="Tytuł artykułu" onChange={setTitleHandler} />
              <input type="date" value={date} required onChange={setDateHandler} />
              <input type="file" accept=".jpg,.png,.jpeg" onChange={setImageHandler} />
              <textarea className={classes.articleUpdate__text} required value={text} placeholder="Treść artykułu" onChange={setTextHandler} />
              <Button type="submit">Zapisz zmiany</Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default ArticleUpdate;
