import { PlusIcon } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import Balance from '@/components/ui/balance';
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
      <div className="space-y-6 p-8">
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
        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
      </div>
    </>
  );
};

export default HomePage;
