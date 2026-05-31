let initialized = false;

export const loadGoogleAnalytics = () => {
  const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  if (initialized || !GA_ID) return;

  initialized = true;

  // Load gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  document.head.appendChild(script);

  // Init script
  const inlineScript = document.createElement("script");

  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', '${GA_ID}', {
      page_path: window.location.pathname,
    });
  `;

  document.head.appendChild(inlineScript);
};
