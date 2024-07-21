import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
});

function Registerpage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleRegistration = async (values, actions) => {
    try {
      const user ={
        UserName:values.name,
        Email:values.email,
        Password:values.password
      }
      const res = await axios.post("/api/signup",user);
      console.log(res.data,"Response");

      actions.resetForm();
      setRegistrationError('');
      navigate('/login'); // Redirect to login page after successful registration

    } catch (error) {
      setRegistrationError('Registration failed. Please try again.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Card className="p-4 shadow p-3 mb-5 bg-body-tertiary rounded" style={{ height: "600px" }}>
            <Card.Body>
              <Card.Title className="text-center mb-5 pb-5">Register</Card.Title>
              <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={RegistrationSchema}
                onSubmit={handleRegistration}
              >
                {({ handleSubmit, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className='mb-3'>
                      <Field                        
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="border-0 border-bottom border-secondary rounded-0 form-control"
                      />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className='mb-3'>
                      <Field                      
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border-0 border-bottom border-secondary rounded-0 form-control"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="position-relative mb-4">
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
                    {registrationError && <Alert variant="danger">{registrationError}</Alert>}
                    <Button variant="secondary" type="submit" className="mt-4 w-100" disabled={isSubmitting}>
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
