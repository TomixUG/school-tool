import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

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
  const { loading, error, data, refetch } = useQuery(GET_OWN_CARD_DECKS);

  if (loading) return <h1>Loading..</h1>;
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <h1>List of your card decks</h1>
      <br />
      <ListGroup>
        {data.getOwnCardDecks.map((cardDeck) => (
          <ListGroupItem action onClick={() => console.log('test')}>
            <ListGroupItemHeading style={{ fontSize: '135%', color: 'black' }}>{cardDeck.name}</ListGroupItemHeading>
            <ListGroupItemText>{cardDeck.description}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default CardDeckList;
