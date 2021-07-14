import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, Row, Col, CardBody, Button, Alert } from 'reactstrap';
import { X } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Logic from './Logic';

import PageLoading from './../../../util/PageLoading';

const GET_CARD_DECK = gql`
  query getCardDeck($cardDeckId: String!) {
    getCardDeck(cardDeckId: $cardDeckId) {
      name
      numberOfCards
      cards {
        id
        front
        back
        timeSpent
        status
      }
    }
  }
`;

function Play(props) {
  const cardDeckId = props.match.params.id;
  let history = useHistory();

  const [sorted, setSorted] = useState(false);

  const { loading, error, data } = useQuery(GET_CARD_DECK, {
    variables: { cardDeckId: cardDeckId },
    onCompleted() {
      //sort the cards
      var unplayed = [];
      var good = [];
      var bad = [];

      for (var i = 0; i < data.getCardDeck.cards.length; i++) {
        if (data.getCardDeck.cards[i].status === 'UNPLAYED') unplayed.push(data.getCardDeck.cards[i]);
        if (data.getCardDeck.cards[i].status === 'GOOD') good.push(data.getCardDeck.cards[i]);
        if (data.getCardDeck.cards[i].status === 'BAD') bad.push(data.getCardDeck.cards[i]);
      }

      data.getCardDeck.cards = unplayed.concat(bad, good);

      setSorted(true);
    },
  });

  if (loading) return <PageLoading />;
  if (error) return <Alert color="danger">{error.message}</Alert>;

  return (
    <div>
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <h4 className="float-md-left">{data.getCardDeck.name}</h4>
                </Col>
                <Col xs="12" md="6">
                  <span className="float-md-right ">
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => {
                        history.push(`/flashcards/deck/${cardDeckId}`);
                      }}
                    >
                      <X /> Stop learning
                    </Button>
                  </span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {data.getCardDeck.cards.length === 0 ? (
        <h3 className="m-t-xxl text-center">
          <b>No cards have been added yet</b>
        </h3>
      ) : (
        <>{sorted ? <Logic data={data} cardDeckId={cardDeckId} /> : 'sorting ...'}</>
      )}
    </div>
  );
}

export default Play;
