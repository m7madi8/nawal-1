import LegacyPage from '@/components/LegacyPage';
import {
  ADMIN_INLINE,
  ADMIN_SCRIPTS,
  ADMIN_STYLES,
  renderAdminWorkspace,
} from '@/lib/adminWorkspace';

export function AdminWorkspacePage({ view }) {
  return (
    <LegacyPage
      lang="en"
      dir="ltr"
      bodyClassName="admin-body"
      styles={ADMIN_STYLES}
      scripts={ADMIN_SCRIPTS}
      inlineScripts={[ADMIN_INLINE]}
      html={renderAdminWorkspace(view)}
    />
  );
}
