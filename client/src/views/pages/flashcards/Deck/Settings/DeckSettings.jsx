import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Name from './Name';
import Description from './Description';
import Delete from './Delete';

function DeckSettings({ modal, close, refetch, cardDeckId, data }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={close}>
        <ModalHeader toggle={close}>Deck settings</ModalHeader>
        <ModalBody>
          <Name cardDeckId={cardDeckId} data={data} modal={modal} refetch={refetch} />
          <hr />
          <Description cardDeckId={cardDeckId} data={data} modal={modal} refetch={refetch} />
          <hr />
          <Delete cardDeckId={cardDeckId} refetch={refetch} />
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
