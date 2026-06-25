import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Chip, Box, IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { getFormalityLabel, getWarmthLabel, formatDate } from '@utils/formatters';
import styles from './GarmentCard.module.scss';

const COLOR_SWATCH_MAP = {
  white: '#FFFFFF', black: '#000000', navy: '#001F5B', grey: '#9E9E9E',
  beige: '#F5F0E8', brown: '#795548', blue: '#1565C0', red: '#C62828',
  green: '#2E7D32', yellow: '#F9A825', orange: '#E65100', pink: '#E91E63',
  purple: '#6A1B9A', maroon: '#880E4F', olive: '#827717', teal: '#00695C',
  khaki: '#BDB76B', cream: '#FFFDE7', mustard: '#FF8F00', rust: '#BF360C',
  indigo: '#283593', coral: '#FF5722', mint: '#A5D6A7',
};

const GarmentCard = ({ garment, onDelete }) => {
  const imageSrc = garment.image_url || null;

  return (
    <Card className={styles.root} elevation={0}>
      <Box className={styles.imageWrapper}>
        {imageSrc ? (
          <CardMedia component="img" image={imageSrc} alt={garment.name} className={styles.image} />
        ) : (
          <Box className={styles.placeholder}>
            <CheckroomIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
          </Box>
        )}
        {onDelete && (
          <Tooltip title="Remove from wardrobe">
            <IconButton className={styles.deleteBtn} size="small" onClick={() => onDelete(garment.id)}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <CardContent className={styles.content}>
        <Typography variant="subtitle2" fontWeight={600} noWrap>{garment.name}</Typography>
        <Typography variant="caption" color="text.secondary" display="block" noWrap>
          {garment.subcategory || garment.category} {garment.brand ? `· ${garment.brand}` : ''}
        </Typography>

        <Box className={styles.colors}>
          {garment.colors?.slice(0, 4).map((color) => (
            <Tooltip key={color} title={color}>
              <Box
                className={styles.colorDot}
                sx={{
                  bgcolor: COLOR_SWATCH_MAP[color.toLowerCase()] || color,
                  border: color.toLowerCase() === 'white' ? '1px solid #eee' : 'none',
                }}
              />
            </Tooltip>
          ))}
        </Box>

        <Box className={styles.tags}>
          <Chip label={getFormalityLabel(garment.formality)} size="small" variant="outlined" sx={{ fontSize: 10 }} />
          <Chip label={getWarmthLabel(garment.warmth)} size="small" variant="outlined" sx={{ fontSize: 10 }} />
        </Box>

        <Typography variant="caption" color="text.disabled" display="block" mt={0.5}>
          Worn {garment.worn_count}x · Last: {formatDate(garment.last_worn_at)}
        </Typography>
      </CardContent>
    </Card>
  );
};

GarmentCard.propTypes = {
  garment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    warmth: PropTypes.number,
    formality: PropTypes.number,
    brand: PropTypes.string,
    image_url: PropTypes.string,
    worn_count: PropTypes.number,
    last_worn_at: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default GarmentCard;
