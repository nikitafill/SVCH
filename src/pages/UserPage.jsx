import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import '../styles/UserPage.css';

const UserPage = () => {
  const initialUserData = {
    username: 'Иван Иванов',
    email: 'ivanivanov@example.com',
    prof: 'Управляющий',
    about: 'Пример описания.',
    image: 'https://img.freepik.com/premium-photo/happy-bearded-business-man-in-black-suit-holding-tablet-computer_171337-84615.jpg'
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(initialUserData);

  const handleEditClick = () => {
    setEditedUserData(userData);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    setUserData(editedUserData);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedUserData({ ...editedUserData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="fade-in">
    <Container className="mt-5 user-container">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={editMode ? editedUserData.image : userData.image} />
            <Card.Body>
              {editMode ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Имя пользоавтеля</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={editedUserData.username}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editedUserData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Профессия</Form.Label>
                    <Form.Control
                      type="text"
                      name="prof"
                      value={editedUserData.prof}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Изображение профиля</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Card.Title>{userData.username}</Card.Title>
                  <Card.Text>{userData.email}</Card.Text>
                  <Card.Text>{userData.prof}</Card.Text>
                </>
              )}
              {editMode ? (
                <>
                  <Button variant="success" onClick={handleSaveClick}>Сохранить</Button>
                  <Button variant="secondary" onClick={handleCancelClick}>Отмена</Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleEditClick}>Редактировать профиль</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Обо мне</Card.Title>
              {editMode ? (
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    name="about"
                    value={editedUserData.about}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              ) : (
                <Card.Text>{userData.about}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default UserPage;