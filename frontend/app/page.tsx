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
  useMediaQuery
} from "@mui/material";
import { 
  TrendingUp, 
  AccountBalance, 
  Psychology, 
  RocketLaunch,
  PlayArrow,
  Bolt,
  Timeline,
  AccountTree
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Whale Tracking",
    description: "Track top whale wallets across Bitcoin, Ethereum, Solana, Base, and ICP with AI-powered relationship inference.",
    path: "/whale-tracking",
    color: "primary",
    icon: <AccountTree />,
    stats: "1,247 whales tracked"
  },
  {
    title: "Portfolio Management", 
    description: "Aggregate and monitor your multichain wallets with real-time balances, PNL, and AI-driven insights.",
    path: "/portfolio",
    color: "secondary",
    icon: <AccountBalance />,
    stats: "$2.4B managed"
  },
  {
    title: "Alpha Feed",
    description: "Curated high-signal posts from X, Discord, and ICP forums with sentiment analysis and whale correlation.",
    path: "/alpha-feed", 
    color: "info",
    icon: <Psychology />,
    stats: "15K+ signals analyzed"
  },
  {
    title: "Mind Map Visualizer",
    description: "Interactive visualization of wallet flows and relationships using D3.js with CEX endpoint flagging.",
    path: "/mind-map",
    color: "success",
    icon: <TrendingUp />,
    stats: "Real-time flows"
  }
];

const liveStats = [
  { label: "Total Value Locked", value: "$847M", change: "+12.4%", icon: <TrendingUp /> },
  { label: "Active Users", value: "12.4K", change: "+8.2%", icon: <AccountBalance /> },
  { label: "Chains Supported", value: "5", change: "New: Base", icon: <AccountTree /> },
  { label: "AI Signals", value: "2.1K", change: "+15.7%", icon: <Psychology /> }
];

const testimonials = [
  {
    name: "Sofia Chen",
    role: "DeFi Trader",
    avatar: "S",
    content: "AlphaMap helped me track whale movements and discover alpha before anyone else. Game changer!",
    rating: 5
  },
  {
    name: "Jacob Rodriguez",
    role: "Portfolio Manager",
    avatar: "J", 
    content: "The mind map visualization is incredible. I can see wallet relationships instantly.",
    rating: 5
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #2e7d32 50%, #7b1fa2 100%)',
          color: 'white',
          py: { xs: 4, md: 8 },
          mb: { xs: 3, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography 
              variant={isSmallMobile ? "h3" : isMobile ? "h2" : "h1"}
              fontWeight={700} 
              gutterBottom
              sx={{ mb: { xs: 1, md: 2 } }}
            >
              AlphaMap 🗺️
            </Typography>
            <Typography 
              variant={isMobile ? "h6" : "h4"}
              sx={{ 
                mb: { xs: 2, md: 4 }, 
                opacity: 0.9,
                fontWeight: 300
              }}
            >
              Decentralized Web3 Intelligence Platform
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"}
              sx={{ 
                mb: { xs: 3, md: 6 }, 
                maxWidth: 800, 
                mx: 'auto', 
                opacity: 0.8,
                lineHeight: 1.6,
                px: { xs: 2, md: 0 }
              }}
            >
              Track whales, manage portfolios, and discover alpha across multiple chains. 
              Built on ICP with zero user fees and AI-powered insights.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 2, sm: 3 }} 
              justifyContent="center"
              sx={{ mb: { xs: 3, md: 6 } }}
            >
              <Button 
                variant="contained" 
                size={isMobile ? "medium" : "large"}
                onClick={() => router.push('/whale-tracking')}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main', 
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  },
                  transition: 'all 0.3s ease'
                }}
                startIcon={<RocketLaunch />}
              >
                Start Tracking
              </Button>
              <Button 
                variant="outlined" 
                size={isMobile ? "medium" : "large"}
                onClick={() => router.push('/portfolio')}
                sx={{ 
                  borderColor: 'white', 
                  color: 'white', 
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  '&:hover': { 
                    borderColor: 'grey.300',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                startIcon={<PlayArrow />}
              >
                View Portfolio
              </Button>
            </Stack>

            {/* Live Stats */}
            <Paper 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)',
                p: { xs: 2, md: 3 },
                maxWidth: { xs: '100%', sm: 400 },
                mx: 'auto',
                borderRadius: 3
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {liveStats[currentStat].icon}
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600}>
                    {liveStats[currentStat].value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {liveStats[currentStat].label}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Paper>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h2"}
          textAlign="center" 
          fontWeight={700} 
          gutterBottom 
          sx={{ mb: { xs: 3, md: 6 } }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {features.map((feature, index) => (
            <Grid xs={12} sm={6} md={6} key={feature.title}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: isMobile ? 'none' : 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => router.push(feature.path)}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box 
                        sx={{ 
                          bgcolor: `${feature.color}.main`,
                          color: 'white',
                          p: 1.5,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} color={`${feature.color}.main`}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.stats}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    
                    <Button 
                      variant="outlined" 
                      color={feature.color as any}
                      size={isMobile ? "small" : "medium"}
                      sx={{ 
                        alignSelf: 'flex-start',
                        '&:hover': {
                          transform: isMobile ? 'none' : 'translateX(4px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Explore →
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Paper sx={{ py: { xs: 4, md: 8 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant={isMobile ? "h4" : "h3"} textAlign="center" fontWeight={700} gutterBottom sx={{ mb: { xs: 3, md: 6 } }}>
            What Users Say
          </Typography>
          
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid xs={12} md={6} key={testimonial.name}>
                <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          color: 'white',
                          width: { xs: 40, md: 48 }, 
                          height: { xs: 40, md: 48 },
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600
                        }}
                      >
                        {testimonial.avatar}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{testimonial.content}"
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
        <Box textAlign="center">
          <Typography variant={isMobile ? "h4" : "h3"} fontWeight={700} gutterBottom>
            Ready to Discover Alpha?
          </Typography>
          <Typography variant={isMobile ? "body1" : "h6"} color="text.secondary" sx={{ mb: { xs: 3, md: 6 }, maxWidth: 600, mx: 'auto' }}>
            Join the community of Web3 degens and savvy users tracking whales and managing portfolios.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, sm: 3 }} 
            justifyContent="center"
            sx={{ mb: { xs: 2, md: 4 } }}
          >
            <Button 
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              onClick={() => router.push('/alpha-feed')}
              sx={{ 
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                '&:hover': {
                  transform: isMobile ? 'none' : 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
              }}
              startIcon={<Bolt />}
            >
              View Alpha Feed
            </Button>
            <Button 
              variant="outlined" 
              size={isMobile ? "medium" : "large"}
              onClick={() => router.push('/mind-map')}
              sx={{ 
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                '&:hover': {
                  transform: isMobile ? 'none' : 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
              startIcon={<Timeline />}
            >
              Explore Mind Maps
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
