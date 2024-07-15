import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Container, Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/items/')
            .then(response => {
                // Parse the points field from string to object
                const parsedItems = response.data.map(item => ({
                    ...item,
                    points: JSON.parse(item.points.replace(/'/g, '"'))  // Convert single quotes to double quotes and parse
                }));
                setItems(parsedItems);
                console.log("Items fetched", parsedItems);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    return (
        <Container>
            {items.map((item, index) => (
                <Row key={item.id} className="my-3">
                    {index % 2 === 0 ? (
                        <>
                            <Col md={4} className="order-1 order-md-1">
                                <img src={item.image || 'default-image.jpg'} alt={item.name} height="300" className="img-fluid" />
                            </Col>
                            <Col md={8} className="order-2 order-md-2 mb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                        {/* Display points as a list */}
                                        {item.points && (
                                            <ListGroup className="list-group-flush">
                                                {Object.entries(item.points).map(([key, value]) => (
                                                    <ListGroup.Item key={key}>
                                                        <strong>{key}:</strong> {value}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                         <Link to={`/update/${item.id}`}>
                                    <Button variant="primary">Update</Button>
                                </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={8} className="order-2 order-md-1">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                        {/* Display points as a list */}
                                        {item.points && (
                                            <ListGroup className="list-group-flush">
                                                {Object.entries(item.points).map(([key, value]) => (
                                                    <ListGroup.Item key={key}>
                                                        <strong>{key}:</strong> {value}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                        <Link to={`/update/${item.id}`}>
                                    <Button variant="primary">Update</Button>
                                </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="order-1 order-md-2">
                                <img src={item.image || 'default-image.jpg'} alt={item.name} height="300" className="img-fluid" />
                            </Col>
                        </>
                    )}
                </Row>
            ))}
        </Container>
    );
};

export default ItemList;
