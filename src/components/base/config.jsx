/**
 * Standardized Component Configuration System
 * 
 * Centralized configuration management for all components
 * Provides consistent defaults and easy customization
 * 
 * @author Techno-ETL Team
 * @version 2.0.0
 */

// Common constants first
const enableSelection = true;
const enableSearch = true;
const enableStats = true;
const enableVirtualization = true;
const enableSuspense = true;
const enableErrorBoundary = true;
const enableSorting = true;
const enableFiltering = true;
const enableActions = true;
const enableCache = true;

const showRefresh = true;
const showAdd = false;
const showEdit = false;
const showDelete = false;
const showSync = false;
const showExport = false;
const showImport = false;
const showSearch = true;
const showFilters = true;
const showSettings = true;
const showDensity = false;
const showColumns = true;
const showViewToggle = false;
const showSelection = true;
const showSyncStocks = false;
const showSyncAll = false;

const virtualizationThreshold = 1000;
const rowBuffer = 3;
const columnBuffer = 2;
const defaultPageSize = 25;
const searchDebounceMs = 300;
const compact = false;
const spacing = 2;
const excel = true;
const csv = true;

// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================

/**
 * Default Grid Configuration
 */
export const DEFAULT_GRID_CONFIG = {
  // Performance settings
  virtualizationThreshold,
  rowBuffer,
  columnBuffer,
  
  // Pagination settings
  defaultPageSize,
  pageSizeOptions: [10, 25, 50, 100],
  
  // Feature flags
  enableSuspense,
  enableErrorBoundary,
  enableVirtualization,
  enableSelection,
  enableSorting,
  enableFiltering,
  enableSearch,
  enableStats,
  enableActions,
  
  // Search configuration
  searchFields: ['name', 'sku', 'code', 'title'],
  searchDebounceMs,
  
  // Cache configuration
  enableCache,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
};

/**
 * Default Toolbar Configuration
 */
export const DEFAULT_TOOLBAR_CONFIG = {
  showRefresh,
  showAdd,
  showEdit,
  showDelete,
  showSync,
  showExport,
  showImport,
  showSearch,
  showFilters,
  showSettings,
  showDensity,
  showColumns,
  showViewToggle,
  showSelection,
  compact,
  size: 'medium',
  spacing,
  exportOptions: {
    excel,
    csv,
    json: true
  }
};

/**
 * Default Dialog Configuration
 */
export const DEFAULT_DIALOG_CONFIG = {
  add: {
    title: 'Add New Item',
    fields: [],
    validationRules: {}
  },
  edit: {
    title: 'Edit Item',
    fields: [],
    validationRules: {}
  },
  delete: {
    title: 'Confirm Delete',
    confirmMessage: 'Are you sure you want to delete this item?'
  }
};

/**
 * Default Stats Configuration
 */
export const DEFAULT_STATS_CONFIG = {
  stats: [
    { key: 'total', title: 'Total', color: 'primary' },
    { key: 'active', title: 'Active', color: 'success' },
    { key: 'inactive', title: 'Inactive', color: 'warning' },
    { key: 'selected', title: 'Selected', color: 'info' }
  ]
};

// ============================================================================
// GRID TYPE CONFIGURATIONS
// ============================================================================

/**
 * Grid type specific configurations
 */
export const GRID_TYPE_CONFIGS = {
  // Magento Products Grid
  magentoProducts: {
    toolbar: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showSync,
      showImport,
      showExport: true
    },
    stats: {
      stats: [
        { key: 'total', title: 'Total Products', color: 'primary' },
        { key: 'active', title: 'Active', color: 'success' },
        { key: 'inactive', title: 'Inactive', color: 'warning' },
        { key: 'localProducts', title: 'Local Products', color: 'info' }
      ]
    },
    searchFields: ['name', 'sku', 'type_id', 'status'],
    enableStats,
    enableVirtualization: true
  },
  
  // Magento Customers Grid
  magentoCustomers: {
    toolbar: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showExport: true
    },
    stats: {
      stats: [
        { key: 'total', title: 'Total Customers', color: 'primary' },
        { key: 'active', title: 'Active', color: 'success' },
        { key: 'inactive', title: 'Inactive', color: 'warning' },
        { key: 'totalOrders', title: 'Total Orders', color: 'info' }
      ]
    },
    searchFields: ['firstname', 'lastname', 'email', 'group_id'],
    enableStats: true
  },
  
  // Magento Orders Grid
  magentoOrders: {
    toolbar: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showExport: true
    },
    stats: {
      stats: [
        { key: 'total', title: 'Total Orders', color: 'primary' },
        { key: 'pending', title: 'Pending', color: 'warning' },
        { key: 'processing', title: 'Processing', color: 'info' },
        { key: 'complete', title: 'Complete', color: 'success' }
      ]
    },
    searchFields: ['increment_id', 'status', 'customer_firstname', 'customer_lastname'],
    enableStats: true
  },
  
  // MDM Products Grid
  mdm: {
    toolbar: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showSync,
      showSyncStocks,
      showSyncAll,
      showAdd,
      showEdit,
      showDelete,
      showExport: true
    },
    stats: {
      stats: [
        { key: 'total', title: 'Total Products', color: 'primary' },
        { key: 'changed', title: 'Changed', color: 'warning' },
        { key: 'synced', title: 'Synced', color: 'success' },
        { key: 'errors', title: 'Errors', color: 'error' }
      ]
    },
    searchFields: ['Code_MDM', 'Designation', 'reference', 'sku'],
    enableStats,
    enableVirtualization,
    defaultPageSize: 50
  },
  
  // CMS Pages Grid
  cmsPages: {
    toolbar: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showExport: true
    },
    stats: {
      stats: [
        { key: 'total', title: 'Total Pages', color: 'primary' },
        { key: 'published', title: 'Published', color: 'success' },
        { key: 'draft', title: 'Draft', color: 'warning' },
        { key: 'disabled', title: 'Disabled', color: 'error' }
      ]
    },
    searchFields: ['title', 'identifier', 'content'],
    enableStats: true
  },
  
  // Generic/Default Grid
  default: {
    toolbar,
    stats,
    searchFields: ['name', 'title', 'code'],
    enableStats: false
  }
};

// ============================================================================
// COMMON ACTION CONFIGURATIONS
// ============================================================================

/**
 * Standard action configurations
 */
export const STANDARD_ACTIONS = {
  refresh: {
    key: 'refresh',
    label: 'Refresh',
    color: 'primary' ,
    variant: 'outlined' 
  },
  add: {
    key: 'add',
    label: 'Add',
    color: 'primary' ,
    variant: 'contained' 
  },
  edit: {
    key: 'edit',
    label: 'Edit',
    color: 'secondary' ,
    variant: 'outlined' ,
    requiresSelection: true
  },
  delete: {
    key: 'delete',
    label: 'Delete',
    color: 'error' ,
    variant: 'outlined' ,
    requiresSelection: true
  },
  sync: {
    key: 'sync',
    label: 'Sync',
    color: 'info' ,
    variant: 'outlined' 
  },
  export: {
    key: 'export',
    label: 'Export',
    color: 'success' ,
    variant: 'outlined' 
  },
  import: {
    key: 'import',
    label: 'Import',
    color: 'warning' ,
    variant: 'outlined' 
  }
};

/**
 * Grid type specific custom actions
 */
export const GRID_CUSTOM_ACTIONS = {
  magentoProducts: [
    STANDARD_ACTIONS.sync,
    {
      key: 'importCsv',
      label: 'Import CSV',
      color: 'warning' ,
      variant: 'outlined' 
    },
    {
      key: 'bulkMediaUpload',
      label: 'Bulk Media Upload',
      color: 'info' ,
      variant: 'outlined' 
    },
    {
      key: 'catalogProcessor',
      label: 'Catalog Processor',
      color: 'secondary' ,
      variant: 'outlined' 
    }
  ],
  
  mdm: [
    {
      key: 'syncSelected',
      label: 'Sync Selected',
      color: 'primary' ,
      variant: 'contained' ,
      requiresSelection: true
    },
    {
      key: 'syncStocks',
      label: 'Sync Stocks',
      color: 'info' ,
      variant: 'outlined' 
    },
    {
      key: 'syncAll',
      label: 'Sync All',
      color: 'warning' ,
      variant: 'outlined' 
    }
  ],
  
  magentoCustomers: [
    STANDARD_ACTIONS.export,
    {
      key: 'newsletter',
      label: 'Newsletter Signup',
      color: 'info' ,
      variant: 'outlined' ,
      requiresSelection: true
    }
  ]
};

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Grid preset configurations
 */
export const GRID_PRESETS = {
  crud: {
    enableSelection,
    enableSearch,
    enableStats,
    toolbarConfig: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showExport: true
    }
  },
  
  readonly: {
    enableSelection,
    enableSearch,
    enableStats,
    toolbarConfig: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showExport: true
    }
  },
  
  simple: {
    enableSelection,
    enableSearch,
    enableStats,
    toolbarConfig: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showExport,
      showSearch,
      showFilters: false
    }
  },
  
  management: {
    enableSelection,
    enableSearch,
    enableStats,
    enableVirtualization,
    toolbarConfig: {
      ...DEFAULT_TOOLBAR_CONFIG,
      showAdd,
      showEdit,
      showDelete,
      showSync,
      showExport,
      showImport: true
    }
  }
};

// ============================================================================
// CONFIGURATION UTILITIES
// ============================================================================

/**
 * Get configuration for a specific grid type
 */
export const getGridConfig = (gridType = 'default') => {
  return GRID_TYPE_CONFIGS[gridType] || GRID_TYPE_CONFIGS.default;
};

/**
 * Merge configurations with deep merge support
 */
export const mergeConfigs = (base, override) => {
  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      merged[key] = mergeConfigs(merged[key] || {}, value);
    } else {
      merged[key] = value;
    }
  }
  
  return merged;
};

/**
 * Apply preset configuration with overrides
 */
export const applyGridPreset = (preset, overrides = {}) => {
  const presetConfig = GRID_PRESETS[preset] || GRID_PRESETS.crud;
  return mergeConfigs(presetConfig, overrides);
};

/**
 * Get toolbar configuration for grid type
 */
export const getToolbarConfig = (gridType = 'default', overrides = {}) => {
  const gridConfig = getGridConfig(gridType);
  return mergeConfigs(gridConfig.toolbar, overrides);
};

/**
 * Get stats configuration for grid type
 */
export const getStatsConfig = (gridType = 'default', overrides = {}) => {
  const gridConfig = getGridConfig(gridType);
  return mergeConfigs(gridConfig.stats, overrides);
};

/**
 * Get custom actions for grid type
 */
export const getCustomActions = (gridType = 'default') => {
  return GRID_CUSTOM_ACTIONS[gridType] || [];
};

/**
 * Create complete grid configuration
 */
export const createGridConfiguration = (gridType, preset, overrides = {}) => {
  // Start with grid type configuration
  const typeConfig = getGridConfig(gridType);
  
  // Apply preset if specified
  let config = typeConfig;
  if (preset) {
    const presetConfig = applyGridPreset(preset);
    config = mergeConfigs(config, presetConfig);
  }
  
  // Apply custom overrides
  config = mergeConfigs(config, overrides);
  
  // Add custom actions
  const customActions = getCustomActions(gridType);
  return {
    ...config,
    customActions: [...customActions, ...(overrides.customActions || [])]
  };
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
  DEFAULT_GRID_CONFIG,
  DEFAULT_TOOLBAR_CONFIG,
  DEFAULT_DIALOG_CONFIG,
  DEFAULT_STATS_CONFIG,
  GRID_TYPE_CONFIGS,
  STANDARD_ACTIONS,
  GRID_CUSTOM_ACTIONS,
  GRID_PRESETS,
  getGridConfig,
  mergeConfigs,
  applyGridPreset,
  getToolbarConfig,
  getStatsConfig,
  getCustomActions,
  createGridConfiguration
};