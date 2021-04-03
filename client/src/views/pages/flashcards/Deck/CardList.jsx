import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Button, Input, Form, Spinner, Alert } from 'reactstrap';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Edit2, Trash2, Check } from 'react-feather';
import TextareaAutosize from 'react-autosize-textarea';

const MODIFY_CARD = gql`
  mutation modifyCard($cardDeckId: String!, $cardId: String!, $front: String!, $back: String!) {
    modifyCard(cardDeckId: $cardDeckId, cardId: $cardId, front: $front, back: $back)
  }
`;

function CardList({ qData, refetch, cardDeckId }) {
  const [editId, setEditId] = useState();
  const [e, setE] = useState(false);
  const [modifyCard, { data, loading, error }] = useMutation(MODIFY_CARD, {
    update(_, result) {
      setEditId();
      setE(false);
    },
    onError() {
      setE(true);
    },
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = (sdata, e) => {
    console.log(sdata);
    modifyCard({ variables: { cardDeckId: cardDeckId, cardId: editId, front: sdata.front, back: sdata.back } });
    refetch();
  };

  useEffect(() => {
    setE(false);
  }, [editId]);

  if (qData.getCardDeck.cards.length === 0) return <h4>No cards have been added yet</h4>;
  return (
    <div>
      <Card>
        <CardBody>
          {qData.getCardDeck.cards.map((card) => (
            <div>
              {card.id === editId ? (
                <>
                  {e && error ? <Alert color="danger">{error.message}</Alert> : null}
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row form>
                      <Col xs="12" md="5">
                        <TextareaAutosize
                          className="form-control"
                          defaultValue={card.front}
                          ref={register}
                          name="front"
                          required
                        />
                      </Col>
                      <Col xs="12" md="6">
                        <TextareaAutosize
                          className="form-control"
                          defaultValue={card.back}
                          ref={register}
                          name="back"
                          required
                        />
                      </Col>
                      <Col xs="12" md="1">
                        {loading === false ? (
                          <Button size="sm" color="success" type="submit" id="Popover1">
                            <Check />
                          </Button>
                        ) : (
                          <Button size="sm" color="success" type="submit" disabled>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          </Button>
                        )}{' '}
                        <Button size="sm" color="danger" title="Delete">
                          <Trash2 />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              ) : (
                <Row>
                  <Col xs="12" md="5">
                    <div dangerouslySetInnerHTML={{ __html: card.front.replace(/\r?\n/g, '<br />') }} />
                  </Col>
                  <Col xs="12" md="6">
                    <div dangerouslySetInnerHTML={{ __html: card.back.replace(/\r?\n/g, '<br />') }} />
                  </Col>
                  <Col xs="12" md="1">
                    <Button size="sm" color="primary" onClick={() => setEditId(card.id)} title="Edit">
                      <Edit2 />
                    </Button>{' '}
                    <Button size="sm" color="danger" title="Delete">
                      <Trash2 />
                    </Button>
                  </Col>
                </Row>
              )}

              {/* check if it's last line */}
              {qData.getCardDeck.cards[qData.getCardDeck.cards.length - 1].id !== card.id ? <hr /> : null}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default CardList;
