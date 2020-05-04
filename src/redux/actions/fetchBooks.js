import {
  FETCH_BOOKS_SUCCEEDED,
  FETCH_BOOKS_FAILED,
  RESET_BOOKS,
  FETCH_BOOK_DETAIL_SUCCEEDED,
  FETCH_BOOK_DETAIL_FAILED,
  RESET_BOOK_DETAIL,
} from "./types";
import Axios from "../../utils/axios";

// fetching & searching for books
export const fetchBooks = (search = "") => async (dispatch) => {
  if (!search) {
    // fetching latest books
    try {
      const response = await Axios.get("/new");
      const books = await response.data.books;
      dispatch({
        type: FETCH_BOOKS_SUCCEEDED,
        payload: books,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BOOKS_FAILED,
      });
    }
  } else {
    // searching for books
    try {
      let url = `/search/${search}`;
      let bookResult = [];
      for (let page = 1; page <= 5; page++) {
        const response = await Axios.get(`${url}/${page}`);
        const books = await response.data.books;
        bookResult.push(...books);
      }
      dispatch({
        type: FETCH_BOOKS_SUCCEEDED,
        payload: bookResult,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BOOKS_FAILED,
      });
    }
  }
};

export const resetBooks = () => (dispatch) => {
  dispatch({
    type: RESET_BOOKS,
  });
};

// fetching a specific book details (title, description, Isbn13...)
export const fetchBookDetail = (bookIsbn13) => async (dispatch) => {
  try {
    const response = await Axios.get(`/books/${bookIsbn13}`);
    const book = await response.data;
    dispatch({
      type: FETCH_BOOK_DETAIL_SUCCEEDED,
      payload: book,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOOK_DETAIL_FAILED,
    });
  }
};

// reset book detail for next fetching
export const resetBookDetail = () => (dispatch) => {
  dispatch({
    type: RESET_BOOK_DETAIL,
  });
};