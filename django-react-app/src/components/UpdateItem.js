import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UpdateItem = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [points, setPoints] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}/`);
                setName(response.data.name);
                setDescription(response.data.description);
                setPoints(response.data.points, null, 2);  // Format points as JSON string
            } catch (error) {
                setError('There was an error fetching the item details!');
                console.error('Error fetching item details:', error);
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let parsedPoints;
        try {
            parsedPoints = JSON.parse(points.replace(/'/g, '"'));  // Convert to valid JSON
        } catch (e) {
            setError('Points must be a valid JSON string.');
            return;
        }
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) formData.append('image', image);
        formData.append('points', JSON.stringify(parsedPoints));

        try {
            await axios.put(`http://127.0.0.1:8000/api/items/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Item updated successfully!');
            setName('');
            setDescription('');
            setImage(null);
            setPoints('');
        } catch (error) {
            setError('There was an error updating the item!');
            console.error('Error updating item:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col md={8}>
                    <h2>Update Item</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter item description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage" className="mt-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPoints" className="mt-3">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter points as a JSON string"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                Example: {"{'Origin': 'Thailand', 'Main Ingredients': 'Rice noodles, shrimp, chicken, tofu', 'Common Variants': 'Shrimp Pad Thai, Chicken Pad Thai', 'Serving Style': 'Stir-fried', 'Health Benefits': 'Balanced meal with protein, carbs, and vegetables', 'Popular Toppings': 'Peanuts, bean sprouts, lime', 'Preparation Method': 'Stir-frying', 'Cultural Significance': 'Popular street food', 'Accompaniments': 'Thai iced tea, spring rolls', 'Presentation': 'Served on a plate with garnishes'}"}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Update Item
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateItem;
