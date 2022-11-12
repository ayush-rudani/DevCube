import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  CREATE_ERRORS,
  REMOVE_ERRORS,
  REDIRECT_TRUE,
  REDIRECT_FALSE,
  SET_MESSAGE,
  REMOVE_MESSAGE,
  SET_LOADER,
  CLOSE_LOADER,
} from "../store/types/PostTypes";

import { fetchPosts } from "../store/asyncMethods/PostMethods";
import { Link, useParams } from "react-router-dom";
import { BsPencilSquare, BsArchive } from "react-icons/bs";
import axios from "axios";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
// import moment from 'moment';

function Dashboard() {
  const dispatch = useDispatch();
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }

  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );
  const {
    user: { _id },
    token,
  } = useSelector((state) => state.AuthReducer);
  const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
  // console.log('Posts->', posts);

  const deletePost = async (id) => {
    const confirm = window.confirm("Are you really want to delete this post?");
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const {
          data: { message },
        } = await axios.delete(`/api/post/delete/${id}`, config);
        dispatch(fetchPosts(_id, page));
        dispatch({ type: SET_MESSAGE, payload: message });
      } catch (error) {
        dispatch({ type: CLOSE_LOADER });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message]);

  useEffect(() => {
    dispatch(fetchPosts(_id, page));
  }, [page]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
      </HelmetProvider>
      <Toaster toastOptions={{ style: { fontSize: "14px" } }} />
      <div className="container mt-100">
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-3 p-15">
            <Sidebar />
          </div>

          <div className="col-9 p-15">
            {/* {posts.length} */}
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="dashboard__posts" key={post._id}>
                    <div className="dashboard__posts__title">
                      <Link to={`/details/${post._id}`}>{post.title}</Link>
                    </div>
                    <div className="dashboard__posts__links">
                      <Link to="/">
                        <BsPencilSquare className="icon" />
                      </Link>
                      <BsArchive
                        onClick={() => deletePost(post._id)}
                        className="icon"
                      />
                    </div>
                  </div>
                ))
              ) : (
                "You dont have any post"
              )
            ) : (
              <Loader />
            )}

            <Pagination
              path="dashboard"
              page={page}
              perPage={perPage}
              count={count}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
