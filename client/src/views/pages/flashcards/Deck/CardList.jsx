import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
function CardList({ data }) {
  if (data.getCardDeck.cards.length === 0) return <h4>No cards have been added yet</h4>;

  return (
    <div>
      {data.getCardDeck.cards.map((card) => (
        <Card>
          <CardBody>
            <Row>
              <Col xs="12" md="6">
                <a>{card.front}</a>
              </Col>
              <Col xs="12" md="6">
                <a>{card.back}</a>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default CardList;
