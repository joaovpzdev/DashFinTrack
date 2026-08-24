import { Navigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useAuthContext } from '../contexts/auth';

const HomePage = () => {
  const { user, isInitializing, signOut } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1> Seja bem-vindo {user.firstName}!</h1>
      <Button onClick={signOut}>Sair</Button>
    </>
  );
};

export default HomePage;
