import React from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import { Edit2, Trash2 } from 'react-feather';
function CardList({ data }) {
  if (data.getCardDeck.cards.length === 0) return <h4>No cards have been added yet</h4>;

  return (
    <div>
      <Card>
        <CardBody>
          {data.getCardDeck.cards.map((card) => (
            <div>
              <Row>
                <Col xs="12" md="5">
                  <p>{card.front}</p>
                </Col>
                <Col xs="12" md="6">
                  <p>{card.back}</p>
                </Col>
                <Col xs="12" md="1">
                  <Button size="sm" color="primary">
                    <Edit2 />
                  </Button>{' '}
                  <Button size="sm" color="danger">
                    <Trash2 />
                  </Button>
                </Col>
              </Row>
              {data.getCardDeck.cards[data.getCardDeck.cards.length - 1].id !== card.id ? <hr /> : null}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default CardList;
