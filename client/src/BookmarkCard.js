import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import BookmarkDetail from "./BookmarkDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function BookmarkCard({ Bookmark, setShowBookmarkForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <BookmarkDetail Bookmark={Bookmark} />
      <div
        style={{
          display: "grid",
          gap: "4px",
          justifyContent: "right",
          alignItems: "right",
        }}
      >
        <Button
          onClick={() => navigate("/BookmarkDetail2?id=" + Bookmark.id)}
          size={"sm"}
        >
          <span style={{ marginRight: '10px' }}>Výsledky</span>
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button onClick={() => setShowBookmarkForm(Bookmark)} size={"sm"}>
          <span style={{ marginRight: '10px' }}>Upravit</span>
          <Icon path={mdiPencil} size={0.7} />
          
        </Button>
        <Button
          onClick={() => setShowConfirmDeleteDialog(Bookmark)}
          size={"sm"}
          variant="danger"
        >
          <span style={{ marginRight: '10px' }}>Smazat</span>
          <Icon path={mdiTrashCanOutline} size={0.7} />
        </Button>
      </div>
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

export default BookmarkCard;