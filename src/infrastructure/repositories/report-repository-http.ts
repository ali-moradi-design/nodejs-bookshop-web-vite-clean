import { apiDelete, apiGet, apiPatch, apiPost } from '@/infrastructure/http';
import type { ApiData, ApiMessage } from '@/infrastructure/http';
import type { CreateIssueInput, IReportRepository, IssueReport, UpdateIssueInput } from '@/domain';

export const reportRepositoryHttp: IReportRepository = {
  async listIssues() {
    return (await apiGet<ApiData<IssueReport[]>>('/reports/issues')).data;
  },
  async createIssue(input: CreateIssueInput) {
    return (await apiPost<ApiData<IssueReport>>('/reports/issues', input)).data;
  },
  async updateIssue(id, input: UpdateIssueInput) {
    return (await apiPatch<ApiData<IssueReport>>(`/reports/issues/${id}`, input)).data;
  },
  async deleteIssue(id) {
    await apiDelete<ApiMessage>(`/reports/issues/${id}`);
  },
};
