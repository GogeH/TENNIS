export const scrollToElementByHash = (hash: string, duration = 1): void => {
  if (!hash) {
    return;
  }
  const container = document.querySelector(`[data-id=${hash}]`);
  if (container) {
    container.scrollIntoView(duration !== 0 && { behavior: 'smooth' });
  }
};
