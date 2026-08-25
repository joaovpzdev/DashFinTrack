import { Navigate } from 'react-router-dom';

import Header from '@/components/ui/header';

import { useAuthContext } from '../contexts/auth';

const HomePage = () => {
  const { user, isInitializing } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      <div className='flex justify-between items-center'>
        <h2>Dashboard</h2>
        <div>
          
        </div>
      </div>
    </>
  );
};

export default HomePage;
