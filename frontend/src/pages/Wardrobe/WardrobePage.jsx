import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, TextField, MenuItem,
  InputAdornment, Alert, Chip, Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { fetchGarments, removeGarment } from '@store/garmentSlice';
import GarmentCard from '@components/common/GarmentCard/GarmentCard';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import { CATEGORIES } from '@constants/WARDROBE';
import styles from './WardrobePage.module.scss';

const ALL_FILTER = { value: '', label: 'All' };

const WardrobePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.garments);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    dispatch(fetchGarments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Remove this item from your wardrobe?')) {
      dispatch(removeGarment(id));
    }
  };

  const filtered = items.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.brand?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h5" fontWeight={700}>My Wardrobe 👕</Typography>
          <Typography variant="body2" color="text.secondary">
            {items.length} item{items.length !== 1 ? 's' : ''} in your closet
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/app/wardrobe/add')}>
          Add Item
        </Button>
      </Box>

      <Box className={styles.filters}>
        <TextField
          placeholder="Search by name or brand…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {[ALL_FILTER, ...CATEGORIES].map((cat) => (
            <Chip
              key={cat.value}
              label={cat.label}
              size="small"
              variant={categoryFilter === cat.value ? 'filled' : 'outlined'}
              color={categoryFilter === cat.value ? 'primary' : 'default'}
              onClick={() => setCategoryFilter(cat.value)}
            />
          ))}
        </Stack>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && <LoadingSpinner message="Loading your wardrobe…" />}

      {!loading && items.length === 0 && (
        <Box className={styles.emptyState}>
          <CheckroomIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>Your wardrobe is empty</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Add at least 5 items to start getting AI outfit suggestions.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/app/wardrobe/add')}>
            Add Your First Item
          </Button>
        </Box>
      )}

      {!loading && items.length > 0 && filtered.length === 0 && (
        <Box className={styles.emptyState}>
          <Typography variant="body1" color="text.secondary">No items match your search.</Typography>
        </Box>
      )}

      {!loading && filtered.length > 0 && (
        <Grid container spacing={2}>
          {filtered.map((garment) => (
            <Grid item xs={6} sm={4} md={3} key={garment.id}>
              <GarmentCard garment={garment} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WardrobePage;
