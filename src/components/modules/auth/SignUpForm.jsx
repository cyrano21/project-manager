'use client';

import Button from '@/components/base/Button';
import AuthSocialButtons from '@/components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignUpForm = ({ layout = 'split' }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
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
      <div className="position-relative mt-4">
        <hr className="bg-body-secondary" />
        <div className="divider-content-center">or use email</div>
      </div>
      <Form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Row className="g-3 mb-3">
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Check type="checkbox" className="mb-3">
          <Form.Check.Input
            type="checkbox"
            name="termsAccepted"
            id="termsService"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
          />
          <Form.Check.Label
            htmlFor="termsService"
            className="fs-9 text-transform-none"
          >
            I accept the <Link href="#!">terms </Link>and{' '}
            <Link href="#!">privacy policy</Link>
          </Form.Check.Label>
        </Form.Check>
        <Button
          variant="primary"
          type="submit"
          className="w-100 mb-3"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
        <div className="text-center">
          <Link
            href="/auth/split/sign-in"
            className="fs-9 fw-bold"
          >
            Sign in to an existing account
          </Link>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;