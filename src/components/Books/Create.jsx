import React, { useEffect, useState } from 'react';
import TopBar from '../Common/Topbar';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const BASE_URL = 'https://67711fb92ffbd37a63ce415d.mockapi.io/books';

const optionsArray = [
  { key: "ScFi", label: "ScFi" },
  { key: "Fantasy", label: "Fantasy" },
  { key: "History", label: "History" },
  { key: "Novel", label: "Novel" },
  { key: "Science", label: "Science" },
  { key: "Development", label: "Development" }
];

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState({
    name: '',
    author: '',
    publication: ''
  });
  const [category, setCategory] = useState([]);

  // Validation schema
  const StudentSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    publication: Yup.string().required('Required')
  });

  // Create book function
  const handleCreate = async (values) => {
    try {
      const body = { ...values, category, status: true };
      const res = await axios.post(BASE_URL, body);
      if (res.status === 201) {
        toast.success("Book Created Successfully");
        navigate('/book');
      }
    } catch (error) {
      console.error(error.response); // Log error for debugging
      toast.error(error.response?.data || "Failed to create book");
    }
  };

  // Edit book function
  const handleEdit = async (values) => {
    try {
      const body = { ...values, category };
      const res = await axios.put(`${BASE_URL}/${id}`, body);
      if (res.status === 200) {
        toast.success("Book Edited Successfully");
        navigate('/book');
      }
    } catch (error) {
      console.error(error.response); // Log error for debugging
      toast.error(error.response?.data || "Failed to edit book");
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: initialState,
    enableReinitialize: true,
    validationSchema: StudentSchema,
    onSubmit: (values) => {
      if (id) {
        handleEdit(values);
      } else {
        handleCreate(values);
      }
    }
  });

  // Fetch data for editing
  const getData = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      if (res.status === 200) {
        toast.success("Data Fetched Successfully");
        setInitialState({
          name: res.data.name,
          author: res.data.author,
          publication: res.data.publication
        });
        setCategory(res.data.category || []);
      }
    } catch (error) {
      console.error(error.response); // Log error for debugging
      toast.error(error.response?.data || "Data not found");
    }
  };

  // Load data on component mount if editing
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <>
      <TopBar />
      <div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              id='name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Author"
              id='author'
              name='author'
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.author && formik.errors.author && (
              <div style={{ color: "red" }}>{formik.errors.author}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Publication</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Publication"
              id='publication'
              name='publication'
              value={formik.values.publication}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.publication && formik.errors.publication && (
              <div style={{ color: "red" }}>{formik.errors.publication}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <DropdownMultiselect
              options={optionsArray}
              name="category"
              id="category"
              selected={category}
              handleOnChange={(selected) => setCategory(selected)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {id ? 'Edit' : 'Create'}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Create;
