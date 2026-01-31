import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.body.scrollTop = 0;
    const root = document.getElementById('root');
    if (root) root.scrollTop = 0;
  }, [pathname]);
  return null;
} 










