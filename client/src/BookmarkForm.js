import { useContext, useState } from "react";
import { BookmarkListContext } from "./BookmarkListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

   function BookmarkForm({ setShowBookmarkForm, Bookmark }) {
  const { state, handlerMap } = useContext(BookmarkListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

 return (
     <Modal show={true} onHide={() => setShowBookmarkForm(false)}>
      <Form
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          try {
            if (Bookmark.id) {
              formData.id = Bookmark.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }
            setShowBookmarkForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >

          <Modal.Header>
            <Modal.Title>
              {`${Bookmark.id ? "Upravit" : "Vytvořit"} Záložku`}
              </Modal.Title>
            <CloseButton onClick={() => setShowBookmarkForm(false)} />
          </Modal.Header>
          <Modal.Body style={{ display: "circle" , position: "initial" }}>
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Název záložky </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  defaultValue={Bookmark.name}
                />
                <Form.Label>Data</Form.Label>
                <Form.Control
                    type="text"
                    name="data"
                    pattern="^\d+(,\d+)*$"
                    title="Zadejte čísla oddělená čárkami, např. 1,20,120"
                    required
                    defaultValue={Bookmark.data}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowBookmarkForm(false)}
                disabled={isPending}
              >
                Zavřít
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                {Bookmark.id ? "Upravit" : "Vytvořit"}
              </Button>
            </Modal.Footer>
      </Form>
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

export default BookmarkForm; 