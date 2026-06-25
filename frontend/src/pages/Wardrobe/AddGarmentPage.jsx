import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box, Typography, Button, TextField, MenuItem, Grid,
  Slider, Chip, Alert, Stack, Paper, LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addGarment } from '@store/garmentSlice';
import apiClient from '@services/api';
import { API_ENDPOINTS } from '@constants/API_ENDPOINTS';
import { CATEGORIES, SUBCATEGORIES, SEASONS, OCCASIONS, COLORS } from '@constants/WARDROBE';
import styles from './AddGarmentPage.module.scss';

const schema = yup.object({
  name: yup.string().required('Item name is required'),
  category: yup.string().required('Category is required'),
  colors: yup.array().min(1, 'Select at least one color'),
  warmth: yup.number().min(1).max(5).required(),
  formality: yup.number().min(1).max(5).required(),
  seasons: yup.array().min(1, 'Select at least one season'),
  occasions: yup.array().min(1, 'Select at least one occasion'),
});

const WARMTH_MARKS = [
  { value: 1, label: 'Very Light' }, { value: 3, label: 'Medium' }, { value: 5, label: 'Very Warm' },
];

const FORMALITY_MARKS = [
  { value: 1, label: 'Casual' }, { value: 3, label: 'Smart' }, { value: 5, label: 'Formal' },
];

const AddGarmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '', category: 'top', subcategory: '', brand: '', size: '',
      purchase_price: '', colors: [], warmth: 2, formality: 2,
      seasons: [], occasions: [], notes: '',
    },
  });

  const selectedCategory = watch('category');

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await apiClient.post(API_ENDPOINTS.MEDIA.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(data.url);
    } catch {
      setSubmitError('Image upload failed. You can add the item without a photo.');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitError('');
    const payload = {
      ...data,
      purchase_price: data.purchase_price ? parseFloat(data.purchase_price) : null,
      image_url: imageUrl || null,
    };
    const result = await dispatch(addGarment(payload));
    if (addGarment.fulfilled.match(result)) {
      navigate('/app/wardrobe');
    } else {
      setSubmitError(result.payload || 'Failed to add item');
    }
  };

  return (
    <Box className={styles.root}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/app/wardrobe')} sx={{ mb: 1 }}>
        Back to Wardrobe
      </Button>
      <Typography variant="h5" fontWeight={700} mb={3}>Add New Item 👕</Typography>

      {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={styles.imagePanel} elevation={0}>
              <Box className={styles.imagePreview}>
                {imageUrl ? (
                  <Box component="img" src={imageUrl} alt="Preview" className={styles.previewImg} />
                ) : (
                  <Box className={styles.uploadPrompt}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
                    <Typography variant="body2" color="text.secondary" mt={1}>Upload photo</Typography>
                    <Typography variant="caption" color="text.disabled">JPG, PNG, WEBP</Typography>
                  </Box>
                )}
              </Box>
              {uploading && <LinearProgress sx={{ borderRadius: 1 }} />}
              <Button
                component="label"
                variant="outlined"
                fullWidth
                disabled={uploading}
                sx={{ mt: 1.5 }}
              >
                {uploading ? 'Uploading…' : imageUrl ? 'Change Photo' : 'Upload Photo'}
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={2.5}>
              <TextField
                label="Item Name *"
                fullWidth
                placeholder="e.g. White Formal Shirt"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField select label="Category *" fullWidth defaultValue="top" {...register('category')} error={!!errors.category}>
                    {CATEGORIES.map((c) => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField select label="Subcategory" fullWidth defaultValue="" {...register('subcategory')}>
                    <MenuItem value="">None</MenuItem>
                    {(SUBCATEGORIES[selectedCategory] || []).map((s) => (
                      <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Brand" fullWidth {...register('brand')} placeholder="e.g. Peter England" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Size" fullWidth {...register('size')} placeholder="M" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Price (₹)" fullWidth type="number" {...register('purchase_price')} placeholder="1200" />
                </Grid>
              </Grid>

              <Box>
                <Typography variant="subtitle2" mb={1} fontWeight={600}>Colors *</Typography>
                <Controller
                  name="colors"
                  control={control}
                  render={({ field }) => (
                    <Box className={styles.chipGroup}>
                      {COLORS.map((color) => (
                        <Chip
                          key={color}
                          label={color}
                          size="small"
                          variant={field.value.includes(color) ? 'filled' : 'outlined'}
                          color={field.value.includes(color) ? 'primary' : 'default'}
                          onClick={() => {
                            const next = field.value.includes(color)
                              ? field.value.filter((c) => c !== color)
                              : [...field.value, color];
                            field.onChange(next);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                />
                {errors.colors && <Typography variant="caption" color="error">{errors.colors.message}</Typography>}
              </Box>

              <Box>
                <Typography variant="subtitle2" mb={1} fontWeight={600}>Seasons *</Typography>
                <Controller
                  name="seasons"
                  control={control}
                  render={({ field }) => (
                    <Box className={styles.chipGroup}>
                      {SEASONS.map((s) => (
                        <Chip
                          key={s.value}
                          label={s.label}
                          size="small"
                          variant={field.value.includes(s.value) ? 'filled' : 'outlined'}
                          color={field.value.includes(s.value) ? 'secondary' : 'default'}
                          onClick={() => {
                            const next = field.value.includes(s.value)
                              ? field.value.filter((v) => v !== s.value)
                              : [...field.value, s.value];
                            field.onChange(next);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                />
                {errors.seasons && <Typography variant="caption" color="error">{errors.seasons.message}</Typography>}
              </Box>

              <Box>
                <Typography variant="subtitle2" mb={1} fontWeight={600}>Occasions *</Typography>
                <Controller
                  name="occasions"
                  control={control}
                  render={({ field }) => (
                    <Box className={styles.chipGroup}>
                      {OCCASIONS.map((o) => (
                        <Chip
                          key={o.value}
                          label={o.label}
                          size="small"
                          variant={field.value.includes(o.value) ? 'filled' : 'outlined'}
                          color={field.value.includes(o.value) ? 'primary' : 'default'}
                          onClick={() => {
                            const next = field.value.includes(o.value)
                              ? field.value.filter((v) => v !== o.value)
                              : [...field.value, o.value];
                            field.onChange(next);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                />
                {errors.occasions && <Typography variant="caption" color="error">{errors.occasions.message}</Typography>}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight={600} mb={2}>
                    Warmth Level: <strong>{watch('warmth')}/5</strong>
                  </Typography>
                  <Controller
                    name="warmth"
                    control={control}
                    render={({ field }) => (
                      <Slider {...field} min={1} max={5} step={1} marks={WARMTH_MARKS} valueLabelDisplay="auto" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight={600} mb={2}>
                    Formality: <strong>{watch('formality')}/5</strong>
                  </Typography>
                  <Controller
                    name="formality"
                    control={control}
                    render={({ field }) => (
                      <Slider {...field} min={1} max={5} step={1} marks={FORMALITY_MARKS} valueLabelDisplay="auto" color="secondary" />
                    )}
                  />
                </Grid>
              </Grid>

              <TextField label="Notes (optional)" fullWidth multiline rows={2} {...register('notes')} placeholder="Any care instructions, fit notes…" />

              <Stack direction="row" spacing={2}>
                <Button variant="outlined" fullWidth onClick={() => navigate('/app/wardrobe')}>Cancel</Button>
                <Button type="submit" variant="contained" fullWidth disabled={isSubmitting || uploading}>
                  {isSubmitting ? 'Saving…' : 'Add to Wardrobe'}
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddGarmentPage;
