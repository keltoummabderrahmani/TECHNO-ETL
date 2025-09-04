import { ReactNode, MouseEvent } from 'react';
import BaseGrid from './BaseGrid';
import BaseToolbar from './BaseToolbar';
import BaseDialog from './BaseDialog';
import BaseCard from './BaseCard';
import { SxProps, Theme } from '@mui/material/styles';
import { GridColDef, GridRowSelectionModel, GridSortModel, GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';

/**
 * TypeScript Interface Definitions for Base Components
 * 
 * Comprehensive type definitions for all base components
 * Enables type safety and better developer experience
 * 
 * @author Techno-ETL Team
 * @version 2.0.0
 */


// ============================================================================
// COMMON TYPES
// ============================================================================





export 

export 

export 

// ============================================================================
// BASE GRID TYPES
// ============================================================================

export interface GridColumnConfig extends GridColDef {
  visible?: boolean;
  exportable?: boolean;
  searchable?: boolean;
}

export ;
}

export ;
  edit?: {
    title?: string;
    fields?: FormField[];
    validationRules?: ValidationRules;
  };
  delete?: {
    title?: string;
    confirmMessage?: string;
  };
}

export >;
}

export 

export interface BaseGridProps extends BaseComponentProps {
  // Core props
  gridName: string;
  columns?: GridColumnConfig[];
  data?: any[];
  loading?: boolean;
  error?: Error | null;
  
  // API props
  apiService?: ApiService;
  apiEndpoint?: string;
  apiParams?: Record;
  
  // Feature toggles
  enableSuspense?: boolean;
  enableErrorBoundary?: boolean;
  enableVirtualization?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableSearch?: boolean;
  enableStats?: boolean;
  enableActions?: boolean;
  
  // Configuration
  toolbarConfig?: GridToolbarConfig;
  dialogConfig?: GridDialogConfig;
  statsConfig?: GridStatsConfig;
  customActions?: CustomAction[];
  
  // Data handling
  searchFields?: string[];
  getRowId?: (row, => string | number;
  
  // Event handlers
  onRefresh?: () => void;
  onAdd?: () => void;
  onEdit?: (record, => void;
  onDelete?: (records, => void;
  onSearch?: (query, => void;
  onSelectionChange?: (selection, => void;
  onError?: (error, => void;
}

// ============================================================================
// BASE TOOLBAR TYPES
// ============================================================================

export interface BaseToolbarProps extends BaseComponentProps {
  // Core props
  searchId?: string;
  config?: GridToolbarConfig;
  customActions?: CustomAction[];
  
  // State props
  selectedCount?: number;
  searchQuery?: string;
  loading?: boolean;
  
  // Feature toggles
  enableSearch?: boolean;
  enableActions?: boolean;
  enableResponsive?: boolean;
  
  // Event handlers
  onSearchChange?: (query, => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSync?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onCustomAction?: (key, action, => void;
  
  // Style props
  size?: SizeVariant;
  variant?: 'standard' | 'dense';
  spacing?: number;
}

// ============================================================================
// BASE DIALOG TYPES
// ============================================================================



export 

export 

export 

export interface BaseDialogProps extends BaseComponentProps {
  // Core props
  type?: DialogType;
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data, type, => Promise;
  
  // Content props
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  data?: Record;
  
  // Configuration
  config?: {
    title?: string;
    icon?: ReactNode;
    submitLabel?: string;
    submitColor?: ColorVariant;
    submitVariant?: ButtonVariant;
    dangerous?: boolean;
  };
  fields?: FormField[];
  validationRules?: ValidationRules;
  
  // State props
  loading?: boolean;
  error?: string | null;
  
  // Style props
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disableEscapeKeyDown?: boolean;
}

// ============================================================================
// BASE CARD TYPES
// ============================================================================





export 

export interface BaseCardProps extends BaseComponentProps {
  // Core props
  variant?: CardVariant;
  type?: InfoType;
  
  // Content props
  title?: string;
  value?: string | number;
  subtitle?: string;
  content?: ReactNode;
  icon?: ReactNode;
  
  // Stats props (for multiple stat cards)
  stats?: GridStats;
  config?: GridStatsConfig;
  
  // State props
  loading?: boolean;
  
  // Style props
  color?: ColorVariant;
  
  // Event props
  onClick?: (event, => void;
  onDismiss?: () => void;
  
  // Advanced props
  trend?: TrendType;
  percentage?: number;
  progress?: ProgressConfig;
  actions?: ReactNode;
  dismissible?: boolean;
}

// ============================================================================
// COMPONENT CONFIGURATION TYPES
// ============================================================================

export 

export 

export interface ComponentFactory {
  create: (config?: Partial) => T;
  applyPreset: (preset, overrides?: Partial) => T;
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export 

export 

export 

// ============================================================================
// EVENT HANDLER TYPES
// ============================================================================




export 

// ============================================================================
// UTILITY TYPES
// ============================================================================


};





// ============================================================================
// TYPE RE-EXPORTS
// ============================================================================

// Types are exported individually above
// When using these types, import them directly:
// import { BaseGridProps, BaseToolbarProps } from './types';

// For namespace imports:
// import type *  from './types';