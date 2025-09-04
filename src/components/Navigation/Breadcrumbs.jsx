import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useBreadcrumbs } from '../../hooks/useNavigation';

const Breadcrumbs = () => {
  const theme = useTheme();
  const { breadcrumbs, navigateToBreadcrumb } = useBreadcrumbs();

  // Don't show breadcrumbs if there's only one item or none
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center'
          }
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = breadcrumb?.isActive || index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          if (isLast) {
            return (
              <Typography key={index} color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                {isFirst && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
                {breadcrumb?.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              component="button"
              underline="hover"
              onClick={() => navigateToBreadcrumb(breadcrumb)}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 1,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                transition: theme.transitions.create(['color', 'background-color']),
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
            >
              {isFirst && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
              {breadcrumb?.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
