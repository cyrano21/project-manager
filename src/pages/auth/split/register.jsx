'use client';

import dynamic from 'next/dynamic';
import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import '@/styles/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = dynamic(() => import('@/components/register-form'), {
  ssr: false
});

export default function RegisterPage() {
  return (
    <AuthSplitLayout bg="/assets/img/bg/30.png">
      <RegisterForm />
    </AuthSplitLayout>
  );
}