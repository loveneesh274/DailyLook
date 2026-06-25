import React from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Stack,
  Rating,
} from '@mui/material';
import {
  PlayArrow,
  CloudUpload,
  Psychology,
  Checkroom,
  WbSunny,
  Work,
  Celebration,
  BeachAccess,
  Flight,
  Weekend,
  Star,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '10K+', label: 'Outfits Generated' },
    { value: '5K+', label: 'Items Uploaded' },
    { value: '500+', label: 'Happy Users' },
    { value: '4.8', label: 'App Store Rating', icon: <Star sx={{ color: '#FFB800', fontSize: 18 }} /> },
  ];

  const categories = [
    { name: 'Dresses', count: 24, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop' },
    { name: 'Tops', count: 18, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop' },
    { name: 'Bottoms', count: 16, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' },
    { name: 'Shoes', count: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
    { name: 'Bags', count: 8, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop' },
    { name: 'Accessories', count: 15, image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=200&h=200&fit=crop' },
    { name: 'Jackets', count: 9, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop' },
  ];

  const steps = [
    { num: 1, title: 'Upload', desc: 'Add photos of your clothes, shoes & accessories.', icon: <CloudUpload /> },
    { num: 2, title: 'AI Understands', desc: 'Our AI learns your style, colors & preferences.', icon: <Psychology /> },
    { num: 3, title: 'Get Styled', desc: 'Get perfect outfit ideas for any occasion.', icon: <Checkroom /> },
  ];

  const occasions = [
    { name: 'All', icon: null, active: true },
    { name: 'Date Night', icon: <Celebration fontSize="small" /> },
    { name: 'Work', icon: <Work fontSize="small" /> },
    { name: 'Casual', icon: <Weekend fontSize="small" /> },
    { name: 'Party', icon: <Celebration fontSize="small" /> },
    { name: 'Travel', icon: <Flight fontSize="small" /> },
    { name: 'Vacation', icon: <BeachAccess fontSize="small" /> },
  ];

  const outfitCards = [
    { title: 'Dinner Date', match: 96, items: ['Silk top', 'Wide leg pants', 'Heels'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop' },
    { title: 'Weekend Brunch', match: 93, items: ['Linen shirt', 'Midi skirt', 'Sandals'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop' },
    { title: 'Client Meeting', match: 95, items: ['Blazer', 'Trousers', 'Loafers'], image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=300&h=400&fit=crop' },
    { title: 'Beach Vacation', match: 91, items: ['Maxi dress', 'Sun hat', 'Flats'], image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop' },
    { title: 'Evening Party', match: 94, items: ['Sequin dress', 'Clutch', 'Heels'], image: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=300&h=400&fit=crop' },
  ];

  const insights = [
    { icon: <CheckCircle />, text: 'See what you wear most' },
    { icon: <CheckCircle />, text: 'Find unused items' },
    { icon: <CheckCircle />, text: 'Discover new combinations' },
    { icon: <CheckCircle />, text: 'Save money & shop smarter' },
  ];

  const testimonials = [
    { name: 'Priya S.', location: 'Mumbai, India', text: '"Daily Look has literally changed my mornings. I save so much time and always feel put together!"', rating: 5, avatar: 'P' },
    { name: 'Ananya R.', location: 'Delhi, India', text: '"I discovered so many outfits I never knew I had. It\'s like having a personal stylist in my pocket."', rating: 5, avatar: 'A' },
    { name: 'Sneha M.', location: 'Bangalore, India', text: '"The pairing feature is a game-changer for my trips. I never overpack anymore!"', rating: 5, avatar: 'S' },
  ];

  return (
    <Box className={styles.landing}>
      {/* Navigation */}
      <Box component="nav" className={styles.nav}>
        <Container maxWidth="xl">
          <Box className={styles.navInner}>
            <Typography variant="h5" fontWeight={700} className={styles.logo}>
              Daily Look
            </Typography>
            <Box className={styles.navLinks}>
              <Button color="inherit">Home</Button>
              <Button color="inherit">How It Works</Button>
              <Button color="inherit">Features</Button>
              <Button color="inherit">About Us</Button>
            </Box>
            <Box className={styles.navActions}>
              <Button color="inherit" onClick={() => navigate('/login')}>Log In</Button>
              <Button variant="contained" onClick={() => navigate('/register')}>Get Started</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box className={styles.hero}>
        <Box className={styles.heroInner}>
          {/* Left Content */}
          <Box className={styles.heroLeft}>
            <Chip label="✨ YOUR STYLE. PERFECTED." className={styles.heroBadge} />
            <Typography variant="h1" className={styles.heroTitle}>
              Never Worry About What To <br />Wear <em>Again.</em>
            </Typography>
            <Typography variant="body1" className={styles.heroSubtitle}>
              Upload your wardrobe and let our AI stylist<br />create perfect outfits for every occasion.
            </Typography>
            <Box className={styles.heroActions}>
              <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/register')} className={styles.heroBtn}>
                Build My Closet
              </Button>
              <Button variant="outlined" size="large" startIcon={<PlayArrow />} className={styles.heroBtnOutline}>
                Watch Demo
              </Button>
            </Box>
            <Box className={styles.heroSocial}>
              <Box className={styles.avatarGroup}>
                {[20, 21, 22].map((i) => (
                  <Avatar key={i} className={styles.avatar} src={`https://i.pravatar.cc/40?img=${i}`} />
                ))}
              </Box>
              <Box className={styles.socialText}>
                <Typography variant="body2" fontWeight={700}>250K+</Typography>
                <Typography variant="caption" color="text.secondary">Happy Women</Typography>
              </Box>
              <Box className={styles.brandLogos}>
                <Typography variant="caption" className={styles.seenIn}>As seen in</Typography>
                <Box className={styles.magazineLogos}>
                  <span className={styles.magVogue}>VOGUE</span>
                  <span className={styles.magElle}>ELLE</span>
                  <span className={styles.magBazaar}>BAZAAR</span>
                  <span className={styles.magInstyle}>InStyle</span>
                  <span className={styles.magCosmo}>COSMOPOLITAN</span>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right - Model Image with Card */}
          <Box className={styles.heroRight}>
            <Box className={styles.heroImageMain}>
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=800&fit=crop" alt="Woman in beige outfit in luxury closet" />
            </Box>
            <Card className={styles.heroCard}>
              <CardContent className={styles.heroCardContent}>
                <Typography variant="caption" className={styles.cardLabel}>
                  ✨ AI Recommended Look
                </Typography>
                <Box className={styles.outfitGrid}>
                  <img src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=240&h=260&fit=crop" alt="Formal Shirt" />
                  <img src="https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=640&h=660&fit=crop" alt="T-Shirt" />
                  <img src="https://images.unsplash.com/photo-1598032895455-526c9e347a87?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Pants" />
                  <img src="https://media.istockphoto.com/id/1173486515/photo/buckle-up-youre-about-to-get-married.webp?s=1024x1024&w=is&k=20&c=ItxJOTV9ZxAox5-GqjM4-wDdX7MOssRo0wVr4YP6LTY=" alt="Tie" />
                  <img src="https://images.unsplash.com/photo-1695345272166-4efd76dd7a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0Y2glMjBtZW58ZW58MHx8MHx8fDA%3D?w=420&h=420&fit=crop" alt="Watch" />
                  <img src="https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNuZWFrZXJzfGVufDB8fDB8fHww?w=420&h=520&fit=crop" alt="Shoes" />
                  
                </Box>
                <Box className={styles.matchScore}>
                  <Typography variant="body2" color="text.secondary">Match Score</Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#D4A574' }}>98%</Typography>
                </Box>
                <Box className={styles.matchBar}>
                  <Box className={styles.matchBarFill} sx={{ width: '98%' }} />
                </Box>
                <Button fullWidth variant="contained" className={styles.viewLookBtn} endIcon={<ArrowForward />}>
                  View Full Look
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Box className={styles.statsBar}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box className={styles.statItem}>
                  <Typography variant="h4" fontWeight={700}>{stat.value} {stat.icon}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Digital Closet Section */}
      <Box className={styles.closetSection}>
        <Container maxWidth="xl">
          <Box className={styles.closetInner}>
            {/* Left Content */}
            <Box className={styles.closetLeft}>
              <Typography variant="overline" className={styles.sectionLabel}>
                BUILD YOUR DIGITAL CLOSET
              </Typography>
              <Typography variant="h3" className={styles.closetTitle}>
                Upload Once,<br />Style Forever.
              </Typography>
              <Typography variant="body1" color="text.secondary" className={styles.closetDesc}>
                Add everything you own in one place. Our AI will do the magic.
              </Typography>
              <Button variant="contained" className={styles.uploadBtn} endIcon={<CloudUpload />} onClick={() => navigate('/register')}>
                Upload Your Wardrobe
              </Button>
              <Box className={styles.learnLink}>
                <PlayArrow fontSize="small" />
                <Typography variant="body2">Learn how it works</Typography>
              </Box>
            </Box>

            {/* Right - Horizontal Category Cards */}
            <Box className={styles.closetRight}>
              <Box className={styles.categoryRow}>
                {categories.map((cat, i) => (
                  <Box className={styles.categoryCard} key={i}>
                    <Box className={styles.categoryImage}>
                      <img src={cat.image} alt={cat.name} />
                    </Box>
                    <Typography variant="body2" fontWeight={600} className={styles.categoryName}>{cat.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{cat.count} items</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box className={styles.howItWorks}>
        <Container maxWidth="xl">
          <Box className={styles.howInner}>
            {/* Left - Steps */}
            <Box className={styles.howLeft}>
              <Typography variant="overline" className={styles.howLabel}>
                HOW IT WORKS
              </Typography>
              <Typography variant="h3" className={styles.howTitle}>
                Your Personal Stylist in 3 Simple Steps
              </Typography>
              <Box className={styles.stepsList}>
                {steps.map((step, i) => (
                  <Box className={styles.stepRow} key={i}>
                    <Box className={styles.stepNum}>{step.num}</Box>
                    <Box className={styles.stepText}>
                      <Box className={styles.stepHeading}>
                        <Box className={styles.stepIcon}>{step.icon}</Box>
                        <Typography variant="h6" fontWeight={600}>{step.title}</Typography>
                      </Box>
                      <Typography variant="body2" className={styles.stepDesc}>{step.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right - AI Recommended Look Card */}
            <Box className={styles.howRight}>
              <Card className={styles.howCard}>
                <CardContent className={styles.heroCardContent}>
                  <Typography variant="caption" className={styles.cardLabel}>
                    ✨ AI Recommended Look
                  </Typography>
                  <Box className={styles.outfitGrid}>
                    <img src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=240&h=260&fit=crop" alt="Formal Shirt" />
                    <img src="https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="T-Shirt" />
                    <img src="https://images.unsplash.com/photo-1598032895455-526c9e347a87?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Pants" />
                    <img src="https://media.istockphoto.com/id/1173486515/photo/buckle-up-youre-about-to-get-married.webp?s=1024x1024&w=is&k=20&c=ItxJOTV9ZxAox5-GqjM4-wDdX7MOssRo0wVr4YP6LTY=" alt="Tie" />
                    <img src="https://images.unsplash.com/photo-1695345272166-4efd76dd7a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0Y2glMjBtZW58ZW58MHx8MHx8fDA%3D" alt="Watch" />
                    <img src="https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNuZWFrZXJzfGVufDB8fDB8fHww" alt="Shoes" />
                  </Box>
                  <Box className={styles.matchScore}>
                    <Typography variant="body2" color="text.secondary">Match Score</Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#D4A574' }}>98%</Typography>
                  </Box>
                  <Box className={styles.matchBar}>
                    <Box className={styles.matchBarFill} sx={{ width: '98%' }} />
                  </Box>
                  <Button fullWidth variant="contained" className={styles.viewLookBtn} endIcon={<ArrowForward />}>
                    View Full Look
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Outfits for Every Occasion */}
      <Box className={`${styles.section} ${styles.occasionSection}`}>
        <Container maxWidth="xl">
          <Box className={styles.occasionHeader}>
            <Typography variant="overline" className={styles.occasionLabel}>
              OUTFITS FOR EVERY OCCASION
            </Typography>
            <Box className={styles.occasionTabs}>
              {occasions.map((occ, i) => (
                <Box
                  key={i}
                  className={`${styles.occasionTab} ${occ.active ? styles.occasionTabActive : ''}`}
                >
                  {occ.name}
                </Box>
              ))}
            </Box>
          </Box>
          <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
            {outfitCards.map((outfit, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card className={styles.outfitCard}>
                  <Box className={styles.outfitImage}>
                    <img src={outfit.image} alt={outfit.title} />
                    <Chip label={`Match Score: ${outfit.match}%`} className={styles.matchChip} size="small" />
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>{outfit.title}</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                      {outfit.items.map((item, j) => (
                        <Chip key={j} label={item} size="small" variant="outlined" sx={{ mb: 0.5 }} />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Wardrobe Insights */}
      <Box className={styles.section} sx={{ bgcolor: 'background.warm' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="text.secondary">SMARTER WARDROBE INSIGHTS</Typography>
              <Typography variant="h3" className={styles.sectionTitle} sx={{ textAlign: 'left' }}>
                Understand Your Closet Like Never Before.
              </Typography>
              <Stack spacing={2} mt={3}>
                {insights.map((item, i) => (
                  <Box key={i} className={styles.insightItem}>
                    <Box className={styles.insightIcon}>{item.icon}</Box>
                    <Typography variant="body1">{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
              <Button variant="contained" sx={{ mt: 4 }} endIcon={<ArrowForward />}>
                View My Insights
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={styles.insightsVisual}>
                <Card className={styles.insightCard}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Wardrobe Overview</Typography>
                    <Box className={styles.pieChart}>
                      <Typography variant="h2" fontWeight={700}>387</Typography>
                      <Typography variant="caption">Total Items</Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Card className={styles.insightCard}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">You've Saved</Typography>
                    <Typography variant="h3" fontWeight={700} color="secondary">₹24,300</Typography>
                    <Typography variant="caption">By styling what you own</Typography>
                  </CardContent>
                </Card>
                <Card className={styles.insightCard}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Closet Efficiency</Typography>
                    <Typography variant="h3" fontWeight={700}>78%</Typography>
                    <Typography variant="caption">You wear 78% of your closet</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box className={styles.section}>
        <Container maxWidth="lg">
          <Typography variant="overline" color="text.secondary" className={styles.sectionLabel}>
            LOVED BY REAL WOMEN
          </Typography>
          <Typography variant="h3" className={styles.sectionTitle}>
            Real stories. Real confidence.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card className={styles.testimonialCard}>
                  <CardContent>
                    <Rating value={t.rating} readOnly size="small" sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3 }}>{t.text}</Typography>
                    <Box className={styles.testimonialAuthor}>
                      <Avatar sx={{ bgcolor: '#D4A574' }}>{t.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{t.location}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className={styles.ctaSection}>
        <Container maxWidth="md">
          <Typography variant="h3" color="white" fontWeight={700} textAlign="center">
            Ready to transform your wardrobe?
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.8)" textAlign="center" mt={2}>
            Join thousands of women who are dressing smarter, not harder.
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.9)" textAlign="center" mt={2} fontStyle="italic">
            From closet chaos to calm.
          </Typography>
          <Box className={styles.ctaButtons}>
            <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: '#1A1A1A', '&:hover': { bgcolor: '#f5f5f5' } }}>
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" className={styles.footer}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight={700} mb={2}>Daily Look</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Your AI-powered personal stylist. From closet chaos to calm.
              </Typography>
              <Box className={styles.appBadges}>
                <Button variant="outlined" size="small">App Store</Button>
                <Button variant="outlined" size="small">Google Play</Button>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Product</Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">Features</Typography>
                <Typography variant="body2" color="text.secondary">How It Works</Typography>
                <Typography variant="body2" color="text.secondary">FAQ</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Company</Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">About Us</Typography>
                <Typography variant="body2" color="text.secondary">Blog</Typography>
                <Typography variant="body2" color="text.secondary">Careers</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Legal</Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">Privacy Policy</Typography>
                <Typography variant="body2" color="text.secondary">Terms of Service</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Connect</Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">Instagram</Typography>
                <Typography variant="body2" color="text.secondary">Twitter</Typography>
                <Typography variant="body2" color="text.secondary">LinkedIn</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box className={styles.footerBottom}>
            <Typography variant="caption" color="text.secondary">
              © 2026 Daily Look. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
