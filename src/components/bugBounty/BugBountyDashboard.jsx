import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  LinearProgress,
  Alert,
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress
} from '@mui/material';
import {
  BugReport,
  Add,
  TrendingUp,
  EmojiEvents,
  AttachMoney,
  Security,
  Speed,
  Visibility,
  AdminPanelSettings,
  Refresh,
  Star
} from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { useCustomTheme } from '../../contexts/ThemeContext';
import { useSettings } from '../../contexts/SettingsContext';
import BugReportForm from './BugReportForm';
import BugBountyAdmin from './BugBountyAdmin';
import bugBountyService, { BUG_CATEGORIES, BUG_STATUS } from '../../services/bugBountyService';

/**
 * Bug Bounty Dashboard Component
 * Main dashboard for bug bounty program
 *
 * @author Mounir Abderrahmani
 * @email mounir.ab@techno-dz.com
 * @contact mounir.webdev.tms@gmail.com
 */

const BugBountyDashboard = () => {
  const theme = useTheme();
  const { mode, isDark, colorPreset, density, animations } = useCustomTheme();
  const { settings } = useSettings();
  
  // State management
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract data from dashboard data
  const bugs = dashboardData?.bugs || [];
  const leaderboard = dashboardData?.leaderboard || [];
  const stats = dashboardData?.stats || {};

  // Memoized calculations for performance
  const totalRewards = useMemo(() => {
    return bugs.reduce((total, bug) => {
      return total + (bug.reward?.final || bug.reward?.calculated || 0);
    }, 0);
  }, [bugs]);

  const criticalBugsCount = useMemo(() => {
    return stats.byCategory?.CRITICAL || 0;
  }, [stats]);

  const recentBugs = useMemo(() => {
    return bugs.slice(0, 10);
  }, [bugs]);

  const topTesters = useMemo(() => {
    return leaderboard.slice(0, 5);
  }, [leaderboard]);

  // Data loading
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [bugsResult, leaderboardResult, statsResult] = await Promise.all([
        bugBountyService.getBugs({ limit: 20 }),
        bugBountyService.getLeaderboard(15),
        bugBountyService.getStats(),
      ]);

      setDashboardData({
        bugs: bugsResult.success ? bugsResult.bugs : [],
        leaderboard: leaderboardResult.success ? leaderboardResult.leaderboard : [],
        stats: statsResult.success ? statsResult.stats : {},
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBugSubmit = useCallback((result) => {
    if (result.success) {
      loadData(); // Refresh data
    }
  }, [loadData]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData();
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [loadData]);

  // Utility functions
  const getStatusColor = useCallback((status) => {
    const colors = {
      [BUG_STATUS.SUBMITTED]: 'info',
      [BUG_STATUS.UNDER_REVIEW]: 'warning',
      [BUG_STATUS.CONFIRMED]: 'success',
      [BUG_STATUS.DUPLICATE]: 'default',
      [BUG_STATUS.INVALID]: 'error',
      [BUG_STATUS.FIXED]: 'success',
      [BUG_STATUS.REWARDED]: 'primary',
    };
    return colors[status] || 'default';
  }, []);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Alert severity="error" action={
          <Button onClick={handleRefresh}>Retry</Button>
        }>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bug Bounty Dashboard
        </Typography>
        <Box display="flex" gap={1}>
          <Tooltip title="Refresh Data">
            <Button
              variant="outlined"
              onClick={handleRefresh}
              disabled={refreshing}
              startIcon={refreshing ? <CircularProgress size={16} /> : <Refresh />}
            >
              Refresh
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            onClick={() => setReportFormOpen(true)}
            startIcon={<BugReport />}
          >
            Report Bug
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <BugReport color="primary" />
                <Typography variant="h6">Total Bugs</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.total || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <AttachMoney color="success" />
                <Typography variant="h6">Total Rewards</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatCurrency(totalRewards)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Security color="error" />
                <Typography variant="h6">Critical Bugs</Typography>
              </Box>
              <Typography variant="h4" color="error.main">
                {criticalBugsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <EmojiEvents color="warning" />
                <Typography variant="h6">Top Testers</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {leaderboard.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bugs */}
        <Grid xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Bug Reports
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reward</TableCell>
                      <TableCell>Reporter</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentBugs.map((bug) => (
                      <TableRow key={bug.id}>
                        <TableCell>{bug.title}</TableCell>
                        <TableCell>
                          <Chip 
                            label={bug.category} 
                            size="small" 
                            variant="outlined" 
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={bug.status} 
                            size="small" 
                            color={getStatusColor(bug.status)}
                          />
                        </TableCell>
                        <TableCell>{formatCurrency(bug.reward?.final)}</TableCell>
                        <TableCell>{bug.reporter?.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Testers */}
        <Grid xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Bug Hunters
              </Typography>
              {topTesters.map((tester, index) => (
                <Box key={tester.id} display="flex" alignItems="center" gap={2} mb={1}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {index + 1}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2">{tester.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tester.bugsFound} bugs • {formatCurrency(tester.totalReward)}
                    </Typography>
                  </Box>
                  <Chip icon={<Star />} label={tester.rank} size="small" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setReportFormOpen(true)}
      >
        <Add />
      </Fab>

      {/* Dialogs */}
      <Dialog
        open={reportFormOpen}
        onClose={() => setReportFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Report a Bug</DialogTitle>
        <DialogContent>
          <BugReportForm 
            onSubmit={handleBugSubmit}
            onClose={() => setReportFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Bug Bounty Admin Panel</DialogTitle>
        <DialogContent>
          <BugBountyAdmin />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default BugBountyDashboard;
