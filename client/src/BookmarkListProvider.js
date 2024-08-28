import {  useEffect, useState } from "react";
import { BookmarkListContext } from "./BookmarkListContext.js";

function BookmarkListProvider({ children }) {
  const [BookmarkLoadObject, setBookmarkLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBookmarkLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setBookmarkLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setBookmarkLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setBookmarkLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });

    const responseJson = await response.json();

    if (response.status < 400) {
      setBookmarkLoadObject((current) => {
        const newData = [...current.data, responseJson];
        return { state: "ready", data: newData };
      });
      return responseJson;
    } else {
      setBookmarkLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setBookmarkLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBookmarkLoadObject((current) => {
        const BookmarkIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[BookmarkIndex] = responseJson;
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBookmarkLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setBookmarkLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBookmarkLoadObject((current) => {
        const updatedData = current.data.filter((e) => e.id !== dtoIn.id);
        return { state: "ready", data: updatedData };
      });

      return responseJson;
    } else {
      setBookmarkLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: BookmarkLoadObject.state,
    BookmarkList: BookmarkLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <BookmarkListContext.Provider value={value}>
      {children}
    </BookmarkListContext.Provider>
  );
}

export default BookmarkListProvider;