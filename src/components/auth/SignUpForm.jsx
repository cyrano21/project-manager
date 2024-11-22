'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/common/Logo';
import AuthSocialButtons from '@/components/common/AuthSocialButtons';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    router.push('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="auth-form">
      <div className="text-center mb-7">
        <Logo width={58} />
        <h3 className="mt-3">Sign Up</h3>
        <p className="text-muted">Create your account today</p>
      </div>

      <AuthSocialButtons />

      <div className="divider">
        <span>or use email</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            className="form-check-input"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="terms">
            I accept the <Link href="/terms">terms</Link> and{' '}
            <Link href="/privacy">privacy policy</Link>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>

        <div className="text-center mt-3">
          <Link href="/auth/split/sign-in" className="text-muted">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}