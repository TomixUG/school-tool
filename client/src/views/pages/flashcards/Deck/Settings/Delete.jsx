import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Label,
  Button,
  Spinner,
  Alert,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const REMOVE_DECK = gql`
  mutation removeCardDeck($cardDeckId: String!) {
    removeCardDeck(cardDeckId: $cardDeckId)
  }
`;

function Delete({ cardDeckId, refetch }) {
  let history = useHistory();

  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  var [removeDeck, { data, loading, error }] = useMutation(REMOVE_DECK, {
    update() {
      refetch();
      setE(false);
      setD(true);
      history.push('/flashcards'); //redirect to /flashcards after successful removal
    },
    onError() {
      setD(false);
      setE(true);
    },
  });

  const [confirmModal, setConfirmModal] = useState();
  const closeModal = () => {
    setConfirmModal(false);
  };

  useEffect(() => {
    setE(false);
    setD(false);
  }, [confirmModal]);

  return (
    <div>
      {/* confirm modal */}
      <Modal isOpen={confirmModal} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>
          <b>DELETING</b> deck
        </ModalHeader>
        <ModalBody>
          {d && <Alert color="success">Deck has been deleted successfully</Alert>}
          {e && error && <Alert color="danger">{error.message}</Alert>}
          <FormGroup>Are you 100% sure you want to delete this deck?</FormGroup>
          {loading === false ? (
            <Button
              color="danger"
              onClick={() => {
                removeDeck({
                  variables: {
                    cardDeckId: cardDeckId,
                  },
                });
              }}
            >
              Yes
            </Button>
          ) : (
            <Button color="danger" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Yes
            </Button>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* end of confirm modal */}

      <FormGroup>
        <Label for="exampleEmail">
          <b>Delete deck</b>
        </Label>
        <FormText color="muted">Warning: this action cannot be undone (please be careful)</FormText>
      </FormGroup>

      <Button color="danger" onClick={() => setConfirmModal(true)}>
        DELETE
      </Button>
    </div>
  );
}

export default Delete;
