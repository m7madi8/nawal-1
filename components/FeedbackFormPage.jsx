'use client';

import LegacyPage from '@/components/LegacyPage';
import {
  FEEDBACK_SCRIPT,
  FEEDBACK_STYLES,
  FEEDBACK_SUPABASE_INLINE,
  renderFeedbackConfigScript,
  renderStandardFeedbackForm,
} from '@/lib/feedbackConfig';

export default function FeedbackFormPage({ config, html, inlineScripts = [] }) {
  const configScript = renderFeedbackConfigScript(config);

  return (
    <LegacyPage
      lang="ar"
      dir="rtl"
      bodyClassName="ny-site"
      styles={FEEDBACK_STYLES}
      scripts={config ? [FEEDBACK_SCRIPT] : []}
      inlineScripts={[FEEDBACK_SUPABASE_INLINE, configScript, ...inlineScripts].filter(Boolean)}
      html={html}
      currentNav=""
    />
  );
}
