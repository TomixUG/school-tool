import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import CardDeckCreateModal from './CardDeckCreateModal';

const GET_OWN_CARD_DECKS = gql`
  query getOwnCardDecks {
    getOwnCardDecks {
      name
      description
      createdAt
      id
    }
  }
`;

function CardDeckList() {
  const [modal, setModal] = useState(false);
  let history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_OWN_CARD_DECKS);

  if (loading) return <h1>Loading..</h1>;
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <CardDeckCreateModal modal={modal} close={() => setModal(false)} refetch={refetch} />
      <Row>
        <Col xs="12" md="8">
          <h1>List of your card decks</h1>
        </Col>
        <Col xs="6" md="4">
          <span className="float-md-right ">
            <Button color="primary" onClick={() => setModal(true)}>
              <Plus /> Deck
            </Button>
          </span>
        </Col>
      </Row>
      <br />
      <ListGroup>
        {data.getOwnCardDecks.map((cardDeck) => (
          <ListGroupItem action onClick={() => history.push('/flashcards/deck/' + cardDeck.id)}>
            <ListGroupItemHeading style={{ fontSize: '135%', color: 'black' }}>{cardDeck.name}</ListGroupItemHeading>
            <ListGroupItemText>{cardDeck.description}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default CardDeckList;
