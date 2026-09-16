import type { CreateIssueInput, IssueReport, UpdateIssueInput } from '../entities';

export interface IReportRepository {
  listIssues(): Promise<IssueReport[]>;
  createIssue(input: CreateIssueInput): Promise<IssueReport>;
  updateIssue(id: string, input: UpdateIssueInput): Promise<IssueReport>;
  deleteIssue(id: string): Promise<void>;
}
