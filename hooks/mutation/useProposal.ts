import { useMutation, useQueryClient } from '@tanstack/react-query';
import { proposalURL } from '@/service/endpoints/endpoints';
import { apiClient } from '@/utils/api/api';
import {
  ProposalCreateRequest,
  proposalResponseSchema,
  ProposalUpdateRequest,
} from '@/schemas/api/proposal.schema';
import { queryKeys } from '@/lib/react-query/queryKeys';

const useProposalMutation = () => {
  const queryClient = useQueryClient();

  const createProposal = useMutation({
    mutationFn: async (proposalData: ProposalCreateRequest) => {
      const response = await apiClient.post(proposalURL.create, {
        params: proposalData,
        schema: proposalResponseSchema,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proposals.mylist() });
    },
  });

  const updateProposal = useMutation({
    mutationFn: async ({
      id,
      ...proposalData
    }: ProposalUpdateRequest & { id: number }) => {
      const response = await apiClient.patch(
        proposalURL.update(id.toString()),
        {
          params: proposalData,
          schema: proposalResponseSchema,
        }
      );
      return response;
    },
    onSuccess: () => {
      console.log('제안서 생성 성공, 쿼리 무효화 시작');
      queryClient.invalidateQueries({ queryKey: queryKeys.proposals.mylist() });
    },
  });

  const deleteProposal = useMutation({
    mutationFn: async (proposalId: string) => {
      const response = await apiClient.delete(proposalURL.delete(proposalId));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.proposals.mylist() });
    },
  });

  return {
    createProposal,
    updateProposal,
    deleteProposal,
  };
};

export default useProposalMutation;
