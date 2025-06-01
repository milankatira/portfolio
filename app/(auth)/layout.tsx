import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      {children}
    </div>
  );
};

export default Layout;
