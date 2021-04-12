import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert, Spinner } from 'reactstrap';
import { useMutation, gql } from '@apollo/client';

const REMOVE_CARD = gql`
  mutation removeCard($cardDeckId: String!, $cardId: String!) {
    removeCard(cardDeckId: $cardDeckId, cardId: $cardId)
  }
`;

function CardRemoveModal({ modal, close, refetch, current, cardDeckId }) {
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);

  var [removeCard, { data, loading, error }] = useMutation(REMOVE_CARD, {
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

  useEffect(() => {
    setE(false);
    setD(false);
  }, [modal]);

  return (
    <div>
      {' '}
      <Modal isOpen={modal} toggle={close}>
        <ModalHeader toggle={close}>Removing card</ModalHeader>
        <ModalBody>
          {d && data && <Alert color="success">Card has been removed successfully</Alert>}
          {e && error && <Alert color="danger">{error.message}</Alert>}

          <p>Are you sure you want to remove this card?</p>
          <p
            style={{ width: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            title={current.front}
          >
            <b>Front</b>: {current.front}
          </p>
          <p
            style={{ width: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            title={current.back}
          >
            <b>Back</b>: {current.back}
          </p>

          {loading === false ? (
            <Button
              color="primary"
              type="submit"
              onClick={() => {
                removeCard({
                  variables: {
                    cardDeckId: cardDeckId,
                    cardId: current.cardId,
                  },
                });
              }}
            >
              Remove
            </Button>
          ) : (
            <Button color="primary" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Submit
            </Button>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={close}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CardRemoveModal;
