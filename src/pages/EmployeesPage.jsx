import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import employeesData from '../data/employees.json';
import styles from './../styles/EmployeesPage.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEmployees,
  addEmployee as addEmployeeAction,
  editEmployee as editEmployeeAction,
  deleteEmployee as deleteEmployeeAction,
} from '../redux/actions';

const EmployeesPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    bio: '',
    image: 'https://via.placeholder.com/150',
  });
  const [contentLoaded, setContentLoaded] = useState(false);

  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEmployees(employeesData));
    setContentLoaded(true);
  }, [dispatch]);

  const showEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = (employeeId) => {
    dispatch(deleteEmployeeAction(employeeId));
    setSelectedEmployee(null);
  };

   const handleAddEmployee = () => {
    dispatch(addEmployeeAction({ ...newEmployee, id: employees.length + 1 }));
    setShowAddEmployeeModal(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      email: '',
      bio: '',
      image: 'https://via.placeholder.com/150',
    });
  };

  const handleEditEmployee = () => {
    dispatch(editEmployeeAction(newEmployee));
    setShowEditEmployeeModal(false);
    handleCloseEditModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewEmployee({ ...newEmployee, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddEmployeeModal(false);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      email: '',
      bio: '',
      image: 'https://via.placeholder.com/150',
    });
  };
  
  const handleCloseEditModal = () => {
    setShowEditEmployeeModal(false);
    setSelectedEmployee(null);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      email: '',
      bio: '',
      image: 'https://via.placeholder.com/150',
    });
  };

  return (
    <div className={`${styles.container} container-faq ${contentLoaded ? 'show' : ''}`}>
    <h1>Список сотрудников</h1>
    <Button variant="success" onClick={() => setShowAddEmployeeModal(true)} className={styles.addEmployeeBtn}>
        Добавить сотрудника
    </Button>
    <Modal show={showAddEmployeeModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить сотрудника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                name="name"
                value={newEmployee.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Должность</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите должность"
                name="position"
                value={newEmployee.position}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Отдел</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите отдел"
                name="department"
                value={newEmployee.department}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите email"
                name="email"
                value={newEmployee.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Биография</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bio"
                    value={newEmployee.bio}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Фотография</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddEmployee}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="row">
      {employees.map((employee) => (
        <div className="col-md-4 mb-3" key={employee.id}>
          <Card className={styles.card}>
            <Card.Img variant="top" src={employee.image} alt={employee.name} />
            <Card.Body>
              <Card.Title>{employee.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.position}</Card.Subtitle>
              <Button variant="primary" onClick={() => showEmployeeDetails(employee)}>
                Подробнее
              </Button>
              <Button variant="danger" onClick={() => handleDelete(employee.id)} className="ms-2">
                Удалить
              </Button>
            </Card.Body>
            <Button
                variant="info"
                onClick={() => {
                  setSelectedEmployee(employee);
                  setNewEmployee({ ...employee });
                  setShowEditEmployeeModal(true);
                }}
                className="me-2"
              >
                Редактировать
              </Button>
          </Card>
        </div>
      ))}
    </div>

       <Modal show={!!selectedEmployee} onHide={() => setSelectedEmployee(null)}>
        {selectedEmployee && (
          <>
            <Modal.Header closeButton className={styles.modalHeader}>
              <Modal.Title>{selectedEmployee.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <Card.Img src={selectedEmployee.image} alt={selectedEmployee.name} />
              <p>Должность: {selectedEmployee.position}</p>
              <p>Отдел: {selectedEmployee.department}</p>
              <p>Email: {selectedEmployee.email}</p>
              <p>Биография: {selectedEmployee.bio}</p>
            </Modal.Body>
          </>
        )}
      </Modal>

      <Modal show={showEditEmployeeModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать сотрудника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                name="name"
                value={newEmployee.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPosition">
              <Form.Label>Должность</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите должность"
                name="position"
                value={newEmployee.position}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Отдел</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите отдел"
                name="department"
                value={newEmployee.department}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите email"
                name="email"
                value={newEmployee.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Биография</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bio"
                    value={newEmployee.bio}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Фотография</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditEmployee}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeesPage;