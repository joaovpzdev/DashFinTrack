import { useQueryClient } from '@tanstack/react-query';
import { addMonths } from 'date-fns';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../contexts/auth';
import DatePickerWithRange from './date-picker-with-range';

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd');

const DateSelection = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  });
  //sempre que o state 'date' mudar, preciso que isso seja persistido na URL
  useEffect(() => {
    if (!date?.from || !date?.to) return;
    const queryParams = new URLSearchParams();
    queryParams.set('from', formatDateToQueryParam(date.from));
    queryParams.set('to', formatDateToQueryParam(date.to));
    navigate(`?${queryParams.toString()}`);
    queryClient.invalidateQueries({
      queryKey: ['balance', user.id],
    });
  }, [navigate, date, queryClient, user.id]);
  //quando eu recarregar a pag, eu pegarei o from e o to da URL e setarei no state 'date'
  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
