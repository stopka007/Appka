import { useContext, useState } from "react";
import { BookmarkListContext } from "./BookmarkListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function ConfirmDeleteDialog({ setShowConfirmDeleteDialog, Bookmark }) {
  const { state, handlerMap } = useContext(BookmarkListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowConfirmDeleteDialog(false)}>
      <Modal.Header>
        <Modal.Title>Smazat záložku</Modal.Title>
        <CloseButton onClick={() => setShowConfirmDeleteDialog(false)} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Nepodařilo se vytvořit záložku</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>
        {isPending ? (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        ) : null}
        Opravdu chcete smazat záložku {Bookmark.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowConfirmDeleteDialog(false)}
          disabled={isPending}
        >
          Zavřít
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isPending}
          onClick={async (e) => {
            try {
              await handlerMap.handleDelete({ id: Bookmark.id });
              setShowConfirmDeleteDialog(false);
            } catch (e) {
              console.error(e);
              setShowAlert(e.message);
            }
          }}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default ConfirmDeleteDialog;