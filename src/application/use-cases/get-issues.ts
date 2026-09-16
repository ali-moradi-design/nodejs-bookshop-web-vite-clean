import type { IReportRepository } from '@/domain';
export const createGetIssues = (repo: IReportRepository) => () => repo.listIssues();
