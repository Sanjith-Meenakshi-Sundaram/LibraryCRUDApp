import React, { useState, useEffect } from 'react';
import TopBar from '../common/TopBar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Students() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch student data from the API
  const getData = async () => {
    try {
      const res = await axios.get('https://67711fb92ffbd37a63ce415d.mockapi.io/student');
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data || 'Failed to fetch data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete a student (future enhancement)
  const handleDelete = (id) => {
    toast.error('Delete functionality not implemented');
  };

  // Edit a student (future enhancement)
  const handleEdit = (id) => {
    toast.error('Edit functionality not implemented');
  };

  return (
    <>
      <TopBar />
      <Container className="mt-4">
        <h3>Student List</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(student.id)}>
                      Edit
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={() => handleDelete(student.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Students;
