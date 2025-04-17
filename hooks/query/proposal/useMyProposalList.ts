'use client';

import { useQuery } from '@tanstack/react-query';
import { proposalURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { proposalListResponseSchema } from '@/schemas/api/proposal.schema';

const useMyProposalList = () => {
  return useQuery({
    queryKey: queryKeys.proposals.mylist(),
    queryFn: async () => {
      const response = await apiClient.get(proposalURL.myList, {
        schema: proposalListResponseSchema,
      });
      return response;
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
  });
};

export default useMyProposalList;
