import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { BookmarkContext } from "./BookmarkContext.js";

function BookmarkProvider({ children }) {
  const [BookmarkLoadObject, setBookmarkLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBookmarkLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
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
  const value = {
    Bookmark: BookmarkLoadObject.data,
  };

  return (
    <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
  );
}

export default BookmarkProvider;