import React, { useEffect } from 'react';

/**
 * Simply redirects the user to the translated page
 */
const IndexPage = () => {
  useEffect(() => {
    import('detect-browser-language').then(({ default: detectBrowserLang }) => {
      const lang = detectBrowserLang();
      if (lang.includes("de")) window.location.replace("/de/");
      else if (lang.includes("en")) window.location.replace("/en/");
      else window.location.replace("/en/");
    });
  }, []);

  return null;
}

export default IndexPage;
