
/**
 * React Context Validator
 * Validates React context availability in dev mode
 */

export const validateReactContext = () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof React === 'undefined') {
      console.error('🚨 React is not available globally');
      return false;
    }
    
    if (!function createContext() { return {}; } // React.createContext) {
      console.error('🚨 React.createContext is not available');
      return false;
    }
    
    console.log('✅ React context system is available');
    return true;
  }
  
  return true;
};

// Auto-validate in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    validateReactContext();
  }, 100);
}
