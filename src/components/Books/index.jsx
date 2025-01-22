import React, { useState, useEffect } from 'react';
import TopBar from '../Common/Topbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Books() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  const getData = async () => {
    try {
      let res = await axios.get('https://67711fb92ffbd37a63ce415d.mockapi.io/books');
      if (res.status === 200) {
        setData(res.data);
        toast.success('Data Fetch Successful!');
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`https://67711fb92ffbd37a63ce415d.mockapi.io/books/${id}`);
      if (res.status === 200) {
        toast.success('Book Deleted Successfully');
        getData();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TopBar />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Publication</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.author}</td>
                <td>
                  {e.category.map((ele) => (
                    <span key={ele}> {ele} </span>
                  ))}
                </td>
                <td>{e.publication}</td>
                <td>{e.status ? 'Available' : 'Not Available'}</td>
                <td>
                  <Button variant="primary" onClick={() => navigate(`/book/edit/${e.id}`)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button variant="danger" onClick={() => handleDelete(e.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Books;
