
'use client';

import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/auth.css';

const AuthSplitLayout = dynamic(() => import('@/layouts/AuthSplitLayout'), {
  ssr: false
});

const LoginForm = dynamic(() => import('@/components/login-form'), {
  ssr: false
});

export default function LoginPage() {
  return (
    <AuthSplitLayout bg="assets/img/bg/32.png">
      <LoginForm layout="split" />
    </AuthSplitLayout>
  );
}