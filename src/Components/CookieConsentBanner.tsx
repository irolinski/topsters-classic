import { CookieConsent } from "cookie-consent-react";
import { loadGoogleAnalytics } from "./../analytics/google-analytics.ts";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_STORAGE_KEY = "topstersClassic_cookie_consent";

export default function CookieConsentBanner(appModalState: {
  appModalState: boolean;
}) {
  const [cookieConsentBannerIsOpened, setCookieConsentBannerIsOpened] =
    useState(false);

  useEffect(() => {
    const savedCookieConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (savedCookieConsent === null) {
      setCookieConsentBannerIsOpened(true);
    }
  }, [appModalState]);

  const handleLoadAnalyticsTags = () => {
    loadGoogleAnalytics();
    console.log("Google Analytics tags have been appended.");

    if (cookieConsentBannerIsOpened === true) {
      setCookieConsentBannerIsOpened(false);
    }
  };

  return (
    <CookieConsent
      mode="banner"
      handlerFunctions={[
        { category: "analytics", function: handleLoadAnalyticsTags },
      ]}
      customColors={{ primary: "#3f6d3b" }}
      language="pl"
      customStorageKey={COOKIE_CONSENT_STORAGE_KEY}
      componentIsOpen={cookieConsentBannerIsOpened}
    />
  );
}
