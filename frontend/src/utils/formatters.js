export const formatCurrency = (amount) => {
  if (!amount) return '—';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const costPerWear = (price, wornCount) => {
  if (!price || !wornCount || wornCount === 0) return null;
  return formatCurrency(price / wornCount);
};

export const getWarmthLabel = (warmth) => {
  const labels = { 1: 'Very Light', 2: 'Light', 3: 'Medium', 4: 'Warm', 5: 'Very Warm' };
  return labels[warmth] || 'Unknown';
};

export const getFormalityLabel = (formality) => {
  const labels = { 1: 'Very Casual', 2: 'Casual', 3: 'Smart Casual', 4: 'Formal', 5: 'Very Formal' };
  return labels[formality] || 'Unknown';
};

export const getWeatherEmoji = (description) => {
  const desc = description?.toLowerCase() || '';
  if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
  if (desc.includes('cloud')) return '⛅';
  if (desc.includes('sun') || desc.includes('clear')) return '☀️';
  if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
  if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
  if (desc.includes('snow')) return '❄️';
  return '🌤️';
};

export const getOccasionEmoji = (occasion) => {
  const map = {
    office: '💼', party: '🎉', casual: '👕', sports: '⚽',
    ethnic: '🎊', wedding: '💍', travel: '✈️',
  };
  return map[occasion] || '👔';
};
