import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

const CREATE_CARD_DECK = gql`
  mutation createCardDeck($name: String!, $description: String) {
    createCardDeck(name: $name, description: $description)
  }
`;

function CardDeckCreateModal({ modal, close, refetch }) {
  const { register, handleSubmit } = useForm();

  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  var [createDeck, { data, loading, error }] = useMutation(CREATE_CARD_DECK, {
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

  const onSubmit = (sdata) => {
    console.log(sdata);
    createDeck({ variables: { name: sdata.name, description: sdata.description } });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={close}>
        <ModalHeader toggle={close}>Creating deck</ModalHeader>
        <ModalBody>
          {d && data && <Alert color="success">Deck has been created successfully</Alert>}
          {e && error && <Alert color="danger">{error.message}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="exampleEmail">Name *</Label>
              <Input name="name" innerRef={register} required />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Description</Label>
              <Input name="description" innerRef={register} />
            </FormGroup>

            {loading === false ? (
              <Button color="primary" type="submit">
                Create
              </Button>
            ) : (
              <Button color="primary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Submit
              </Button>
            )}
          </Form>
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

export default CardDeckCreateModal;
