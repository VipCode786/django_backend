import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CreateItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [points, setPoints] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) formData.append('image', image);
        formData.append('points', points);

        try {
            await axios.post('http://127.0.0.1:8000/api/items/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Item created successfully!');
            setName('');
            setDescription('');
            setImage(null);
            setPoints('');
        } catch (error) {
            setError('There was an error creating the item!');
            console.error('Error creating item:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col md={8}>
                    <h2>Create New Item</h2>
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
                                Example: {"{'Origin': 'Japan', 'Main Ingredients': 'Vinegared rice, seafood, vegetables', ... }"}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Create Item
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateItem;
