import { useState, useEffect } from 'react';

export const useWebsiteUrl = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');

  useEffect(() => {
    const fetchWebsiteUrl = async () => {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();
        setWebsiteUrl(data.websiteUrl);
      } catch (error) {
        console.error('Error fetching website URL:', error);
        setWebsiteUrl('');
      }
    };

    fetchWebsiteUrl();
  }, []);

  return websiteUrl;
};
