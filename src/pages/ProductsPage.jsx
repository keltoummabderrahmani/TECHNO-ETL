/**
 * Products Page - Enhanced product catalog view with error handling
 */
import React, { Suspense } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert,
  Card,
  CardContent 
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

// Safe lazy loading with fallback
const ProductsGrid = React.lazy(() => 
  import('../components/grids/magento/ProductsGrid')
    .catch(() => import('../components/grids/ProductsGrid'))
    .catch(() => {
      // Ultimate fallback
      return {
        default: () => (
          <Alert severity="warning" sx={{ m: 2 }}>
            ProductsGrid component is not available. Please check the component imports.
          </Alert>
        )
      };
    })
);

// Loading component
const ProductsLoading = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 400,
    flexDirection: 'column',
    gap: 2 
  }}>
    <CircularProgress size={40} />
    <Typography variant="body2" color="text.secondary">
      Loading products...
    </Typography>
  </Box>
);

// Error fallback component
const ProductsErrorFallback = ({ error, resetErrorBoundary }) => (
  <Card sx={{ m: 2 }}>
    <CardContent>
      <Alert 
        severity="error" 
        action={
          <button onClick={resetErrorBoundary} style={{
            padding: '4px 8px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Retry
          </button>
        }
      >
        <Typography variant="h6" gutterBottom>
          Products Grid Error
        </Typography>
        <Typography variant="body2">
          {error?.message || 'Failed to load products grid'}
        </Typography>
      </Alert>
    </CardContent>
  </Card>
);

const ProductsPage = () => {
  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'background.default'
    }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Paper sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          minHeight: 600
        }}>
          <ErrorBoundary
            FallbackComponent={ProductsErrorFallback}
            onError={(error, errorInfo) => {
              console.error('Products page error:', error, errorInfo);
            }}
          >
            <Suspense fallback={<ProductsLoading />}>
              <ProductsGrid />
            </Suspense>
          </ErrorBoundary>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductsPage;
