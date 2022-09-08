import { Dispatch, SetStateAction, useState } from 'react';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { filterByTreatment } from '../utils';
import { queryKeys } from '../../../react-query/constants';
import { useQuery } from 'react-query';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  const fallback = [];
  // TODO: get data from server via useQuery
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff);

  return { staff, filter, setFilter };
}
