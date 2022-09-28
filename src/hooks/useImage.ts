import { useEffect, useState } from 'react';

const defaultState = { image: undefined, status: 'loading' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useImage = (url: string, crossOrigin = ''): any => {
  const res = useState(defaultState);
  const { image } = res[0];
  const { status } = res[0];

  const setState = res[1];

  useEffect(() => {
    if (!url) {
      return;
    }
    const img = document.createElement('img');

    function onload() {
      setState({ image: img, status: 'loaded' });
    }

    function onerror() {
      setState({ image: undefined, status: 'failed' });
    }

    img.addEventListener('load', onload);
    img.addEventListener('error', onerror);
    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }
    img.src = url;

    // eslint-disable-next-line consistent-return
    return () => {
      img.removeEventListener('load', onload);
      img.removeEventListener('error', onerror);
      setState(defaultState);
    };
  }, [url, crossOrigin, setState]);
  return [image, status];
};
