import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function Loginpage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (values, actions) => {
    try {      
      const registeredUser = {
        UserName:values.name,
        Email:values.email,
        Password:values.password
      }
      const res = await axios.post("/api/login",registeredUser);
      localStorage.setItem('email',values.email)
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('userid',res.data.userid);
      actions.resetForm();
      setLoginError('');
      navigate('/'); // Redirect to home page after successful login

    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card className="p-4 shadow p-3 mb-5 bg-body-tertiary rounded" style={{ height: "600px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-5 pb-5">Login</Card.Title>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className='mb-5'>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border-0 border-bottom border-secondary rounded-0 form-control"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="position-relative mt-3 mb-4">
                    <Field
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="border-0 border-bottom border-secondary rounded-0 form-control"
                    />
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      style={{ cursor: 'pointer' }}
                      onClick={togglePasswordVisibility}
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Form.Group>
                  {loginError && <Alert variant="danger">{loginError}</Alert>}
                  <Button variant="secondary" type="submit" className="mt-4 w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                  <div className="signup mt-5 mx-4 fs-5">
                    <p>Don't have an account? <a href="#" className='text-decoration-none' onClick={() => navigate('/register')}>Signup</a></p>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Loginpage;
