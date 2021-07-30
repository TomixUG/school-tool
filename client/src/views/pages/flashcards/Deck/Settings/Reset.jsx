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

const RESET_CARDS = gql`
  mutation resetCards($cardDeckId: String!) {
    resetCards(cardDeckId: $cardDeckId)
  }
`;

function Reset({ cardDeckId, refetch }) {
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  var [resetCards, { data, loading, error }] = useMutation(RESET_CARDS, {
    update() {
      refetch();
      setE(false);
      setD(true);
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
          <b>Reset</b> cards
        </ModalHeader>
        <ModalBody>
          {d && <Alert color="success">Cards have been successfully reset</Alert>}
          {e && error && <Alert color="danger">{error.message}</Alert>}
          <FormGroup>Are you 100% sure you want to reset all cards?</FormGroup>
          {loading === false ? (
            <Button
              color="danger"
              onClick={() => {
                resetCards({
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
          <b>Reset cards</b>
        </Label>
        <FormText color="muted">This resets the card progress</FormText>
      </FormGroup>

      <Button color="danger" onClick={() => setConfirmModal(true)}>
        Reset
      </Button>
    </div>
  );
}

export default Reset;
