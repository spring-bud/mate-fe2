'use client';

import { useQuery } from '@tanstack/react-query';
import { proposalURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { proposalResponseSchema } from '@/schemas/api/proposal.schema';

const useProposalDetail = (proposalId: string) => {
  return useQuery({
    queryKey: queryKeys.proposals.detail(proposalId),
    queryFn: async () => {
      const response = await apiClient.get(proposalURL.byId(proposalId), {
        schema: proposalResponseSchema,
      });
      return response;
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
  });
};

export default useProposalDetail;
