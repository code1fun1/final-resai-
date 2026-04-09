import LanguageDetector from 'i18next-browser-languagedetector';

class CustomLanguageDetector extends LanguageDetector {
  constructor(services, options = {}) {
    super(services, options);
  }

  detect() {
    const pathSegments = window.location.pathname.split('/');
    // Assuming language is the first segment of the URL
    const language = pathSegments[1] || 'en'; // Default to 'en' if no language is specified
    return language;
  }
}

export default CustomLanguageDetector;
