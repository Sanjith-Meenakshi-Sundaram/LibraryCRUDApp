import React from 'react';
import TopBar from '../common/TopBar';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const navigate = useNavigate();

  // Validation schema using Yup
  const StudentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
  });

  // Function to create a new student
  const create = async (values) => {
    try {
      const res = await axios.post('https://67711fb92ffbd37a63ce415d.mockapi.io/student', values);
      if (res.status === 201) {
        toast.success('Student created successfully!');
        navigate('/student');
      }
    } catch (error) {
      toast.error(error.response?.data || 'An error occurred');
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: StudentSchema,
    onSubmit: (values) => create(values),
  });

  return (
    <>
      <TopBar />
      <div className="container mt-4">
        <h3>Create Student</h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateStudent;
