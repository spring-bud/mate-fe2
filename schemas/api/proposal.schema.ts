import { z } from 'zod';

// 제안서 조회 응답
export const proposalResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

// 제안서 생성 요청
export const proposalCreateRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// 제안서 생성 응답
export const proposalCreateResponseSchema = proposalResponseSchema;

// 제안서 수정 요청
export const proposalUpdateRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// 제안서 수정 응답
export const proposalUpdateResponseSchema = proposalResponseSchema;

export type ProposalResponse = z.infer<typeof proposalResponseSchema>;
export type ProposalCreateRequest = z.infer<typeof proposalCreateRequestSchema>;
export type ProposalCreateResponse = z.infer<
  typeof proposalCreateResponseSchema
>;
export type ProposalUpdateRequest = z.infer<typeof proposalUpdateRequestSchema>;
export type ProposalUpdateResponse = z.infer<
  typeof proposalUpdateResponseSchema
>;
