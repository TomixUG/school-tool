import React from 'react';
//prettier-ignore
import { Form, FormGroup, Label, Button, Alert, Spinner, Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import TextareaAutosize from 'react-autosize-textarea';

const ADD_CARD = gql`
  mutation addCard($cardDeckId: String!, $front: String!, $back: String!) {
    addCard(cardDeckId: $cardDeckId, front: $front, back: $back)
  }
`;

function AddCard(props) {
  let history = useHistory();
  const cardDeckId = props.match.params.id;
  var [addCard, { data, loading, error }] = useMutation(ADD_CARD, { onError() {} });
  const { register, handleSubmit } = useForm();

  const onSubmit = async (sdata, e) => {
    console.log(sdata);
    var d = await addCard({ variables: { cardDeckId: cardDeckId, front: sdata.front, back: sdata.back } });
    window.scrollTo(0, 0);
    if (d) e.target.reset();
  };

  return (
    <div>
      <Row>
        <Col xs="12" md="6">
          <span className="float-md-left">
            <h2>Creating new flashcard</h2>
          </span>
        </Col>
        <Col xs="12" md="6">
          <span className="float-md-right ">
            <Button color="danger" size="sm" onClick={() => history.push(`/flashcards/deck/${cardDeckId}`)}>
              <ArrowLeft /> Back
            </Button>
          </span>
        </Col>
      </Row>
      <br />
      <Card>
        <CardHeader>Add new card</CardHeader>
        <CardBody>
          {data && <Alert color="success">Card has been added successfully</Alert>}
          {error && <Alert color="danger">{error.message}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="exampleEmail">Front</Label>
              <TextareaAutosize className="form-control" ref={register} name="front" required rows={4} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Back</Label>
              <TextareaAutosize className="form-control" ref={register} name="back" required rows={4} />
            </FormGroup>
            <hr />

            {loading === false ? (
              <Button color="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Button color="primary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Submit
              </Button>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddCard;
