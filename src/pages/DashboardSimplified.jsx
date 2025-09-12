import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Alert,
  Button,
  Chip,
  Stack
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  TrendingUp as TrendingIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { ErrorBoundary } from 'react-error-boundary';

// Safe hook usage with fallbacks
const useSafeTheme = () => {
  try {
    const { useCustomTheme } = require('../contexts/ThemeContext');
    return useCustomTheme();
  } catch {
    return { mode: 'light', isDark: false, colorPreset: 'blue' };
  }
};

const useSafeLanguage = () => {
  try {
    const { useLanguage } = require('../contexts/LanguageContext');
    return useLanguage();
  } catch {
    return { currentLanguage: 'en', translate: (key) => key };
  }
};

// Safe lazy loading of dashboard components
const QuickActions = React.lazy(() =>
  import('../components/dashboard/QuickActions')
    .catch(() => ({
      default: () => (
        <Card>
          <CardContent>
            <Typography variant="h6">Quick Actions</Typography>
            <Typography variant="body2" color="text.secondary">
              Quick actions panel will be available soon.
            </Typography>
          </CardContent>
        </Card>
      )
    }))
);

const RecentActivityFeed = React.lazy(() =>
  import('../components/dashboard/RecentActivityFeed')
    .catch(() => ({
      default: () => (
        <Card>
          <CardContent>
            <Typography variant="h6">Recent Activity</Typography>
            <Typography variant="body2" color="text.secondary">
              Activity feed will be available soon.
            </Typography>
          </CardContent>
        </Card>
      )
    }))
);

// Simple stats card component
const SimpleStatsCard = ({ title, value, icon, color = 'primary', trend = null }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingIcon 
                sx={{ 
                  fontSize: 16, 
                  mr: 0.5,
                  color: trend > 0 ? 'success.main' : 'error.main'
                }} 
              />
              <Typography 
                variant="body2" 
                color={trend > 0 ? 'success.main' : 'error.main'}
              >
                {trend > 0 ? '+' : ''}{trend}%
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ color: `${color}.main` }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
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
    <Typography variant="h6">Component Error</Typography>
    <Typography variant="body2">{error?.message}</Typography>
  </Alert>
);

// Loading component
const LoadingFallback = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 200,
    flexDirection: 'column',
    gap: 2
  }}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      Loading dashboard...
    </Typography>
  </Box>
);

const DashboardSimplified = () => {
  const { mode, isDark } = useSafeTheme();
  const { translate } = useSafeLanguage();
  
  const [stats, setStats] = useState({
    totalProducts: 1250,
    totalOrders: 348,
    totalCustomers: 89,
    totalRevenue: '€125,430'
  });
  
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulate data refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setLoading(false);
      // Simulate data changes
      setStats(prev => ({
        ...prev,
        totalProducts: prev.totalProducts + Math.floor(Math.random() * 10),
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 5)
      }));
    }, 2000);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {translate('Dashboard')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to TECHNO-ETL. Here's your business overview.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Stack>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Last updated: {lastRefresh.toLocaleTimeString()}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <SimpleStatsCard
            title="Total Products"
            value={stats.totalProducts.toLocaleString()}
            icon={<InventoryIcon sx={{ fontSize: 40 }} />}
            color="primary"
            trend={5.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SimpleStatsCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon={<OrdersIcon sx={{ fontSize: 40 }} />}
            color="secondary"
            trend={12.8}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SimpleStatsCard
            title="Total Customers"
            value={stats.totalCustomers.toLocaleString()}
            icon={<CustomersIcon sx={{ fontSize: 40 }} />}
            color="success"
            trend={8.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SimpleStatsCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={<TrendingIcon sx={{ fontSize: 40 }} />}
            color="warning"
            trend={15.7}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error) => console.error('Quick Actions error:', error)}
          >
            <Suspense fallback={<LoadingFallback />}>
              <QuickActions />
            </Suspense>
          </ErrorBoundary>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={8}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error) => console.error('Activity Feed error:', error)}
          >
            <Suspense fallback={<LoadingFallback />}>
              <RecentActivityFeed />
            </Suspense>
          </ErrorBoundary>
        </Grid>

        {/* System Status */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Stack direction="row" spacing={2}>
                <Chip 
                  label="API Connected" 
                  color="success" 
                  variant="outlined" 
                />
                <Chip 
                  label="Database Online" 
                  color="success" 
                  variant="outlined" 
                />
                <Chip 
                  label="Sync Active" 
                  color="info" 
                  variant="outlined" 
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Development Mode Indicator */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ 
          position: 'fixed', 
          bottom: 20, 
          left: 20, 
          zIndex: 1000 
        }}>
          <Chip 
            label="Development Mode" 
            color="warning" 
            size="small"
            sx={{ fontFamily: 'monospace' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardSimplified;
