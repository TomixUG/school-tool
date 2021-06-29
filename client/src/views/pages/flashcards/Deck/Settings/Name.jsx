import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Button, Spinner, Form, Input, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';

const MODIFY_DECK_NAME = gql`
  mutation modifyCardDeck($cardDeckId: String!, $name: String) {
    modifyCardDeck(cardDeckId: $cardDeckId, name: $name)
  }
`;

function Name({ cardDeckId, modal, dataD, refetch }) {
  const { register, handleSubmit } = useForm();

  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  var [modifyName, { data, loading, error }] = useMutation(MODIFY_DECK_NAME, {
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

  // clear the alert on modal close TODO: make smarter
  useEffect(() => {
    setE(false);
    setD(false);
  }, [modal]);

  const onSubmit = (sdata) => {
    console.log(sdata);
    modifyName({ variables: { cardDeckId: cardDeckId, name: sdata.name } });
  };

  return (
    <div>
      {d && <Alert color="success">Name has been modified successfully</Alert>}
      {e && error && <Alert color="danger">{error.message}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="exampleEmail">Name</Label>
          <Input {...register('name', { required: true })} defaultValue={dataD.name} required />
        </FormGroup>

        {loading === false ? (
          <Button color="primary" type="submit">
            Change
          </Button>
        ) : (
          <Button color="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Change
          </Button>
        )}
      </Form>
    </div>
  );
}

export default Name;
