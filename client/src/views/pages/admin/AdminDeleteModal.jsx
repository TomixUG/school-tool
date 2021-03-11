import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert, Spinner } from 'reactstrap';
import { useMutation, gql } from '@apollo/client';

const ADMIN_DELETE = gql`
  mutation adminDelete($idToDelete: String!, $whatToDelete: String!) {
    adminDelete(idToDelete: $idToDelete, whatToDelete: $whatToDelete)
  }
`;
function AdminDeleteModal({ modal, close, refetch, current }) {
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);

  var [adminDelete, { data, loading, error }] = useMutation(ADMIN_DELETE, {
    update() {
      refetch(); //refetch the ranks
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
        <ModalHeader toggle={close}>
          Removing <b>{current.name}</b>
        </ModalHeader>
        <ModalBody>
          {d && data && <Alert color="success">{current.name} has been removed successfully</Alert>}
          {e && error && <Alert color="danger">{error.message}</Alert>}

          <p>Are you sure you want to remove this?</p>

          {loading === false ? (
            <Button
              color="primary"
              type="submit"
              onClick={() => {
                adminDelete({
                  variables: {
                    idToDelete: current.idToDelete,
                    whatToDelete: current.whatToDelete,
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

export default AdminDeleteModal;
