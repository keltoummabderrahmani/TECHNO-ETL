import React from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  TextField,
  Chip,
  IconButton,
  Collapse,
  Typography,
  Divider,
  Button,
  Tooltip
} from '@mui/material';
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  Clear,
  Business,
  Source,
  ChangeCircle,
  Category,
  LocalOffer
} from '@mui/icons-material';

/**
 * Unified Grid Filter System
 * Base filter components with inheritance pattern for consistent filtering
 * 
 * @author Techno-ETL Team
 * @version 4.0.0
 */

/**
 * Base Filter Class
 * Defines structure and behavior for filter components
 */
export class BaseFilter {
  constructor(id, config = {}) {
    this.id = id;
    this.type = config.type || 'select'; // select, switch, text, date, range
    this.label = config.label || id;
    this.options = config.options || [];
    this.value = config.value || (this.type === 'switch' ? false : '');
    this.placeholder = config.placeholder || `Filter by ${this.label}`;
    this.icon = config.icon || null;
    this.visible = config.visible !== false;
    this.enabled = config.enabled !== false;
    this.fullWidth = config.fullWidth || false;
    this.size = config.size || 'small';
    this.onChange = config.onChange || (() => {});
  }

  /**
   * Render the filter component
   */
  render(key, value, onChange) {
    if (!this.visible) return null;

    const commonProps = {
      disabled: !this.enabled,
      size: this.size
    };
    
    switch (this.type) {
      case 'select':
        return this.renderSelect(value, onChange, { ...commonProps, key });
      case 'switch':
        return this.renderSwitch(value, onChange, { ...commonProps, key });
      case 'text':
        return this.renderTextField(value, onChange, { ...commonProps, key });
      default:
        return this.renderSelect(value, onChange, { ...commonProps, key });
    }
  }

  /**
   * Render select filter
   */
  renderSelect(value, onChange, props) {
    const { key, ...restProps } = props;
    const IconComponent = this.getIconComponent();
    
    return (
      <FormControl fullWidth={this.fullWidth} key={key}>
        <InputLabel>
          {IconComponent && <IconComponent sx={{ mr: 1 }} />}
          {this.label}
        </InputLabel>
        <Select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          label={this.label}
          {...restProps}
        >
          {this.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  /**
   * Render switch filter
   */
  renderSwitch(value, onChange, props) {
    const { key, ...restProps } = props;
    const IconComponent = this.getIconComponent();
    
    return (
      <FormControlLabel
        key={key}
        control={
          <Switch
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            {...restProps}
          />
        }
        label={
          <Box display="flex" alignItems="center">
            {IconComponent && <IconComponent sx={{ mr: 1 }} />}
            {this.label}
          </Box>
        }
      />
    );
  }

  /**
   * Render text field filter
   */
  renderTextField(value, onChange, props) {
    const { key, ...restProps } = props;
    const IconComponent = this.getIconComponent();
    
    return (
      <TextField
        key={key}
        fullWidth={this.fullWidth}
        label={this.label}
        placeholder={this.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: IconComponent ? <IconComponent sx={{ mr: 1 }} /> : null
        }}
        {...restProps}
      />
    );
  }

  /**
   * Get icon component
   */
  getIconComponent() {
    const iconMap = {
      business: Business,
      source: Source,
      changed: ChangeCircle,
      category: Category,
      brand: LocalOffer,
      filter: FilterList
    };
    return iconMap[this.icon] || null;
  }

  /**
   * Get filter value for API
   */
  getApiValue(value) {
    return value;
  }
}

/**
 * Specialized filter classes
 */
export class SourceFilter extends BaseFilter {
  constructor(options = [], value = 'all', onChange = () => {}) {
    super('source', {
      type: 'select',
      label: 'Source',
      icon: 'source',
      options: [
        { value: 'all', label: 'All Sources' },
        ...options
      ],
      value,
      onChange
    });
  }
}

export class SuccursaleFilter extends BaseFilter {
  constructor(options = [], value = 'all', onChange = () => {}) {
    super('succursale', {
      type: 'select',
      label: 'Branch',
      icon: 'business',
      options: [
        { value: 'all', label: 'All Branches' },
        ...options
      ],
      value,
      onChange
    });
  }
}

export class CategoryFilter extends BaseFilter {
  constructor(options = [], value = 'all', onChange = () => {}) {
    super('category', {
      type: 'select',
      label: 'Category',
      icon: 'category',
      options: [
        { value: 'all', label: 'All Categories' },
        ...options
      ],
      value,
      onChange
    });
  }
}

export class BrandFilter extends BaseFilter {
  constructor(options = [], value = 'all', onChange = () => {}) {
    super('brand', {
      type: 'select',
      label: 'Brand',
      icon: 'brand',
      options: [
        { value: 'all', label: 'All Brands' },
        ...options
      ],
      value,
      onChange
    });
  }
}

/**
 * Unified Filter Container Component
 */
export const UnifiedFilters = ({ filters = [], values = {}, onChange, onClear }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" display="flex" alignItems="center">
          <FilterList sx={{ mr: 1 }} />
          Filters
        </Typography>
        <Box>
          <IconButton onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          {onClear && (
            <IconButton onClick={onClear} size="small">
              <Clear />
            </IconButton>
          )}
        </Box>
      </Box>
      
      <Collapse in={expanded}>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
          {filters.map((filter) => 
            filter.render(filter.id, values[filter.id], (value) => onChange(filter.id, value))
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default UnifiedFilters;
