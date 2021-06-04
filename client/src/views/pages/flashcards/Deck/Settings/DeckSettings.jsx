import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Name from './Name';

function DeckSettings({ modal, close, refetch, cardDeckId, data }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={close}>
        <ModalHeader toggle={close}>Deck settings</ModalHeader>
        <ModalBody>
          <Name cardDeckId={cardDeckId} data={data} modal={modal} refetch={refetch} />
          {/* <hr /> */}
          {/* TODO: add more */}
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

export default DeckSettings;
