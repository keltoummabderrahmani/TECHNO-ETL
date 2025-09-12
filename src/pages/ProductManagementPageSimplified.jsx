import React, { useState, useEffect, Suspense, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Divider,
  LinearProgress,
  CircularProgress,
  Stack,
  Container
} from '@mui/material';
import {
  Inventory as ProductIcon,
  Add as AddIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  CloudUpload as UploadIcon,
  Transform as TransformIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

// Safe lazy loading of grid component
const ProductManagementGrid = React.lazy(() =>
  import('../components/grids/magento/ProductManagementGrid')
    .catch(() => {
      // Fallback to simple products grid
      return import('../components/grids/ProductsGrid')
        .then(module => ({ default: module.default }))
        .catch(() => ({
          default: () => (
            <Alert severity="info" sx={{ m: 2 }}>
              Product management grid is being loaded...
            </Alert>
          )
        }));
    })
);

// Safe lazy loading of dialogs
const BulkMediaUploadDialog = React.lazy(() =>
  import('../components/dialogs/BulkMediaUploadDialog')
    .catch(() => ({
      default: ({ open, onClose }) => open ? (
        <div>Media upload dialog not available</div>
      ) : null
    }))
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Alert 
    severity="error" 
    action={
      <Button color="inherit" size="small" onClick={resetErrorBoundary}>
        Retry
      </Button>
    }
  >
    <Typography variant="h6">Something went wrong</Typography>
    <Typography variant="body2">{error?.message}</Typography>
  </Alert>
);

// Loading component
const LoadingFallback = ({ message = "Loading..." }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 400,
    gap: 2
  }}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

/**
 * Simplified Product Management Page
 * Focus on reliability and error handling
 */
const ProductManagementPageSimplified = () => {
  // ===== STATE MANAGEMENT =====
  const [productIds, setProductIds] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [bulkMediaDialogOpen, setBulkMediaDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Processing state
  const [processingState, setProcessingState] = useState({
    uploading: false,
    processing: false,
    error: null
  });

  // ===== EVENT HANDLERS =====
  const handleAddProductId = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !productIds.includes(trimmedValue)) {
      setProductIds(prev => [...prev, trimmedValue]);
      setInputValue('');
      toast.success(`Product ID ${trimmedValue} added`);
    } else if (productIds.includes(trimmedValue)) {
      toast.warning('Product ID already exists');
    } else {
      toast.warning('Please enter a valid product ID');
    }
  }, [inputValue, productIds]);

  const handleRemoveProductId = useCallback((idToRemove) => {
    setProductIds(prev => prev.filter(id => id !== idToRemove));
    toast.info(`Product ID ${idToRemove} removed`);
  }, []);

  const handleClearAll = useCallback(() => {
    setProductIds([]);
    toast.info('All product IDs cleared');
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleAddProductId();
    }
  }, [handleAddProductId]);

  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
  }, []);

  // ===== TABS CONFIGURATION =====
  const tabs = [
    {
      label: 'Product Grid',
      icon: <ProductIcon />,
      component: 'grid'
    },
    {
      label: 'Bulk Operations',
      icon: <UploadIcon />,
      component: 'bulk'
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
      component: 'settings'
    }
  ];

  // ===== RENDER METHODS =====
  const renderProductIdManager = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Product ID Manager
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter Product ID (e.g., PROD-001)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleAddProductId} size="small">
                  <AddIcon />
                </IconButton>
              )
            }}
          />
          <Button
            variant="outlined"
            onClick={() => setShowAllProducts(!showAllProducts)}
            size="small"
          >
            {showAllProducts ? 'Show Specific' : 'Show All'}
          </Button>
          {productIds.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearAll}
              size="small"
              startIcon={<ClearIcon />}
            >
              Clear All
            </Button>
          )}
        </Stack>

        {/* Product ID Chips */}
        {productIds.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {productIds.map((id) => (
              <Chip
                key={id}
                label={id}
                onDelete={() => handleRemoveProductId(id)}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {showAllProducts 
            ? "Showing all products in the system"
            : `Showing ${productIds.length} specific product${productIds.length !== 1 ? 's' : ''}`
          }
        </Typography>
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Product Grid
        return (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error) => console.error('Grid error:', error)}
          >
            <Suspense fallback={<LoadingFallback message="Loading product grid..." />}>
              <ProductManagementGrid
                initialProductIds={showAllProducts ? [] : productIds}
                showAllProducts={showAllProducts}
              />
            </Suspense>
          </ErrorBoundary>
        );

      case 1: // Bulk Operations
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bulk Operations
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<UploadIcon />}
                    onClick={() => setBulkMediaDialogOpen(true)}
                    disabled={processingState.uploading}
                  >
                    {processingState.uploading ? 'Processing...' : 'Bulk Media Upload'}
                  </Button>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<TransformIcon />}
                    disabled={processingState.processing}
                  >
                    Process Images
                  </Button>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                  >
                    Batch Settings
                  </Button>
                </Grid>
              </Grid>

              {processingState.error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {processingState.error}
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 2: // Settings
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Management Settings
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Settings panel will be available in future updates.
              </Typography>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your product catalog with advanced tools and bulk operations
        </Typography>
      </Box>

      {/* Product ID Manager */}
      {renderProductIdManager()}

      {/* Tabs */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>

        <Box sx={{ p: 3, minHeight: 600 }}>
          {renderTabContent()}
        </Box>
      </Paper>

      {/* Bulk Media Upload Dialog */}
      <Suspense fallback={null}>
        <BulkMediaUploadDialog
          open={bulkMediaDialogOpen}
          onClose={() => setBulkMediaDialogOpen(false)}
          productIds={showAllProducts ? [] : productIds}
        />
      </Suspense>
    </Container>
  );
};

export default ProductManagementPageSimplified;
