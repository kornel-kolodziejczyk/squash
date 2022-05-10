import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./ArticleCreate.module.css";

// Component
import Button from "../../_UI/Button/Button";
import Card from "../../_layout/Card/Card";
import Header from "../../_UI/Header/Header";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";

// Redux
import { ARTICLE_CREATE_RESET } from "../../../store/actionTypes/articleActionTypes";
import { articleCreateAction } from "../../../store/actions/articleActions";
import { useDispatch, useSelector } from "react-redux";

const ArticleCreate = (props) => {
  const dispatch = useDispatch();

  // Component State
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  // Redux State
  const articleCreate = useSelector((state) => state.articleCreate);

  // Handlers
  const createArticleHandler = (e) => {
    e.preventDefault();
    dispatch(articleCreateAction({ date, image, text, title }));
  };

  const redirectHandler = () => props.history.push("/");
  const resetArticleCreateHandler = useCallback(() => dispatch({ type: ARTICLE_CREATE_RESET }), [dispatch]);
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

  useEffect(() => {
    return resetArticleCreateHandler;
  }, [resetArticleCreateHandler]);

  return (
    <>
      <LoadingBox loading={articleCreate.loading} />
      <MessageBox message={articleCreate.error} title={"Dodawanie artykułu"} onClick={resetArticleCreateHandler} />
      <MessageBox message={articleCreate.data} title={"Dodawanie artykułu"} onClick={redirectHandler} />
      <Card>
        <div className={classes.articleCreate}>
          <Header>Dodawanie artykułu</Header>
          {image && <img className={classes.articleCreate__image} src={URL.createObjectURL(image)} alt="Zdjęcie artykułu"></img>}
          <form className={classes.articleCreate__form} onSubmit={createArticleHandler}>
            <input type="text" required placeholder="Tytuł artykułu" onChange={setTitleHandler} />
            <input type="date" required value={date} onChange={setDateHandler} />
            <input type="file" required accept=".jpg,.png,.jpeg" onChange={setImageHandler} />
            <textarea className={classes.articleCreate__textarea} required placeholder="Treść artykułu" onChange={setTextHandler} />
            <Button type="submit">Dodaj artykuł</Button>
          </form>
        </div>
      </Card>
    </>
  );
};

export default ArticleCreate;
