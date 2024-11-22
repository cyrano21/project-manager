'use client';

import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <AuthSplitLayout bg="/assets/img/bg/32.png">
      <div className="auth-container">
        <div className="auth-content">
          <SignUpForm />
        </div>
      </div>
    </AuthSplitLayout>
  );
}