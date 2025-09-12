import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Paper } from '@mui/material';

const ErrorTest = () => {
  const [errors, setErrors] = useState([]);
  const [contextTests, setContextTests] = useState({});

  useEffect(() => {
    // Test critical contexts
    const testContexts = async () => {
      const tests = {};
      
      try {
        const { useAuth } = await import('../../contexts/AuthContext');
        tests.auth = 'OK';
      } catch (error) {
        tests.auth = error.message;
        setErrors(prev => [...prev, `AuthContext: ${error.message}`]);
      }

      try {
        const { useTab } = await import('../../contexts/TabContext');
        tests.tab = 'OK';
      } catch (error) {
        tests.tab = error.message;
        setErrors(prev => [...prev, `TabContext: ${error.message}`]);
      }

      try {
        const { usePermissions } = await import('../../contexts/PermissionContext');
        tests.permissions = 'OK';
      } catch (error) {
        tests.permissions = error.message;
        setErrors(prev => [...prev, `PermissionContext: ${error.message}`]);
      }

      try {
        const { useTheme } = await import('../../contexts/ThemeContext');
        tests.theme = 'OK';
      } catch (error) {
        tests.theme = error.message;
        setErrors(prev => [...prev, `ThemeContext: ${error.message}`]);
      }

      setContextTests(tests);
    };

    testContexts();
  }, []);

  const testComponentImports = async () => {
    const testResults = [];
    
    // Test critical component imports
    const componentsToTest = [
      '../../components/Layout/Layout',
      '../../components/Layout/Header',
      '../../components/Layout/Sidebar',
      '../../components/Layout/TabPanel',
      '../../pages/Dashboard',
      '../../pages/Login'
    ];

    for (const component of componentsToTest) {
      try {
        await import(component);
        testResults.push(`✅ ${component.split('/').pop()}: OK`);
      } catch (error) {
        testResults.push(`❌ ${component.split('/').pop()}: ${error.message}`);
      }
    }

    setErrors(prev => [...prev, ...testResults]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        TECHNO-ETL Runtime Error Test
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Context Status
        </Typography>
        {Object.entries(contextTests).map(([context, status]) => (
          <Alert 
            key={context}
            severity={status === 'OK' ? 'success' : 'error'}
            sx={{ mb: 1 }}
          >
            {context}: {status}
          </Alert>
        ))}
      </Paper>

      <Button 
        variant="contained" 
        onClick={testComponentImports}
        sx={{ mb: 2 }}
      >
        Test Component Imports
      </Button>

      {errors.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Errors Found
          </Typography>
          {errors.map((error, index) => (
            <Typography 
              key={index}
              variant="body2"
              sx={{ 
                fontFamily: 'monospace',
                mb: 1,
                p: 1,
                bgcolor: 'grey.100',
                borderRadius: 1
              }}
            >
              {error}
            </Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default ErrorTest;
