import { z } from "zod";
import { createApiResponseSchema } from "./generic.schema";

export const proposalBaseSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const proposalItemSchema = proposalBaseSchema.extend({
  id: z.number(),
});

// 제안서 목록
export const proposalListSchema = z.array(proposalItemSchema);

// 제안서 요청 스케마
export const proposalRequestSchema = proposalBaseSchema;

// 제안서 응답 스케마
export const proposalFieldsResponseSchema =
  createApiResponseSchema(proposalBaseSchema);

export const getProposalItemResponseSchema =
  createApiResponseSchema(proposalItemSchema);

export const getProposalListResponseSchema =
  createApiResponseSchema(proposalListSchema);

export type ProposalCommonFields = z.infer<typeof proposalBaseSchema>;
export type ProposalItem = z.infer<typeof proposalItemSchema>;
export type ProposalRequest = z.infer<typeof proposalRequestSchema>;
export type ProposalFieldsResponse = z.infer<
  typeof proposalFieldsResponseSchema
>;
export type GetProposalListResponse = z.infer<
  typeof getProposalListResponseSchema
>;
export type GetProposalItemResponse = z.infer<
  typeof getProposalItemResponseSchema
>;
