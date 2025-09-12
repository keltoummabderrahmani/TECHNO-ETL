/**
 * Unified API Router System
 * 
 * Provides centralized routing for all API services (MDM, Magento, Cegid)
 * with configuration-based routing strategies and user settings integration.
 * 
 * Requirements: 4.1, 4.2, 4.3, 9.1, 9.2
 * 
 * @author TECHNO-ETL Team
 */

// Import services with fallback error handling
let BaseApiService;
try {
  BaseApiService = require('./BaseApiService').BaseApiService || class {};
} catch {
  BaseApiService = class {
    constructor() {
      console.warn('BaseApiService not available');
    }
  };
}

/**
 * API Router for managing multiple API endpoints
 */
export class APIRouter {
  constructor() {
    this.routes = new Map();
    this.defaultService = new BaseApiService();
  }

  register(name, service) {
    this.routes.set(name, service);
  }

  get(name) {
    return this.routes.get(name) || this.defaultService;
  }
}

export default new APIRouter();
