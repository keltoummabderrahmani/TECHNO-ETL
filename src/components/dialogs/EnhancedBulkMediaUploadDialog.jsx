import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
  Alert,
  Chip,
} from '@mui/material';
import {
  Close,
  CloudUpload,
  Image,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const EnhancedBulkMediaUploadDialog = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  // CSV file drop handler
  const onCSVDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setCsvFile(file);
      // Simulate CSV parsing
      setCsvData({
        totalRows: 100,
        skuColumn: 'SKU',
        imageColumn: 'Image',
        nameColumn: 'Product Name'
      });
      toast.success('CSV file uploaded successfully');
      setActiveStep(1);
    }
  }, []);

  // Image files drop handler
  const onImageDrop = useCallback((acceptedFiles) => {
    setImageFiles(prev => [...prev, ...acceptedFiles]);
    toast.success(`${acceptedFiles.length} images added`);
  }, []);

  // Dropzone configurations
  const csvDropzone = useDropzone({
    onDrop: onCSVDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Enhanced Bulk Media Upload
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
              <StepLabel>Upload CSV File</StepLabel>
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
              <StepLabel>Upload Images</StepLabel>
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
                  <Typography variant="body2" color="text.secondary">
                    Supported formats: JPEG, PNG, GIF, WebP
                  </Typography>
                </Paper>
                
                {imageFiles.length > 0 && (
                  <Alert severity="info">
                    {imageFiles.length} images selected
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
          disabled={!csvData || imageFiles.length === 0}
          onClick={() => toast.info('Upload functionality would be implemented here')}
        >
          Start Processing
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnhancedBulkMediaUploadDialog;
