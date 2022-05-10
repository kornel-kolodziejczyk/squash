import React, { useCallback, useEffect, useState } from "react";

// Classes
import classes from "./ArticleList.module.css";

// Redux
import { ARTICLE_DELETE_RESET, ARTICLE_LIST_RESET } from "../../../store/actionTypes/articleActionTypes";
import { articleDeleteAction, articleListAction } from "../../../store/actions/articleActions";
import { useDispatch, useSelector } from "react-redux";

// Components
import Article from "../../_UI/Article/Article";
import Button from "../../_UI/Button/Button";
import ConfirmBox from "../../_UI/ConfirmBox/ConfirmBox";
import LoadingBox from "../../_UI/LoadingBox/LoadingBox";
import MessageBox from "../../_UI/MessageBox/MessageBox";
import Pagination from "../../_UI/Pagination/Pagination";

const ArticleList = (props) => {
  const dispatch = useDispatch();

  // Component State
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [page, setPage] = useState(props.location.state || 0);

  // Redux State
  const articleDelete = useSelector((state) => state.articleDelete);
  const articleList = useSelector((state) => state.articleList);
  const userInfo = useSelector((state) => state.signin.data);

  // Handlers
  const deleteArticleHandler = () => setConfirmMessage(`Jesteś pewny, że chcesz usunąć artykuł ${articleList.data.article.title}?`);
  const deleteCancelHandler = () => setConfirmMessage(false);

  const deleteConfirmHandler = () => {
    setConfirmMessage(false);
    dispatch(articleDeleteAction(articleList.data.article._id));
  };

  const editArticleHandler = () => props.history.push({ pathname: `/articles/${articleList.data.article._id}/update`, state: page });

  const redirectHandler = () => {
    resetArticleDeleteHandler();
    props.history.push("/");
  };

  const resetArticleListHandler = useCallback(() => dispatch({ type: ARTICLE_LIST_RESET }), [dispatch]);
  const resetArticleDeleteHandler = () => dispatch({ type: ARTICLE_DELETE_RESET });
  const setPageHandler = (page) => setPage(page);

  useEffect(() => {
    dispatch(articleListAction(page));
    return resetArticleListHandler;
  }, [dispatch, resetArticleListHandler, page]);

  return (
    <>
      <LoadingBox loading={articleList.loading || articleDelete.loading} />
      <MessageBox message={articleList.error} title={"Wczytywanie artykułów"} onClick={resetArticleListHandler} />
      <MessageBox message={articleDelete.error} title={"Usuwanie artykułu"} onClick={resetArticleDeleteHandler} />
      <MessageBox message={articleDelete.data} title={"Usuwanie artykułu"} onClick={redirectHandler} />
      <ConfirmBox message={confirmMessage} title={"Usuwanie artykułu"} onCancel={deleteCancelHandler} onConfirm={deleteConfirmHandler} />

      {articleList.data && (
        <div className={classes.articleList}>
          {articleList.data.article ? (
            <>
              <Article article={articleList.data.article} />
              {userInfo?.isAdmin && (
                <div className={classes.articleList__actions}>
                  <Button onClick={editArticleHandler}>Edytuj</Button>
                  <Button onClick={deleteArticleHandler}>Usuń</Button>
                </div>
              )}
              <Pagination onClick={setPageHandler} page={articleList.data.page} pages={articleList.data.pages} />
            </>
          ) : (
            <div>{articleList.data}</div>
          )}
        </div>
      )}
    </>
  );
};

export default ArticleList;
