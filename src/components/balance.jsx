import { useQuery } from '@tanstack/react-query';
import {
  PiggyBankIcon,
  TradingDownIcon,
  TradingUpIcon,
  WalletIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import userService from '@/services/user';

import { useAuthContext } from '../contexts/auth';
import BalanceItem from './balance-item';

const Balance = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searchParams.get('from');
      const to = searchParams.get('to');
      return userService.getBalance({ from, to });
    },
  });
  console.log({ data });
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amount={data?.balance}
      />
      <BalanceItem
        label="Ganhos"
        icon={<TradingUpIcon size={16} className="text-primary-green" />}
        amount={data?.earnings}
      />
      <BalanceItem
        label="Gastos"
        icon={<TradingDownIcon size={16} className="text-primary-red" />}
        amount={data?.expenses}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon size={16} className="text-primary-blue" />}
        amount={data?.investments}
      />
    </div>
  );
};

export default Balance;
