import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Button, Spinner, Form, Input, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';

import Optional from '../../../../util/Optional';

const MODIFY_DECK_DESCRIPTION = gql`
  mutation modifyCardDeck($cardDeckId: String!, $description: String) {
    modifyCardDeck(cardDeckId: $cardDeckId, description: $description)
  }
`;

function Description({ cardDeckId, modal, dataD, refetch }) {
  const { register, handleSubmit } = useForm();

  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  var [modifyDescription, { data, loading, error }] = useMutation(MODIFY_DECK_DESCRIPTION, {
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
    modifyDescription({ variables: { cardDeckId: cardDeckId, description: sdata.description } });
  };

  return (
    <div>
      {d && <Alert color="success">Description has been modified successfully</Alert>}
      {e && error && <Alert color="danger">{error.message}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="exampleEmail">
            Description <Optional />
          </Label>
          <Input {...register('description')} defaultValue={dataD.description} />
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

export default Description;
