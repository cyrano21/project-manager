'use client';

import { faKey, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './base/Button';
import { Col, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthSocialButtons from './common/AuthSocialButtons';

function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserExists(false);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.termsAccepted) {
        throw new Error('Please accept the terms and conditions');
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.message.includes('already exists')) {
          setUserExists(true);
          return;
        }
        throw new Error(data.message || 'Registration failed');
      }

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/projects'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-body-highlight">Sign Up</h3>
        <p className="text-body-tertiary">Create your account today</p>
      </div>

      <AuthSocialButtons title="Sign up" />

      <div className="position-relative">
        <hr className="bg-body-secondary mt-5 mb-4" />
        <div className="divider-content-center">or use email</div>
      </div>

      <Form onSubmit={handleSubmit}>
        {error && !userExists && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        {userExists && (
          <div className="alert alert-info" role="alert">
            This account already exists.{' '}
            <Link href="/login" className="fw-bold">
              Sign in here
            </Link>
          </div>
        )}

        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="name">Name</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="name"
              name="name"
              type="text"
              className="form-icon-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
            <FontAwesomeIcon icon={faUser} className="text-body fs-9 form-icon" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="username">Username</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="username"
              name="username"
              type="text"
              className="form-icon-input"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="johndoe"
            />
            <FontAwesomeIcon icon={faUser} className="text-body fs-9 form-icon" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <div className="form-icon-container">
            <Form.Control
              id="email"
              name="email"
              type="email"
              className="form-icon-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
            />
            <FontAwesomeIcon icon={faEnvelope} className="text-body fs-9 form-icon" />
          </div>
        </Form.Group>

        <Row className="g-3 mb-3">
          <Col sm={6}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="password">Password</Form.Label>
              <div className="form-icon-container">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  className="form-icon-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
                <FontAwesomeIcon icon={faKey} className="text-body fs-9 form-icon" />
              </div>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="text-start">
              <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
              <div className="form-icon-container">
                <Form.Control
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-icon-input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                />
                <FontAwesomeIcon icon={faKey} className="text-body fs-9 form-icon" />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              id="termsService"
              name="termsAccepted"
              className="form-check-input"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />
            <label htmlFor="termsService" className="fs-9 text-transform-none form-check-label">
              I accept the <Link href="/terms" className="text-primary">terms </Link>
              and <Link href="/privacy" className="text-primary">privacy policy</Link>
            </label>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-100 mb-3"
          type="submit"
          loading={loading}
        >
          Sign Up
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="fs-9 fw-bold"
          >
            Sign in to an existing account
          </Link>
        </div>
      </Form>
    </>
  );
}

export default RegisterForm;