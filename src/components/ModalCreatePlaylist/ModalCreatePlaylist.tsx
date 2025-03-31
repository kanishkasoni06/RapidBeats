import { Form, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { ApiContext } from "../../utils/ApiContext";

interface ModelProp {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const ModalCreatePlaylist: React.FC<ModelProp> = ({
  showModal,
  setShowModal,
}) => {
  const [playlistName, setPlaylistName] = useState("");
  const { addPlaylist } = useContext(ApiContext);

  const handleCreatePlaylist = () => {
    if (playlistName.trim() !== "") {
      addPlaylist(playlistName);
      setPlaylistName("");
    }
    handleClose();
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Modal
      centered
      show={showModal}
      onHide={() => setShowModal(false)}
      className="modal"
      style={{
        color: "black",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter playlist's name"
              name="name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>Cancel</button>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={handleCreatePlaylist}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreatePlaylist;
