import type { IReportRepository, UpdateIssueInput } from '@/domain';
export const createUpdateIssue =
  (repo: IReportRepository) => (id: string, input: UpdateIssueInput) =>
    repo.updateIssue(id, input);
