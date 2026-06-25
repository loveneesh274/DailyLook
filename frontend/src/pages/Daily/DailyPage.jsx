import React, { useState } from 'react';
import {
  Box, Typography, Button, MenuItem, TextField,
  Alert, Stack, Chip, Paper,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import useRecommendations from '@hooks/useRecommendations';
import useAuth from '@hooks/useAuth';
import OutfitCard from '@components/common/OutfitCard/OutfitCard';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import { OCCASIONS } from '@constants/WARDROBE';
import { getWeatherEmoji, getOccasionEmoji } from '@utils/formatters';
import styles from './DailyPage.module.scss';

const WeatherBanner = ({ weather }) => {
  if (!weather) return null;
  return (
    <Paper className={styles.weatherBanner} elevation={0}>
      <Typography variant="h2" component="span" lineHeight={1}>{getWeatherEmoji(weather.description)}</Typography>
      <Box>
        <Typography variant="h6" fontWeight={700}>{weather.city} · {weather.temp}°C</Typography>
        <Typography variant="body2" color="text.secondary">
          {weather.description} · Feels like {weather.feels_like}°C · {weather.humidity}% humidity
        </Typography>
      </Box>
    </Paper>
  );
};

const DailyPage = () => {
  const { user } = useAuth();
  const { outfits, weather, loading, error, feedbackMap, getRecommendations, giveFeedback, markWorn, clear } =
    useRecommendations();
  const [occasion, setOccasion] = useState('office');

  const handleGenerate = () => {
    clear();
    getRecommendations(occasion);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.topSection}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Good morning{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}! 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            What's the occasion today? I'll suggest 3 outfits from your wardrobe.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
          <TextField
            select
            label="Occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
          >
            {OCCASIONS.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {getOccasionEmoji(o.value)} {o.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleGenerate}
            disabled={loading}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {outfits.length ? 'Refresh Outfits' : 'Suggest Outfits'}
          </Button>
        </Stack>
      </Box>

      {weather && <WeatherBanner weather={weather} />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box className={styles.loadingWrapper}>
          <LoadingSpinner message="Claude is styling your outfits…" />
          <Typography variant="caption" color="text.secondary" mt={1} display="block" textAlign="center">
            Analysing your wardrobe, weather &amp; preferences
          </Typography>
        </Box>
      )}

      {!loading && outfits.length === 0 && !error && (
        <Box className={styles.emptyState}>
          <Typography variant="h2">👔</Typography>
          <Typography variant="h6" fontWeight={600} mt={1}>Ready when you are</Typography>
          <Typography variant="body2" color="text.secondary">
            Select an occasion above and click <strong>Suggest Outfits</strong> to get 3 AI-curated looks from your wardrobe.
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" mt={2} flexWrap="wrap">
            {OCCASIONS.slice(0, 4).map((o) => (
              <Chip
                key={o.value}
                label={`${getOccasionEmoji(o.value)} ${o.label}`}
                onClick={() => setOccasion(o.value)}
                variant={occasion === o.value ? 'filled' : 'outlined'}
                color={occasion === o.value ? 'primary' : 'default'}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      )}

      {!loading && outfits.length > 0 && (
        <Stack spacing={2} className={styles.outfitList}>
          <Typography variant="subtitle2" color="text.secondary">
            {outfits.length} outfit{outfits.length !== 1 ? 's' : ''} for{' '}
            <strong>{OCCASIONS.find((o) => o.value === occasion)?.label || occasion}</strong>
          </Typography>
          {outfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              feedbackGiven={feedbackMap[outfit.id] || null}
              onLike={(id) => giveFeedback(id, 'like')}
              onSkip={(id) => giveFeedback(id, 'skip')}
              onWore={(id) => markWorn(id)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default DailyPage;
