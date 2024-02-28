import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import '../styles/UserPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/actions';
const UserPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);

  const handleEditClick = () => {
    setEditedUserData(userData);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(editedUserData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        dispatch(setUserData(editedUserData));
        setEditMode(false);
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
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
                        name="profession"
                        value={editedUserData.profession}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Текущий пароль</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={editedUserData.currentPassword}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Новый пароль</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={editedUserData.newPassword}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Card.Title>{userData.username}</Card.Title>
                    <Card.Text>{userData.email}</Card.Text>
                    <Card.Text>{userData.profession}</Card.Text>
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