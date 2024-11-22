'use client';

import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import SignUpForm from '@/components/modules/auth/SignUpForm';
import bg from '@/assets/img/bg/32.png';

const SignUp = () => {
  return (
    <AuthSplitLayout bg={bg}>
      <SignUpForm layout="split" />
    </AuthSplitLayout>
  );
};

export default SignUp;