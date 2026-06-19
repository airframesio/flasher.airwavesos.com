export const GA_TRACKING_ID = 'G-ZJPSH6XWCR';

const ready = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const pageview = (url) => {
  if (!ready()) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  if (!ready()) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
