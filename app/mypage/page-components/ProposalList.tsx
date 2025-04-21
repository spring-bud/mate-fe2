'use client';

import React, { useState } from 'react';
import useMyProposalList from '@/hooks/query/proposal/useMyProposalList';
import useProposalMutation from '@/hooks/mutation/useProposal';
import ProposalForm from './form/ProposalForm';
import ProposalModal from './ProposalModal';

const ProposalList = () => {
  const { data: proposals, isLoading, error } = useMyProposalList();
  const [showForm, setShowForm] = useState(false);
  const [editingProposal, setEditingProposal] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);
  const { deleteProposal } = useProposalMutation();
  const [viewingProposalId, setViewingProposalId] = useState<number | null>(
    null
  );

  if (isLoading) {
    return <div className='text-textLight'>제안서 목록을 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className='text-error'>
        제안서 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const handleDeleteProposal = async (proposalId: number) => {
    if (window.confirm('정말 이 제안서를 삭제하시겠습니까?')) {
      try {
        await deleteProposal.mutateAsync(proposalId.toString());
      } catch (error) {
        console.error('제안서 삭제 중 오류:', error);
      }
    }
  };

  const handleEditProposal = (proposal: {
    id: number;
    title: string;
    description: string;
  }) => {
    setEditingProposal(proposal);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProposal(null);
  };

  const handleViewProposal = (proposalId: number) => {
    setViewingProposalId(proposalId);
  };

  const handleCloseModal = () => {
    setViewingProposalId(null);
  };

  return (
    <div className='space-y-6'>
      {showForm ? (
        <ProposalForm
          onClose={handleCloseForm}
          editMode={!!editingProposal}
          initialData={editingProposal || undefined}
        />
      ) : (
        <>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='typo-head2 text-textLight'>내 제안서 목록</h2>
            <button
              onClick={() => setShowForm(true)}
              className='px-4 py-2 bg-active text-white rounded'
            >
              새 제안서 작성
            </button>
          </div>

          {proposals && proposals.length > 0 ? (
            <div className='bg-bgLight rounded-lg border border-border overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-bgDark border-b border-border'>
                    <tr>
                      <th className='py-3 px-4 text-left typo-body2 text-textLight'>
                        제목
                      </th>
                      <th className='py-3 px-4 text-right typo-body2 text-textLight w-48'>
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals &&
                      proposals.map(
                        (proposal: {
                          id: number;
                          title: string;
                          description: string;
                        }) => (
                          <tr
                            key={proposal.id}
                            className='border-b border-border hover:bg-hover'
                          >
                            <td className='py-3 px-4 text-textLight'>
                              <button
                                onClick={() => handleViewProposal(proposal.id)}
                                className='text-textLight hover:text-active text-left w-full transition-colors focus:outline-none focus:text-active'
                              >
                                {proposal.title}
                              </button>
                            </td>
                            <td className='py-3 px-4 text-right'>
                              <div className='flex justify-end gap-2'>
                                <button
                                  onClick={() => handleEditProposal(proposal)}
                                  className='px-3 py-1 bg-selection text-textLight rounded text-sm'
                                >
                                  수정
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProposal(proposal.id)
                                  }
                                  className='px-3 py-1 bg-error bg-opacity-80 text-white rounded text-sm'
                                >
                                  삭제
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className='bg-bgLight p-8 rounded-lg border border-border text-center'>
              <p className='text-textDim mb-4'>
                아직 작성한 제안서가 없습니다.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className='px-4 py-2 bg-active text-white rounded'
              >
                첫 제안서 작성하기
              </button>
            </div>
          )}
        </>
      )}
      {viewingProposalId && (
        <ProposalModal
          proposalId={viewingProposalId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProposalList;
