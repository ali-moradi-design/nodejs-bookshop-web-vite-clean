import type { IReportRepository } from '@/domain';
export const createDeleteIssue = (repo: IReportRepository) => (id: string) => repo.deleteIssue(id);
