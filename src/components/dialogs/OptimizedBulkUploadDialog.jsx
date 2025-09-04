import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert,
  Chip,
  IconButton
} from '@mui/material';
import {
  CloudUpload,
  Image,
  Close,
  Settings
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import mediaUploadService, { DEFAULT_MATCHING_SETTINGS } from '../../services/mediaUploadService';

/**
 * Advanced Bulk Upload Dialog
 * Unified advanced matching with configurable settings and intelligent CSV detection
 */
const OptimizedBulkUploadDialog = ({ open, onClose, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [settings] = useState(DEFAULT_MATCHING_SETTINGS);

  const steps = [
    'Upload CSV File',
    'Upload Images',
    'Review Matches',
    'Upload Process'
  ];

  // CSV Upload
  const onCSVDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    try {
      console.log('Parsing CSV with advanced detection...');
      const data = await mediaUploadService.parseCSVFile(file, 'auto');
      setCsvFile(file);
      setCsvData(data);
      toast.success(`CSV parsed successfully: ${data.data.length} products found`);
      setActiveStep(1);
    } catch (error) {
      console.error('CSV parsing failed:', error);
      toast.error(`CSV parsing failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Image Upload
  const onImageDrop = useCallback(async (acceptedFiles) => {
    const validFiles = [];
    const errors = [];
    
    for (const file of acceptedFiles) {
      const validation = mediaUploadService.validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    }

    if (errors.length > 0) {
      toast.error(`Some files were rejected: ${errors.join(', ')}`);
    }

    setImageFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} images added`);
    }
  }, []);

  // Dropzone configurations
  const csvDropzone = useDropzone({
    onDrop: onCSVDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    multiple: false
  });

  const imageDropzone = useDropzone({
    onDrop: onImageDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const handleClose = () => {
    setActiveStep(0);
    setCsvFile(null);
    setCsvData(null);
    setImageFiles([]);
    setMatchingResults(null);
    onClose();
  };

  const handleMatching = () => {
    if (!csvData || imageFiles.length === 0) {
      toast.error('Please upload both CSV and images');
      return;
    }

    setLoading(true);
    try {
      console.log('Starting advanced matching with settings:', settings);
      const results = mediaUploadService.matchImagesWithCSV(csvData, imageFiles, settings);
      setMatchingResults(results);
      setActiveStep(2);
      toast.success(`Matching complete: ${results.stats.matched} matches found`);
    } catch (error) {
      console.error('Matching failed:', error);
      toast.error(`Matching failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Optimized Bulk Upload
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>{steps[0]}</StepLabel>
              <StepContent>
                <Paper
                  {...csvDropzone.getRootProps()}
                  sx={{
                    p: 3,
                    border: '2px dashed',
                    borderColor: csvDropzone.isDragActive ? 'primary.main' : 'grey.300',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <input {...csvDropzone.getInputProps()} />
                  <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                  <Typography variant="h6">
                    {csvDropzone.isDragActive ? 'Drop CSV file here' : 'Click or drag CSV file here'}
                  </Typography>
                  {csvFile && (
                    <Chip label={csvFile.name} color="primary" sx={{ mt: 1 }} />
                  )}
                </Paper>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel>{steps[1]}</StepLabel>
              <StepContent>
                <Paper
                  {...imageDropzone.getRootProps()}
                  sx={{
                    p: 3,
                    border: '2px dashed',
                    borderColor: imageDropzone.isDragActive ? 'primary.main' : 'grey.300',
                    cursor: 'pointer',
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  <input {...imageDropzone.getInputProps()} />
                  <Image sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                  <Typography variant="h6">
                    {imageDropzone.isDragActive ? 'Drop images here' : 'Click or drag images here'}
                  </Typography>
                </Paper>
                
                {imageFiles.length > 0 && (
                  <>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      {imageFiles.length} images selected
                    </Alert>
                    <Button
                      variant="contained"
                      onClick={handleMatching}
                      disabled={loading || !csvData}
                      startIcon={<Settings />}
                    >
                      {loading ? 'Processing...' : 'Start Matching'}
                    </Button>
                  </>
                )}
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel>{steps[2]}</StepLabel>
              <StepContent>
                {matchingResults && (
                  <Alert severity="success">
                    Found {matchingResults.stats.matched} matches for {matchingResults.stats.uniqueProducts} products
                  </Alert>
                )}
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained" 
          disabled={!matchingResults}
          onClick={() => toast.info('Upload functionality would be implemented here')}
        >
          Start Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptimizedBulkUploadDialog;
