import type { CreateIssueInput, IReportRepository } from '@/domain';
export const createCreateIssue = (repo: IReportRepository) => (input: CreateIssueInput) =>
  repo.createIssue(input);
