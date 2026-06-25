import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Typography, Box, Chip, IconButton,
  Tooltip, Stack, Divider,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getOccasionEmoji } from '@utils/formatters';
import styles from './OutfitCard.module.scss';

const ScoreBadge = ({ label, score }) => (
  <Chip
    label={`${label} ${score}/10`}
    size="small"
    sx={{
      bgcolor: score >= 7 ? '#E8F5E9' : '#FFF3E0',
      color: score >= 7 ? '#2E7D32' : '#E65100',
      fontWeight: 600,
      fontSize: 11,
    }}
  />
);

ScoreBadge.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const GarmentPill = ({ garment }) => (
  <Box className={styles.garmentPill}>
    {garment.image_url ? (
      <Box component="img" src={garment.image_url} alt={garment.name} className={styles.pillImage} />
    ) : (
      <Box className={styles.pillPlaceholder}>
        <CheckroomIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
      </Box>
    )}
    <Typography variant="caption" noWrap sx={{ maxWidth: 72, fontSize: 10 }}>{garment.name}</Typography>
  </Box>
);

GarmentPill.propTypes = {
  garment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
};

const OutfitCard = ({ outfit, feedbackGiven, onLike, onSkip, onWore }) => {
  const weather = outfit.weather_context || {};

  return (
    <Card className={styles.root} elevation={0}>
      <CardContent className={styles.content}>
        <Box className={styles.header}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {getOccasionEmoji(outfit.occasion)} {outfit.name || 'Outfit Suggestion'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {weather.description} · {weather.temp}°C · {weather.city}
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <ScoreBadge label="Occasion" score={outfit.occasion_fit_score} />
            <ScoreBadge label="Weather" score={outfit.weather_fit_score} />
          </Stack>
        </Box>

        <Box className={styles.garments}>
          {outfit.items?.map((item) => (
            <GarmentPill key={item.id} garment={item.garment} />
          ))}
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box className={styles.aiSection}>
          <AutoAwesomeIcon sx={{ fontSize: 14, color: 'primary.main', mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {outfit.reason}
          </Typography>
        </Box>

        {outfit.style_tip && (
          <Box className={styles.tipSection}>
            <Typography variant="caption" fontWeight={600} color="secondary.dark">
              💡 Tip: {outfit.style_tip}
            </Typography>
          </Box>
        )}

        <Box className={styles.actions}>
          <Tooltip title="Love this look">
            <IconButton
              size="small"
              onClick={() => onLike(outfit.id)}
              color={feedbackGiven === 'like' ? 'success' : 'default'}
              disabled={!!feedbackGiven}
            >
              <ThumbUpAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Not for me">
            <IconButton
              size="small"
              onClick={() => onSkip(outfit.id)}
              color={feedbackGiven === 'skip' ? 'error' : 'default'}
              disabled={!!feedbackGiven}
            >
              <ThumbDownAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="I wore this today">
            <IconButton
              size="small"
              onClick={() => onWore(outfit.id)}
              color={feedbackGiven === 'wore' ? 'primary' : 'default'}
              disabled={!!feedbackGiven}
            >
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {feedbackGiven && (
            <Typography variant="caption" color="text.secondary" ml={1}>
              {feedbackGiven === 'like' && '👍 Liked!'}
              {feedbackGiven === 'skip' && '👎 Skipped'}
              {feedbackGiven === 'wore' && '✅ Marked worn!'}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

OutfitCard.propTypes = {
  outfit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    occasion: PropTypes.string.isRequired,
    weather_context: PropTypes.object,
    reason: PropTypes.string,
    style_tip: PropTypes.string,
    occasion_fit_score: PropTypes.number,
    weather_fit_score: PropTypes.number,
    items: PropTypes.array,
  }).isRequired,
  feedbackGiven: PropTypes.string,
  onLike: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  onWore: PropTypes.func.isRequired,
};

export default OutfitCard;
