import React from 'react';
import { Alert, Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';
import { X, Play } from 'react-feather';
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
  const { loading, error, data } = useQuery(GET_OWN_CARD_DECKS, { variables: { cardDeckId: cardDeckId } });

  if (loading) return <h1>Loading..</h1>;
  if (error) return <Alert color="danger">{error.message}</Alert>;

  return (
    <div>
      {/* <h1>{data.getCardDeck.name}</h1>
      <p>{data.getCardDeck.description}</p> */}
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
      <Row>
        <Col xs="12" md="4">
          <Card>
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
        <Col xs="12" md="4">
          <Card>
            <CardHeader>Play</CardHeader>
            <CardBody style={{ textAlign: 'center' }}>
              {/* TODO: */}
              <Button size="lg" color="success">
                <Play /> Play
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="4">
          <Card>
            <CardHeader>Add new card</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Front</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Back</Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <hr />
                <Button color="primary">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>List of cards</CardHeader>
            <CardBody>
              <CardList data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Deck;
