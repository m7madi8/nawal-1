import LegacyPage from '@/components/LegacyPage';
import EventsPage, { metadata as eventsMetadata } from '../events/page';

export const metadata = {
  ...eventsMetadata,
  title: 'Experiences',
};

export default function ExperiencesPage() {
  return <EventsPage />;
}
