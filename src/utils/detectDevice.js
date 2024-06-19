// utils/detectDevice.js
export const isDesktop = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check for mobile user agents
  if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return false;
  }
  
  // Check for screen width as a fallback
  return window.innerWidth >= 1024; // Adjust the width as needed
};
