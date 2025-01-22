import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/book')}>
          Library Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ cursor: 'pointer' }} onClick={() => navigate('/book')}>
              Books
            </Nav.Link>
            <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/book/create')}>
                Create Book
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/book/assign-return')}>
                Assign and Return
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/student')}>
                Students
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/student/create')}>
                Create Student
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopBar;
