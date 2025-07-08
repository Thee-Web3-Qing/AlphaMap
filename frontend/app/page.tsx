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
  Speed
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Whale Tracking",
    description: "Track top whale wallets across Bitcoin, Ethereum, Solana, Base, and ICP with AI-powered relationship inference.",
    path: "/whale-tracking",
    color: "primary",
    icon: <AccountTree />,
    stats: "1,247 whales tracked",
    gradient: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)"
  },
  {
    title: "Portfolio Management", 
    description: "Aggregate and monitor your multichain wallets with real-time balances, PNL, and AI-driven insights.",
    path: "/portfolio",
    color: "secondary",
    icon: <AccountBalance />,
    stats: "$2.4B managed",
    gradient: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)"
  },
  {
    title: "Alpha Feed",
    description: "Curated high-signal posts from X, Discord, and ICP forums with sentiment analysis and whale correlation.",
    path: "/alpha-feed", 
    color: "info",
    icon: <Psychology />,
    stats: "15K+ signals analyzed",
    gradient: "linear-gradient(135deg, #0288d1 0%, #29b6f6 100%)"
  },
  {
    title: "Mind Map Visualizer",
    description: "Interactive visualization of wallet flows and relationships using D3.js with CEX endpoint flagging.",
    path: "/mind-map",
    color: "success",
    icon: <TrendingUp />,
    stats: "Real-time flows",
    gradient: "linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)"
  }
];

const liveStats = [
  { label: "Total Value Locked", value: "$847M", change: "+12.4%", icon: <TrendingUp />, color: "#1976d2" },
  { label: "Active Users", value: "12.4K", change: "+8.2%", icon: <AccountBalance />, color: "#2e7d32" },
  { label: "Chains Supported", value: "5", change: "New: Base", icon: <AccountTree />, color: "#0288d1" },
  { label: "AI Signals", value: "2.1K", change: "+15.7%", icon: <Psychology />, color: "#388e3c" }
];

const testimonials = [
  {
    name: "Sofia Chen",
    role: "DeFi Trader",
    avatar: "S",
    content: "AlphaMap helped me track whale movements and discover alpha before anyone else. Game changer!",
    rating: 5,
    color: "#1976d2"
  },
  {
    name: "Jacob Rodriguez",
    role: "Portfolio Manager",
    avatar: "J", 
    content: "The mind map visualization is incredible. I can see wallet relationships instantly.",
    rating: 5,
    color: "#2e7d32"
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
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(25, 118, 210, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(46, 125, 50, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      {/* Hero Section */}
      <Paper 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(46, 125, 50, 0.95) 50%, rgba(123, 31, 162, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: { xs: 4, md: 8 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Hero background decoration */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center">
            <Typography 
              variant={isSmallMobile ? "h3" : isMobile ? "h2" : "h1"}
              fontWeight={700} 
              gutterBottom
              sx={{ 
                mb: { xs: 2, md: 3 },
                background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              🗺️ AlphaMap
            </Typography>
            <Typography 
              variant={isMobile ? "h6" : "h4"}
              sx={{ 
                mb: { xs: 3, md: 5 }, 
                opacity: 0.95,
                fontWeight: 300,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              Decentralized Web3 Intelligence Platform
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"}
              sx={{ 
                mb: { xs: 4, md: 7 }, 
                maxWidth: 800, 
                mx: 'auto', 
                opacity: 0.9,
                lineHeight: 1.7,
                px: { xs: 2, md: 0 },
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              Track whales, manage portfolios, and discover alpha across multiple chains. 
              Built on ICP with zero user fees and AI-powered insights.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 2, sm: 3 }} 
              justifyContent="center"
              sx={{ mb: { xs: 4, md: 7 } }}
            >
              <Button 
                variant="contained" 
                size="large"
                onClick={() => router.push('/whale-tracking')}
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  color: 'primary.main', 
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  fontWeight: 700,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': { 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                startIcon={<RocketLaunch />}
              >
                Start Tracking
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => router.push('/portfolio')}
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.8)', 
                  color: 'white', 
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  borderWidth: 2,
                  '&:hover': { 
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                startIcon={<PlayArrow />}
              >
                View Portfolio
              </Button>
            </Stack>

            {/* Live Stats */}
            <Paper 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                p: { xs: 2, md: 3 },
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid xs={8}>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    {liveStats[currentStat].label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ color: liveStats[currentStat].color }}>
                    {liveStats[currentStat].value}
                  </Typography>
                </Grid>
                <Grid xs={4} textAlign="right">
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end',
                    mb: 1
                  }}>
                    {liveStats[currentStat].icon}
                  </Box>
                  <Chip 
                    label={liveStats[currentStat].change} 
                    size="small"
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 10 } }}>
        <Box textAlign="center" sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            fontWeight={700} 
            gutterBottom
            sx={{ mb: 2 }}
          >
            Platform Features
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Everything you need to track, analyze, and profit from Web3 intelligence
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {features.map((feature, index) => (
            <Grid xs={12} sm={6} md={6} key={feature.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }
                }}
                onClick={() => router.push(feature.path)}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    {/* Header */}
                    <Box sx={{ 
                      background: feature.gradient,
                      borderRadius: 2,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        width: 48,
                        height: 48
                      }}>
                        {feature.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="white">
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                          {feature.stats}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {feature.description}
                    </Typography>

                    {/* Action */}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: `${feature.color}.main`,
                        color: `${feature.color}.main`,
                        fontWeight: 600,
                        '&:hover': {
                          background: `${feature.color}.main`,
                          color: 'white',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Explore {feature.title}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 10 } }}>
        <Box textAlign="center" sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            fontWeight={700} 
            gutterBottom
            sx={{ mb: 2 }}
          >
            What Users Say
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Join thousands of traders and analysts using AlphaMap
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {testimonials.map((testimonial) => (
            <Grid xs={12} md={6} key={testimonial.name}>
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack spacing={3}>
                    {/* Rating */}
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                      ))}
                    </Box>

                    {/* Content */}
                    <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{testimonial.content}"
                    </Typography>

                    {/* Author */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ 
                        bgcolor: testimonial.color,
                        width: 48,
                        height: 48,
                        fontWeight: 600
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(46, 125, 50, 0.05) 100%)',
        py: { xs: 6, md: 8 },
        mt: { xs: 6, md: 8 }
      }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              fontWeight={700} 
              gutterBottom
              sx={{ mb: 3 }}
            >
              Ready to Start?
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              Join the future of Web3 intelligence. Start tracking whales and discovering alpha today.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
            >
              <Button 
                variant="contained" 
                size="large"
                onClick={() => router.push('/whale-tracking')}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
                startIcon={<Visibility />}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => router.push('/portfolio')}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
                startIcon={<Speed />}
              >
                View Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}
