import { useTranslation } from 'react-i18next';
import { ReportIssueForm } from '@/presentation/components/reports/report-issue-form';

export function ReportIssuePage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('nav.report')}</h1>
      <ReportIssueForm />
    </div>
  );
}
