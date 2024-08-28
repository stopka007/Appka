import { useContext } from "react";
import { BookmarkContext } from "./BookmarkContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import BookmarkDetail2 from "./BookmarkDetail2";

import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

function BookmarkRoute({ setShowBookmarkForm }) {
  const { Bookmark } = useContext(BookmarkContext);
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {Bookmark ? (
        <>
          <BookmarkDetail2 Bookmark={Bookmark} />
          <div
            style={{
              display: "grid",
              gap: "4px",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
                onClick={() => navigate(-1)} // Vrátí se zpět na předchozí stránku
                size={"sm"}
            >
              <span style={{ marginRight: '10px' }}>Zpět</span>
              <Icon path={mdiArrowLeft} size={0.7} />
            </Button>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default BookmarkRoute;