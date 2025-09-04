/**
 * Base Component Types and Prop Definitions
 * 
 * Common types and prop definitions for all base components
 * Enables type safety and better developer experience
 * 
 * @author Techno-ETL Team
 * @version 2.0.0
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export const SizeVariant = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

export const ColorVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const ButtonVariant = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
  TEXT: 'text'
};

// ============================================================================
// BASE GRID TYPES
// ============================================================================

export const GridToolbarConfig = {
  showRefresh: true,
  showAdd: false,
  showEdit: false,
  showDelete: false,
  showSync: false,
  showExport: false,
  showImport: false,
  enableSearch: true,
  enableActions: true,
  enableResponsive: true,
  size: 'medium',
  spacing: 1
};

export const GridDialogConfig = {
  add: {
    title: 'Add New Record',
    fields: [],
    validationRules: {}
  },
  edit: {
    title: 'Edit Record',
    fields: [],
    validationRules: {}
  },
  delete: {
    title: 'Delete Record',
    confirmMessage: 'Are you sure you want to delete this record?'
  }
};

export const GridStatsConfig = {
  enabled: true,
  position: 'top', // 'top' | 'bottom'
  variant: 'cards', // 'cards' | 'summary'
  showTotal: true,
  showSelected: true,
  showFiltered: true
};

// ============================================================================
// FORM FIELD TYPES
// ============================================================================

export const FieldType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  DATE: 'date',
  DATETIME: 'datetime',
  TEXTAREA: 'textarea',
  FILE: 'file'
};

export const FormFieldBase = {
  id: '',
  type: FieldType.TEXT,
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  visible: true,
  fullWidth: true,
  size: SizeVariant.MEDIUM,
  helperText: '',
  defaultValue: null,
  validation: {}
};

// ============================================================================
// DIALOG TYPES
// ============================================================================

export const DialogType = {
  FORM: 'form',
  CONFIRMATION: 'confirmation',
  INFO: 'info',
  CUSTOM: 'custom'
};

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export const ValidationRules = {
  required: false,
  minLength: null,
  maxLength: null,
  pattern: null,
  custom: null
};

// ============================================================================
// ACTION TYPES
// ============================================================================

export const CustomAction = {
  id: '',
  label: '',
  icon: null,
  variant: ButtonVariant.OUTLINED,
  color: ColorVariant.PRIMARY,
  size: SizeVariant.MEDIUM,
  disabled: false,
  visible: true,
  onClick: () => {}
};

// ============================================================================
// COMPONENT PRESETS
// ============================================================================

export const GRID_PRESETS = {
  CRUD: {
    enableSelection: true,
    enableSearch: true,
    enableStats: true,
    toolbarConfig: {
      showRefresh: true,
      showAdd: true,
      showEdit: true,
      showDelete: true,
      showExport: true
    }
  },
  READONLY: {
    enableSelection: false,
    enableSearch: true,
    enableStats: true,
    toolbarConfig: {
      showRefresh: true,
      showAdd: false,
      showEdit: false,
      showDelete: false,
      showExport: true
    }
  },
  SIMPLE: {
    enableSelection: false,
    enableSearch: false,
    enableStats: false,
    toolbarConfig: {
      showRefresh: true,
      showAdd: false,
      showEdit: false,
      showDelete: false,
      showExport: false
    }
  }
};

export default {
  SizeVariant,
  ColorVariant,
  ButtonVariant,
  GridToolbarConfig,
  GridDialogConfig,
  GridStatsConfig,
  FieldType,
  FormFieldBase,
  DialogType,
  ValidationRules,
  CustomAction,
  GRID_PRESETS
};
