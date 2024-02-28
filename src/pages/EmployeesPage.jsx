import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGroups,
  addGroup as addGroupAction,
  editGroup as editGroupAction,
  deleteGroup as deleteGroupAction,
  addEmployee as addEmployeeAction,
  editEmployee as editEmployeeAction,
  deleteEmployee as deleteEmployeeAction,
} from '../redux/actions';
import styles from './../styles/EmployeesPage.css';
import axios from 'axios';

const EmployeesPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    members: [],
  });
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    name: '',
    position: '',
    department: '',
    bio: '',
    image: '',
    email: '',
  });
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    bio: '',
    image: '',
    email: '',
  });

  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const headers = {
            Authorization: `${token}`,
          };

          const response = await axios.get('http://localhost:3001/groups', { headers });
          dispatch(setGroups(response.data));
        } else {
          console.error('No token found. User not authenticated.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setContentLoaded(true);
  }, [dispatch, showEmployeeModal]);

  const handleDeleteGroup = async (groupId) => {
    try {
      const userToken = localStorage.getItem('token');

      const headers = {
        Authorization: `${userToken}`,
        'Content-Type': 'application/json',
      };

      await axios.delete(`http://localhost:3001/groups/${groupId}`, { headers });

      dispatch(deleteGroupAction(groupId));

      setSelectedGroup(null);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleSelectedEmployee = async (employee) => {
    console.log(employee)
    setShowEmployeeModal(true)
    setNewEmployee(employee)
    setSelectedEmployee(employee)
  };

  const handleAddGroup = async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('http://localhost:3001/groups', newGroup, config);
      const addedGroup = response.data;

      dispatch(addGroupAction(addedGroup));

      setShowAddGroupModal(false);
      setNewGroup({
        name: '',
        members: [],
      });
    } catch (error) {
      console.error('Error adding group:', error.message);
    }
  };

  const handleEditGroup = () => {
    const groupId = newGroup.id;

    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    };

    axios.put(`http://localhost:3001/groups/${groupId}`, newGroup, { headers })
      .then(response => {
        dispatch(editGroupAction(response.data));
      })
      .catch(error => {
        console.error('Error editing group:', error);
      })
      .finally(() => {
        setShowEditGroupModal(false);
        handleCloseMembersModal();
        handleCloseEditModal();
      });
  };

  const handleCloseAddModal = () => {
    setShowAddGroupModal(false);
    setNewGroup({
      name: '',
      members: [],
    });
  };

  const handleCloseEditModal = () => {
    setShowEditGroupModal(false);
    setSelectedGroup(null);
    setNewGroup({
      name: '',
    });
  };

  const handleShowMembersModal = (group) => {
    setSelectedGroup(group);
    setShowMembersModal(true);
  };

  const handleCloseMembersModal = () => {
    setShowMembersModal(false);
    // setSelectedGroup(null);
  };

  const handleCloseEditGroupModal = () => {
    setShowEditGroupModal(false);
  };

  const handleAddEmployee = (group) => {
    setSelectedGroup(group)
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      bio: '',
      image: '',
      email: '',
    });
    setShowEmployeeModal(true);
  };

  const handleEditEmployee = () => {
    const token = localStorage.getItem('token');

    const requestData = {
      method: newEmployee.id ? 'PUT' : 'POST',
      url: newEmployee.id ? `http://localhost:3001/employees/${newEmployee.id}` : 'http://localhost:3001/employees',
      data: {
        ...newEmployee,
        groupId: selectedGroup.id,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    };

    axios(requestData)
      .then(response => {
        const addedOrEditedEmployee = response.data;

        if (selectedEmployee) {
          dispatch(editEmployeeAction(addedOrEditedEmployee, selectedGroup.id));
        } else {
          dispatch(addEmployeeAction(addedOrEditedEmployee, selectedGroup.id));
        }

        setShowMembersModal(false)
        setShowEmployeeModal(false);
      })
      .catch(error => {
        console.error('Error adding/editing employee:', error);
      });
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const apiUrl = `http://localhost:3001/employees/${employeeId}`;

      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `${token}`,
      };

      await axios.delete(apiUrl, { headers });

      dispatch(deleteEmployeeAction(employeeId, selectedGroup.id));
      setShowMembersModal(false);
      setShowEmployeeModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className={`${styles.container} container-faq ${contentLoaded ? 'show' : ''}`}>
      <h1>Группы сотрудников</h1>
      <Button variant="success" onClick={() => setShowAddGroupModal(true)} className={styles.addGroupBtn}>
        Добавить группу
      </Button>
      <Modal show={showAddGroupModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить группу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Название группы</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название группы"
                name="name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddGroup}>
            Добавить
          </Button>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        {groups &&
          groups.map((group) => (
            <div className="col-md-4 mb-3" key={group.id}>
              <Card className={styles.card}>
                <Card.Body>
                  <Card.Title>{group.name}</Card.Title>
                  <Button variant="primary" onClick={() => handleShowMembersModal(group)}>
                    Подробнее
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteGroup(group.id)} className="ms-2">
                    Удалить
                  </Button>
                  <Button variant="primary" onClick={() => handleAddEmployee(group)} className="ms-2">
                    Добавить сотрудника
                  </Button>
                </Card.Body>
                <Button
                  variant="info"
                  onClick={() => {
                    setSelectedGroup(group);
                    setNewGroup({ ...group });
                    setShowEditGroupModal(true);
                  }}
                  className="me-2"
                >
                  Редактировать
                </Button>
              </Card>
            </div>
          ))}
      </div>

      <Modal show={showMembersModal} onHide={() => setShowMembersModal(false)}>
        {showMembersModal && (
          <>
            <Modal.Header closeButton className={styles.modalHeader}>
              <Modal.Title>{selectedGroup.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              {selectedGroup.members.length > 0 ? (
                selectedGroup.members.map((member) => (
                  <div key={member.id}>
                    <p><strong>Имя:</strong> {member.name}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Должность:</strong> {member.position}</p>
                    <p><strong>Отдел:</strong> {member.department}</p>
                    <p><strong>Биография:</strong> {member.bio}</p>
                    <Button variant="primary" onClick={() => handleSelectedEmployee(member)}>
                      Подробнее
                    </Button>
                    <img src={member.image} alt={member.name} />
                  </div>
                ))
              ) : (
                <p>No members in this group.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleCloseMembersModal(null)}>
                Закрыть
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>


      <Modal show={showEditGroupModal} onHide={handleCloseEditGroupModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать группу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Название группы</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите новое название группы"
                name="name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditGroup}>
            Сохранить изменения
          </Button>
          <Button variant="secondary" onClick={handleCloseEditGroupModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEmployeeModal} onHide={handleCloseMembersModal}>
        <Modal.Header>
          <Modal.Title>Подробности о сотруднике</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formEmployeeName">
              <Form.Label>Имя сотрудника</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя сотрудника"
                name="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeePosition">
              <Form.Label>Должность</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите должность сотрудника"
                name="position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeeDepartment">
              <Form.Label>Отдел</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите отдел сотрудника"
                name="department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeeExperience">
              <Form.Label>Опыт</Form.Label>
              <Form.Control
                type="number"
                placeholder="Опыт сотрудника в годах"
                name="experience"
                value={newEmployee.experience}
                onChange={(e) => setNewEmployee({ ...newEmployee, experience: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeeBio">
              <Form.Label>Биография</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Введите биографию сотрудника"
                name="bio"
                value={newEmployee.bio}
                onChange={(e) => setNewEmployee({ ...newEmployee, bio: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeeImage">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL изображения сотрудника"
                name="image"
                value={newEmployee.image}
                onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeeEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email сотрудника"
                name="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleEditEmployee}>
            Сохранить изменения
          </Button>
          <Button variant="danger" onClick={() => handleDeleteEmployee(selectedEmployee.id)}>
            Удалить сотрудника
          </Button>
          <Button variant="secondary" onClick={() => setShowEmployeeModal(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeesPage;