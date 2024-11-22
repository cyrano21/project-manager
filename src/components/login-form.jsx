'use client';

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './base/Button';
import { Col, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthSocialButtons from './common/AuthSocialButtons';

const LoginForm = ({ layout = 'default' }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/home');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-body-highlight">Sign In</h3>
        <p className="text-body-tertiary">Get access to your account</p>
      </div>

      <AuthSocialButtons title="Sign in" />

      <div className="position-relative">
        <hr className="bg-body-secondary mt-5 mb-4" />
        <div className="divider-content-center">or use email</div>
      </div>

      <Form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="email"
              name="email"
              type="email"
              className="form-icon-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon icon={faUser} className="text-body fs-9 form-icon" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="password">Password</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="password"
              name="password"
              type="password"
              className="form-icon-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <FontAwesomeIcon icon={faKey} className="text-body fs-9 form-icon" />
          </div>
        </Form.Group>

        <Row className="flex-between-center mb-7">
          <Col xs="auto">
            <Form.Check type="checkbox" className="mb-0">
              <Form.Check.Input
                type="checkbox"
                name="rememberMe"
                id="remember-me"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <Form.Check.Label htmlFor="remember-me" className="mb-0">
                Remember me
              </Form.Check.Label>
            </Form.Check>
          </Col>
          <Col xs="auto">
            <Link
              href={`/auth/${layout}/forgot-password`}
              className="fs-9 fw-semibold"
            >
              Forgot Password?
            </Link>
          </Col>
        </Row>

        <Button
          variant="primary"
          className="w-100 mb-3"
          type="submit"
          loading={loading}
        >
          Sign In
        </Button>

        <div className="text-center">
          <Link
            href={`/auth/${layout}/register`}
            className="fs-9 fw-bold"
          >
            Create an account
          </Link>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;