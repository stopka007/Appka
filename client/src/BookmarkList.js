import { useContext, useState } from "react";
import { BookmarkListContext } from "./BookmarkListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import BookmarkCard from "./BookmarkCard";
import BookmarkForm from "./BookmarkForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusCircle} from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function BookmarkList() {
  const { BookmarkList } = useContext(BookmarkListContext);
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px"}}>
        <Button variant="success" onClick={() => setShowBookmarkForm({})}
          style={{ backgroundColor: "White" }}>
          <Icon path={mdiPlusCircle} size={1} color={"black"} /> 
          <span style={{ marginLeft: '10px', color: "black" }}>Nová Záložka</span>
        </Button>
      </div>
      {!!showBookmarkForm ? (
        <BookmarkForm Bookmark={showBookmarkForm} setShowBookmarkForm={setShowBookmarkForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          Bookmark={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {BookmarkList.map((Bookmark) => {
        return (
          <BookmarkCard
            key={Bookmark.id}
            Bookmark={Bookmark}
            setShowBookmarkForm={setShowBookmarkForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default BookmarkList;