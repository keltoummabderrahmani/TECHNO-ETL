import React, { useState, useCallback, useMemo, forwardRef, useImperativeHandle, memo } from 'react';
import BaseGrid from '../base/BaseGrid';
import { Box, Skeleton } from '@mui/material';
import { useSettings } from '../../contexts/SettingsContext';
import { StatsCards } from './StatsCards';
import { enhanceColumns } from '../../utils/gridUtils';

/**
 * UnifiedGrid - A high-performance grid component
 * Combines the best features from BaseGrid with optimizations
 */
const UnifiedGrid = forwardRef(({
  gridName,
  columns = [],
  data = [],
  loading = false,
  onRefresh,
  getRowId = (row) => row.id || row.entity_id,
  density = 'standard',
  enableSelection = true,
  enableSorting = true,
  enableFiltering = true,
  showStatsCards = false,
  gridCards = [],
  defaultPageSize = 25,
  onSelectionChange,
  onRowClick,
  onRowDoubleClick,
  sx = {},
  ...props
}, ref) => {
  const { settings } = useSettings();
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Memoize columns
  const processedColumns = useMemo(() => {
    if (!Array.isArray(columns)) {
      return [];
    }
    return enhanceColumns(columns, {
      enableSorting,
      enableFiltering
    });
  }, [columns, enableSorting, enableFiltering]);
  
  // Memoize data
  const processedData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data;
  }, [data]);
  
  // Selection handler
  const handleSelectionChange = useCallback((newSelection) => {
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  }, [onSelectionChange]);
  
  // Imperative handle
  useImperativeHandle(ref, () => ({
    getSelectedRows: () => selectedRows,
    getGridData: () => data
  }), [selectedRows, data]);
  
  return (
    <Box sx={{ height: '100%', width: '100%', ...sx }}>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Box>
      )}
      
      <BaseGrid
        columns={processedColumns}
        data={processedData}
        loading={loading}
        density={density}
        checkboxSelection={enableSelection}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionChange}
        getRowId={getRowId}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        pageSizeOptions={[10, 25, 50, 100]}
        {...props}
      />
      
      {showStatsCards && gridCards?.length > 0 && (
        <Box mt={2}>
          <StatsCards cards={gridCards} />
        </Box>
      )}
    </Box>
  );
});

UnifiedGrid.displayName = 'UnifiedGrid';

export default memo(UnifiedGrid);
