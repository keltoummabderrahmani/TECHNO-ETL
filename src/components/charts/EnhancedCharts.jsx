import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  useTheme,
  alpha,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  MoreVert,
  Refresh,
  Download,
  Fullscreen,
  Settings,
  TrendingUp,
  TrendingDown,
  Remove
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

/**
 * Enhanced Professional Chart Components
 * Modern, animated charts with professional styling
 */

// Professional color palettes
const COLOR_PALETTES = {
  primary: ['#1976d2', '#1565c0', '#0d47a1', '#42a5f5', '#64b5f6'],
  success: ['#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a'],
  warning: ['#ed6c02', '#f57c00', '#ff9800', '#ffb74d', '#ffcc02'],
  error: ['#d32f2f', '#f44336', '#e57373', '#ef5350', '#ff5722'],
  info: ['#0288d1', '#03a9f4', '#29b6f6', '#4fc3f7', '#81d4fa']
};

/**
 * Enhanced Pie Chart with animations and professional styling
 */
export const EnhancedPieChart = ({
  data = [],
  title = 'Chart',
  loading = false,
  height = 400,
  showLegend = true,
  colorPalette = 'primary',
  onRefresh,
  onExport,
  subtitle,
  showPercentages = true,
  animationDuration = 1000
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const colors = COLOR_PALETTES[colorPalette] || COLOR_PALETTES.primary;
  
  // Calculate total for percentages
  const total = useMemo(() => 
    data.reduce((sum, item) => sum + (item?.value || 0), 0), 
    [data]
  );
  
  // Enhanced data with percentages
  const enhancedData = useMemo(() => 
    data.map((item, index) => ({
      ...item,
      percentage: total > 0 ? ((item?.value / total) * 100).toFixed(1) : '0',
      color: colors[index % colors.length]
    })), 
    [data, total, colors]
  );
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 1,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {data.name}
          </Typography>
          <Typography variant="body2">
            Value: {data?.value?.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Percentage: {data.percentage}%
          </Typography>
        </Box>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              {onRefresh && (
                <MenuItem onClick={() => { onRefresh(); setMenuAnchor(null); }}>
                  <ListItemIcon><Refresh /></ListItemIcon>
                  <ListItemText>Refresh</ListItemText>
                </MenuItem>
              )}
              {onExport && (
                <MenuItem onClick={() => { onExport(); setMenuAnchor(null); }}>
                  <ListItemIcon><Download /></ListItemIcon>
                  <ListItemText>Export</ListItemText>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
        
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={height}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={enhancedData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={animationDuration}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                {enhancedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Enhanced Bar Chart
 */
export const EnhancedBarChart = ({
  data = [],
  title = 'Bar Chart',
  loading = false,
  height = 400,
  xAxisKey = 'name',
  yAxisKey = 'value',
  colorPalette = 'primary'
}) => {
  const colors = COLOR_PALETTES[colorPalette] || COLOR_PALETTES.primary;
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" mb={2}>
          {title}
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={height}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey={yAxisKey} fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Enhanced Line Chart
 */
export const EnhancedLineChart = ({
  data = [],
  title = 'Line Chart',
  loading = false,
  height = 400,
  xAxisKey = 'name',
  yAxisKey = 'value',
  colorPalette = 'primary'
}) => {
  const colors = COLOR_PALETTES[colorPalette] || COLOR_PALETTES.primary;
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" mb={2}>
          {title}
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={height}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={yAxisKey} 
                stroke={colors[0]} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default {
  EnhancedPieChart,
  EnhancedBarChart,
  EnhancedLineChart
};
