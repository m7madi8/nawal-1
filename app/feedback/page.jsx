import FeedbackFormPage from '@/components/FeedbackFormPage';
import { renderFeedbackHub } from '@/lib/feedbackConfig';

export const metadata = {
  title: 'روابط التقييم | Nawal Yoga',
  description: 'صفحات تقييم الريتريتات والفعاليات — Nawal Yoga',
};

export default function Page() {
  return <FeedbackFormPage html={renderFeedbackHub()} />;
}
