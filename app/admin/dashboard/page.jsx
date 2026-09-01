import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Overview | Nawal Admin',
};

export default function Page() {
  redirect('/admin/overview');
}
