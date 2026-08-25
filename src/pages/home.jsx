import { PlusIcon } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import DateSelection from '@/components/ui/date-selection';
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
      <div className="p-8">
        {/*Topo */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <Button>
              <PlusIcon />
              Nova Transação
            </Button>
            {/*Seletor data e botao nova transação */}
          </div>
        </div>
        {/*Gráficos etc */}
      </div>
    </>
  );
};

export default HomePage;
