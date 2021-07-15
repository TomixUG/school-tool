import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Button, Alert, Spinner } from 'reactstrap';
import { useMutation, gql } from '@apollo/client';

import { X, Check } from 'react-feather';

const MODIFY_CARD = gql`
  mutation modifyCard($cardDeckId: String!, $cardId: String!, $timeSpent: Float, $status: CardStatus) {
    modifyCard(cardDeckId: $cardDeckId, cardId: $cardId, timeSpent: $timeSpent, status: $status)
  }
`;

function Logic({ data, cardDeckId }) {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);

  const [startTime, setStartTime] = useState();
  useEffect(() => setStartTime(new Date()), []); // update startTime on page load
  useEffect(() => setStartTime(new Date()), [index]); // update startTime on card change
  function getElapsedTime() {
    return new Date() - startTime;
  }

  var [modifyCard, { data: _, loading, error }] = useMutation(MODIFY_CARD, {
    onCompleted() {
      next();
    },
    onError() {},
  });

  function prev() {
    if (index - 1 >= 0) {
      setIndex(index - 1);
      setOpened(false);
    }
  }
  function next() {
    if (index + 1 < data.getCardDeck.cards.length) {
      setIndex(index + 1);
      setOpened(false);
    }
  }

  return (
    <div>
      {error ? <Alert color="danger">{error.message}</Alert> : ''}
      <Row>
        <Col>
          <p>{index + 1 + '/' + data.getCardDeck.cards.length}</p>
        </Col>
        <Col>
          {(() => {
            var color;
            switch (data.getCardDeck.cards[index].status) {
              case 'UNPLAYED':
                color = 'gray';
                break;
              case 'GOOD':
                color = 'green';
                break;
              case 'BAD':
                color = 'red';
                break;
            }
            return <p style={{ textAlign: 'right', color: color, fontSize: '20' }}>⬤</p>;
          })()}
        </Col>
      </Row>
      <Card>
        <CardBody>
          <div style={{ textAlign: 'center' }}>
            <h3>{data.getCardDeck.cards[index].front}</h3>
            {opened ? (
              <>
                <hr />
                <h3>{data.getCardDeck.cards[index].back}</h3>
              </>
            ) : (
              ''
            )}
          </div>
        </CardBody>
      </Card>

      <Row>
        <Col xs="12" md="4">
          <Button className="float-md-left" onClick={prev} disabled={index - 1 >= 0 ? false : true}>
            Prev
          </Button>
        </Col>
        <Col xs="12" md="4">
          {!opened ? (
            <Button className="float-md-middle" color="primary" onClick={() => setOpened(true)}>
              Reveal
            </Button>
          ) : (
            <>
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <>
                  <Button
                    color="success"
                    onClick={() => {
                      modifyCard({
                        variables: {
                          cardDeckId: cardDeckId,
                          cardId: data.getCardDeck.cards[index].id,
                          status: 'GOOD',
                          timeSpent: getElapsedTime(),
                        },
                      });
                    }}
                  >
                    <Check />
                    Good
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      modifyCard({
                        variables: {
                          cardDeckId: cardDeckId,
                          cardId: data.getCardDeck.cards[index].id,
                          status: 'BAD',
                          timeSpent: getElapsedTime(),
                        },
                      });
                    }}
                  >
                    <X />
                    Bad
                  </Button>
                </>
              )}
            </>
          )}
        </Col>
        <Col xs="12" md="4">
          <Button
            className="float-md-right"
            onClick={next}
            disabled={index + 1 < data.getCardDeck.cards.length ? false : true}
          >
            Skip
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Logic;
