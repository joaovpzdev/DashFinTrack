import { Navigate } from 'react-router-dom';

import Header from '@/components/ui/header';

import { useAuthContext } from '../contexts/auth';

const HomePage = () => {
  const { user, isInitializing, signOut } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
    </>
  );
};

export default HomePage;
