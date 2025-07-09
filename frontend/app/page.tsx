"use client";
import * as React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Container, 
  Stack, 
  Paper,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar
} from "@mui/material";
import { 
  TrendingUp, 
  AccountBalance, 
  Psychology, 
  RocketLaunch,
  PlayArrow,
  AccountTree,
  Star,
  Visibility,
  Speed,
  Map
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Jungle comic theme colors
const jungle = {
  darkGreen: "#184D27",
  olive: "#6B8E23",
  lightGreen: "#B7E4C7",
  saddleBrown: "#8B5C2A",
  goldenBrown: "#C6862A",
  wheat: "#F5DEB3",
  accent: "#FFD600",
};

// Optimized font stack for better performance and mobile compatibility
const comicFont = `'Arial Black', 'Impact', 'Comic Sans MS', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

const features = [
  {
    title: "Whale Tracking",
    description: "Track top whale wallets across Bitcoin, Ethereum, Solana, Base, and ICP with AI-powered relationship inference.",
    path: "/whale-tracking",
    color: "primary",
    icon: <Visibility />,
    stats: "1,247 whales tracked",
    gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
  },
  {
    title: "Portfolio Management", 
    description: "Aggregate and monitor your multichain wallets with real-time balances, PNL, and AI-driven insights.",
    path: "/portfolio",
    color: "secondary",
    icon: <AccountBalance />,
    stats: "$2.4B managed",
    gradient: "linear-gradient(135deg, #228B22 0%, #32CD32 100%)"
  },
  {
    title: "Alpha Feed",
    description: "Curated high-signal posts from X, Discord, and ICP forums with sentiment analysis and whale correlation.",
    path: "/alpha-feed", 
    color: "info",
    icon: <Psychology />,
    stats: "15K+ signals analyzed",
    gradient: "linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)"
  },
  {
    title: "Mind Map Visualizer",
    description: "Interactive visualization of wallet flows and relationships using D3.js with CEX endpoint flagging.",
    path: "/mind-map",
    color: "success",
    icon: <AccountTree />,
    stats: "Real-time flows",
    gradient: "linear-gradient(135deg, #556B2F 0%, #8FBC8F 100%)"
  }
];

const liveStats = [
  { label: "Total Value Locked", value: "$847M", change: "+12.4%", icon: <TrendingUp />, color: "#8B4513" },
  { label: "Active Users", value: "12.4K", change: "+8.2%", icon: <AccountBalance />, color: "#228B22" },
  { label: "Chains Supported", value: "5", change: "New: Base", icon: <AccountTree />, color: "#4169E1" },
  { label: "AI Signals", value: "2.1K", change: "+15.7%", icon: <Psychology />, color: "#556B2F" }
];

const testimonials = [
  {
    name: "Sofia Chen",
    role: "DeFi Trader",
    avatar: "S",
    content: "AlphaMap helped me track whale movements and discover alpha before anyone else. Game changer!",
    rating: 5,
    color: "#8B4513"
  },
  {
    name: "Jacob Rodriguez",
    role: "Portfolio Manager",
    avatar: "J", 
    content: "The mind map visualization is incredible. I can see wallet relationships instantly.",
    rating: 5,
    color: "#228B22"
  }
];

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentStat, setCurrentStat] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % liveStats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #2F4F2F 0%, #556B2F 50%, #8FBC8F 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: comicFont
    }}>
      {/* Jungle Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 139, 34, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(65, 105, 225, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      {/* Hero Section */}
      <Paper 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(34, 139, 34, 0.95) 50%, rgba(65, 105, 225, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          color: jungle.wheat,
          py: { xs: 8, md: 12 },
          mb: { xs: 6, md: 10 },
          mt: { xs: 8, md: 10 }, // Add top margin to account for fixed navbar
          position: 'relative',
          overflow: 'hidden',
          border: '3px solid #8B4513',
          borderRadius: 3
        }}
      >
        {/* Hero background decoration */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 70%, rgba(245, 222, 179, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(245, 222, 179, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(245, 222, 179, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: { xs: 3, md: 4 },
              gap: 2
            }}>
              <Map sx={{ 
                fontSize: { xs: 48, md: 64 }, 
                color: jungle.wheat,
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }} />
              <Typography 
                variant="h1"
                fontWeight={700} 
                sx={{ 
                  background: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  fontFamily: comicFont,
                  fontSize: '4rem',
                  textAlign: 'center'
                }}
              >
                AlphaMap
              </Typography>
            </Box>
            <Typography 
              variant="h4"
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                opacity: 0.95,
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontFamily: comicFont,
                textAlign: 'center',
                color: jungle.wheat,
                fontSize: '2rem'
              }}
            >
              Your Web3 Intelligence Platform
            </Typography>
            <Typography 
              variant="h6"
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                opacity: 0.9,
                fontWeight: 500,
                px: { xs: 2, md: 0 },
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                fontFamily: comicFont,
                textAlign: 'center',
                color: jungle.wheat,
                fontSize: '1.2rem'
              }}
            >
              Track whales, manage portfolios, discover alpha, and visualize connections across the blockchain jungle.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              sx={{ mb: { xs: 4, md: 6 } }}
            >
              <Button 
                variant="contained" 
                size="large"
                onClick={() => router.push('/portfolio')}
                sx={{ 
                  background: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)',
                  color: jungle.saddleBrown,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  border: '3px solid #F5DEB3',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #DEB887 0%, #F5DEB3 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(245, 222, 179, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <PlayArrow sx={{ mr: 1 }} />
                Start Exploring
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => router.push('/portfolio')}
                sx={{ 
                  borderColor: jungle.wheat,
                  color: jungle.wheat,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  border: '3px solid',
                  '&:hover': {
                    background: 'rgba(245, 222, 179, 0.1)',
                    borderColor: '#DEB887',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(245, 222, 179, 0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                View Portfolio
              </Button>
            </Stack>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Live Stats Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 3, md: 4 },
              color: jungle.wheat,
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: comicFont,
              fontSize: '2.5rem'
            }}
          >
            🌿 Live Jungle Stats
          </Typography>
          <Grid container columns={12} spacing={3}>
            {liveStats.map((stat, index) => (
              <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }} key={stat.label}>
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                    borderColor: '#D2691E'
                  }
                }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: stat.color,
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      border: '3px solid #8B4513'
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#8B4513', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#556B2F', mb: 2, fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                    <Chip 
                      label={stat.change} 
                      size="small"
                      sx={{ 
                        background: '#228B22',
                        color: jungle.wheat,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: '2px solid #8B4513'
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 3, md: 4 },
              color: jungle.wheat,
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: comicFont,
              fontSize: '2.5rem'
            }}
          >
            🗺️ Jungle Features
          </Typography>
          <Grid container columns={12} spacing={3}>
            {features.map((feature, index) => (
              <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }} key={feature.title}>
                <Card 
                  onClick={() => router.push(feature.path)}
                  sx={{ 
                    background: 'rgba(245, 222, 179, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '3px solid #8B4513',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                      borderColor: '#D2691E'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Box sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: feature.gradient,
                        borderRadius: '50%',
                        border: '3px solid #8B4513'
                      }}>
                        <Box sx={{ color: jungle.wheat, fontSize: 40 }}>
                          {feature.icon}
                        </Box>
                      </Box>
                      <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#8B4513', fontFamily: comicFont }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, color: '#556B2F', lineHeight: 1.6, fontFamily: comicFont }}>
                        {feature.description}
                      </Typography>
                    </Box>
                    <Box>
                      <Chip 
                        label={feature.stats} 
                        size="small"
                        sx={{ 
                          background: '#228B22',
                          color: jungle.wheat,
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          border: '2px solid #8B4513',
                          fontFamily: comicFont
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 3, md: 4 },
              color: jungle.wheat,
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: comicFont,
              fontSize: '2.5rem'
            }}
          >
            🌟 Explorer Testimonials
          </Typography>
          <Grid container columns={12} spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }} key={testimonial.name}>
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                    borderColor: '#D2691E'
                  }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                      <Avatar sx={{ 
                        bgcolor: testimonial.color,
                        width: 60,
                        height: 60,
                        mr: 2,
                        border: '3px solid #8B4513'
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 0.5 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#556B2F', mb: 1 }}>
                          {testimonial.role}
                        </Typography>
                        <Stack direction="row" spacing={0.5} sx={{ ml: 'auto' }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} sx={{ color: jungle.accent, fontSize: 20 }} />
                          ))}
                        </Stack>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#556B2F', lineHeight: 1.6, fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: jungle.wheat,
              fontWeight: 700,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: comicFont,
              fontSize: '2.5rem'
            }}
          >
            🚀 Ready to Explore the Jungle?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: jungle.wheat,
              mb: 4,
              opacity: 0.9,
              fontFamily: comicFont
            }}
          >
            Join thousands of explorers discovering alpha in the Web3 jungle.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => router.push('/portfolio')}
            sx={{ 
              background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
              color: jungle.wheat,
              fontWeight: 700,
              fontSize: '1.2rem',
              py: 2,
              px: 6,
              borderRadius: 3,
              border: '3px solid #8B4513',
              '&:hover': {
                background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(34, 139, 34, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Start Your Journey
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
