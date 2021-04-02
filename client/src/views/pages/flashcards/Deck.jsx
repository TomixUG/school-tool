import React from 'react';
import { Alert, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';
import { X, Play, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';

import CardList from './Deck/CardList';

const GET_OWN_CARD_DECKS = gql`
  query getCardDeck($cardDeckId: String!) {
    getCardDeck(cardDeckId: $cardDeckId) {
      name
      description
      createdAt
      numberOfCards
      cards {
        id
        front
        back
        score
      }
    }
  }
`;

function Deck(props) {
  const cardDeckId = props.match.params.id;
  let history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_OWN_CARD_DECKS, { variables: { cardDeckId: cardDeckId } });

  if (loading) return <h1>Loading..</h1>;
  if (error) return <Alert color="danger">{error.message}</Alert>;

  return (
    <div>
      {/* Header */}
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <span className="float-md-left">{/* TODO: add something here  */}</span>
                </Col>
                <Col xs="12" md="6">
                  <span className="float-md-right ">
                    <Button color="danger" size="sm" onClick={() => history.push('/flashcards')}>
                      <X /> Exit
                    </Button>
                  </span>
                </Col>
              </Row>
              {window.innerWidth <= 992 ? <br /> : null}
              <div style={{ textAlign: 'center' }}>
                <h1>{data.getCardDeck.name}</h1>
                <p>{data.getCardDeck.description}</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END of Header */}

      {/* Info and Controls */}
      <Row>
        <Col xs="12" md="4" className="py-2">
          <Card className="h-100">
            <CardHeader>Stats</CardHeader>
            <CardBody>
              <ul>
                <li>
                  {data.getCardDeck.numberOfCards} {data.getCardDeck.numberOfCards === 1 ? 'card' : 'cards'}
                </li>
                <li>Created {moment(new Date(parseInt(data.getCardDeck.createdAt)), 'YYYYMMDD').fromNow()}</li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="4" className="py-2">
          <Card className="h-100">
            <CardHeader>Play</CardHeader>
            <CardBody style={{ textAlign: 'center' }}>
              {/* TODO: */}
              <Button size="lg" color="success">
                <Play /> Start learning
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="4" className="py-2">
          <Card className="h-100">
            <CardHeader>Add new cards</CardHeader>
            <CardBody style={{ textAlign: 'center' }}>
              {/* <AddCard cardDeckId={cardDeckId} refetch={refetch} /> */}
              <Button
                color="primary"
                onClick={() => {
                  history.push(`/flashcards/deck/${cardDeckId}/addcard`);
                }}
              >
                <Plus /> Add new cards
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      {/* END of Info and Controls */}

      {/* List of cardss */}
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>List of cards ({data.getCardDeck.numberOfCards})</CardHeader>
            <CardBody>
              <CardList data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END of List of cardss */}
    </div>
  );
}

export default Deck;
