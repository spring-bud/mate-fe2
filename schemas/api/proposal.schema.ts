import { z } from "zod";
import { createApiResponseSchema } from "./generic.schema";

export const proposalCommonFieldsSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const proposalItemSchema = proposalCommonFieldsSchema.extend({
  id: z.number(),
});

// 제안서 목록
export const proposalListSchema = z.array(proposalItemSchema);

export const proposalRequestSchema = proposalCommonFieldsSchema;

export const proposalFieldsResponseSchema = createApiResponseSchema(
  proposalCommonFieldsSchema
);

export const getProposalItemResponseSchema =
  createApiResponseSchema(proposalItemSchema);

export const getProposalListResponseSchema =
  createApiResponseSchema(proposalListSchema);

export type ProposalCommonFields = z.infer<typeof proposalCommonFieldsSchema>;
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
