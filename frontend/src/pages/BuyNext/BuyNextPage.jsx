import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Card, CardContent, Chip,
  Stack, Alert, Grid, Divider, Link,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { fetchGaps } from '@store/gapSlice';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import { formatDate } from '@utils/formatters';
import styles from './BuyNextPage.module.scss';

const PRIORITY_COLOR = { high: 'error', medium: 'warning', low: 'default' };

const AffiliateButton = ({ link }) => (
  <Button
    component={Link}
    href={link.url}
    target="_blank"
    rel="noopener noreferrer nofollow"
    variant="outlined"
    size="small"
    endIcon={<OpenInNewIcon fontSize="inherit" />}
    sx={{ textTransform: 'none', fontSize: 12, borderRadius: 2 }}
  >
    {link.name}
  </Button>
);

const GapCard = ({ gap }) => (
  <Card className={styles.gapCard} elevation={0}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Typography variant="subtitle1" fontWeight={700}>{gap.category}</Typography>
        <Chip
          label={gap.priority}
          size="small"
          color={PRIORITY_COLOR[gap.priority] || 'default'}
          sx={{ textTransform: 'capitalize', fontWeight: 600 }}
        />
      </Stack>

      <Typography variant="body2" color="text.secondary" mb={1.5}>
        {gap.reason}
      </Typography>

      <Typography variant="caption" fontWeight={600} color="text.primary">
        💰 Budget: {gap.price_range}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      <Typography variant="caption" color="text.secondary" display="block" mb={1}>
        Shop on:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {gap.affiliate_links?.map((link) => (
          <AffiliateButton key={link.platform} link={link} />
        ))}
      </Stack>

      <Typography variant="caption" color="text.disabled" display="block" mt={1.5} sx={{ fontStyle: 'italic' }}>
        * As an Amazon Associate and affiliate partner, StyleMirror earns from qualifying purchases.
      </Typography>
    </CardContent>
  </Card>
);

const BuyNextPage = () => {
  const dispatch = useDispatch();
  const { gaps, generatedAt, loading, error } = useSelector((state) => state.gaps);

  useEffect(() => {
    if (gaps.length === 0) dispatch(fetchGaps());
  }, [dispatch, gaps.length]);

  const handleRefresh = () => dispatch(fetchGaps());

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Buy Next 🛍️</Typography>
          <Typography variant="body2" color="text.secondary">
            AI-identified gaps in your wardrobe with curated shopping links.
          </Typography>
          {generatedAt && (
            <Typography variant="caption" color="text.disabled">
              Last updated: {formatDate(generatedAt)}
            </Typography>
          )}
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && (
        <Box className={styles.loadingWrapper}>
          <LoadingSpinner message="Claude is analysing your wardrobe gaps…" />
        </Box>
      )}

      {!loading && gaps.length === 0 && !error && (
        <Box className={styles.emptyState}>
          <ShoppingBagIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>Add items to your wardrobe first</Typography>
          <Typography variant="body2" color="text.secondary">
            Once you have clothes in your wardrobe, Claude will identify what's missing and suggest where to buy it.
          </Typography>
        </Box>
      )}

      {!loading && gaps.length > 0 && (
        <>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Claude found <strong>{gaps.length} gap{gaps.length !== 1 ? 's' : ''}</strong> in your wardrobe.
            High priority items will have the most impact on your daily styling.
          </Alert>
          <Grid container spacing={2}>
            {gaps.map((gap, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <GapCard gap={gap} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default BuyNextPage;
