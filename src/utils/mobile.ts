export function supportsWebShare() {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

export function isIOSSafari() {
  if (typeof navigator === 'undefined') return false;
  return /iP(ad|hone|od)/.test(navigator.platform) && /Safari/.test(navigator.userAgent);
}

export const canUseCreateImageBitmap = () => 'createImageBitmap' in window;
