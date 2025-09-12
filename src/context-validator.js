
/**
 * React Context Validator
 * Validates React context availability in dev mode
 */

// Check if React is available globally or try importing it
const getReact = () => {
  if (typeof React !== 'undefined') {
    return React;
  }
  try {
    // eslint-disable-next-line no-undef
    return require('react');
  } catch (error) {
    console.warn('React not available for context validation');
    return null;
  }
};

export const validateReactContext = () => {
  if (process.env.NODE_ENV === 'development') {
    const React = getReact();
    if (!React) {
      console.error('🚨 React is not available globally');
      return false;
    }
    
    if (!React.createContext) {
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
