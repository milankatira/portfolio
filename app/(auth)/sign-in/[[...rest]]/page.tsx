'use client';

import { SignIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <>
      <SignIn
        signUpUrl='/sign-up'
        fallbackRedirectUrl='/welcome'
        forceRedirectUrl='/welcome'
      />
    </>
  );
};

export default Page;
