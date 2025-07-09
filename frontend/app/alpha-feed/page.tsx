"use client";
import * as React from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  Avatar,
  Paper,
  LinearProgress,
  Badge,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Container
} from "@mui/material";
import { 
  TrendingUp, 
  Psychology, 
  Bolt,
  LocalFireDepartment,
  Star,
  CheckCircle
} from "@mui/icons-material";

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

const mockAlphaPosts = [
  {
    id: 1,
    source: "X (Twitter)",
    author: "@crypto_whale",
    content: "$BASE is trending! Sofia just bought 10k tokens. This could be the next big move. 🚀",
    sentiment: "Bullish",
    engagement: 1200,
    whaleCorrelation: true,
    timeAgo: "2h ago",
    avatar: "🐋",
    trending: true,
    verified: true
  },
  {
    id: 2,
    source: "Discord",
    author: "alpha_hunter#1234",
    content: "Jacob minted a rare NFT on Base. Community is buzzing! Floor price up 40% in last hour.",
    sentiment: "Bullish",
    engagement: 800,
    whaleCorrelation: true,
    timeAgo: "5h ago",
    avatar: "🎯",
    trending: true,
    verified: false
  },
  {
    id: 3,
    source: "ICP Forum",
    author: "DeFi_Explorer",
    content: "Airdrop opportunity for early Base users. Requirements: 10+ transactions, 30+ days active.",
    sentiment: "Neutral",
    engagement: 300,
    whaleCorrelation: false,
    timeAgo: "1d ago",
    avatar: "💎",
    trending: false,
    verified: true
  },
  {
    id: 4,
    source: "X (Twitter)",
    author: "@defi_analyst",
    content: "Whale alert: 5000 ETH moved to Base DEX. Could be preparing for major liquidity event.",
    sentiment: "Bearish",
    engagement: 2500,
    whaleCorrelation: true,
    timeAgo: "30m ago",
    avatar: "📊",
    trending: true,
    verified: true
  }
];

const alphaOfTheDay = {
  title: "Base Protocol Launch",
  description: "Major protocol launching on Base with 10x potential. Sofia and Jacob both accumulating.",
  sentiment: "Extremely Bullish",
  confidence: 95,
  sources: ["X", "Discord", "Telegram"],
  whaleActivity: "High",
  timeWindow: "24h"
};

export default function AlphaFeedPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2F4F2F 0%, #556B2F 50%, #8FBC8F 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: comicFont,
      pt: { xs: 10, md: 12 }
    }}>
      {/* Divider/Shadow below navbar */}
      <Box sx={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        height: 16,
        zIndex: 1200,
        background: 'linear-gradient(to bottom, rgba(139,69,19,0.12), rgba(245,222,179,0))',
        pointerEvents: 'none'
      }} />
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 3, md: 6 } }}>
          {/* Header with Live Indicator */}
          <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2, justifyContent: 'center' }}>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                sx={{ 
                  color: jungle.wheat,
                  fontWeight: 700,
                  fontFamily: comicFont,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                🔥 Community Alpha Feed
              </Typography>
              <Badge badgeContent="LIVE" color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }} />
            </Stack>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              sx={{ 
                color: jungle.wheat,
                fontFamily: comicFont,
                opacity: 0.9,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
              gutterBottom
            >
              Curated high-signal posts from X, Discord, and ICP forums with AI-powered sentiment analysis.
            </Typography>
          </Box>

          {/* Alpha of the Day - Featured Card */}
          <Paper 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              mb: { xs: 3, md: 4 }, 
              background: 'rgba(245, 222, 179, 0.95)',
              backdropFilter: 'blur(10px)',
              color: jungle.saddleBrown,
              position: 'relative',
              overflow: 'hidden',
              border: '3px solid #8B4513',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                borderColor: '#D2691E'
              }
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2 }}>
              <LocalFireDepartment sx={{ fontSize: { xs: 30, md: 40 }, opacity: 0.3 }} />
            </Box>
            
            <Stack spacing={{ xs: 2, md: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Bolt sx={{ fontSize: { xs: 24, md: 32 } }} />
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700} sx={{ fontFamily: comicFont }}>
                  Alpha of the Day
                </Typography>
              </Stack>
              
              <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={600} sx={{ fontFamily: comicFont }}>
                {alphaOfTheDay.title}
              </Typography>
              
              <Typography variant={isMobile ? "body2" : "body1"} sx={{ opacity: 0.9, fontFamily: comicFont }}>
                {alphaOfTheDay.description}
              </Typography>
              
              <Stack 
                direction="row" 
                spacing={1} 
                flexWrap="wrap" 
                useFlexGap
                sx={{ gap: { xs: 1, md: 2 } }}
              >
                <Chip 
                  label={alphaOfTheDay.sentiment} 
                  color="warning" 
                  size={isMobile ? "small" : "small"}
                  sx={{ 
                    bgcolor: 'rgba(139, 69, 19, 0.2)',
                    fontFamily: comicFont,
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }} 
                />
                <Chip 
                  label={`${alphaOfTheDay.confidence}% Confidence`} 
                  color="success" 
                  size={isMobile ? "small" : "small"}
                  sx={{ 
                    bgcolor: 'rgba(34, 139, 34, 0.2)',
                    fontFamily: comicFont,
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }} 
                />
                <Chip 
                  label={`${alphaOfTheDay.whaleActivity} Activity`} 
                  color="info" 
                  size={isMobile ? "small" : "small"}
                  sx={{ 
                    bgcolor: 'rgba(65, 105, 225, 0.2)',
                    fontFamily: comicFont,
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }} 
                />
              </Stack>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8, fontFamily: comicFont }}>
                  Confidence Level
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={alphaOfTheDay.confidence} 
                  color="warning"
                  sx={{ height: { xs: 6, md: 8 }, borderRadius: 4 }}
                />
              </Box>
            </Stack>
          </Paper>

          {/* Alpha Posts Grid */}
          <Grid container columns={12} spacing={{ xs: 2, md: 3 }}>
            {mockAlphaPosts.map((post) => (
              <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }} key={post.id}>
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                    borderColor: '#D2691E'
                  }
                }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar sx={{ 
                        width: 50, 
                        height: 50, 
                        mr: 2,
                        border: '2px solid #8B4513'
                      }}>
                        {post.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ 
                            color: '#8B4513',
                            fontFamily: comicFont,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontFamily: comicFont
                          }}>
                            {post.author}
                          </Typography>
                          {post.verified && <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />}
                          {post.trending && <TrendingUp sx={{ color: 'warning.main', fontSize: { xs: 14, md: 16 } }} />}
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: comicFont }}>
                          {post.source} • {post.timeAgo}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant={isMobile ? "body2" : "body1"} 
                      sx={{ lineHeight: 1.6, textAlign: 'left', fontFamily: comicFont, mb: 3, flexGrow: 1 }}
                    >
                      {post.content}
                    </Typography>
                    
                    <Box sx={{ mt: 'auto' }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                        <Chip 
                          label={post.source} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontFamily: comicFont, border: '2px solid #8B4513' }}
                        />
                        <Chip 
                          label={post.sentiment} 
                          color={post.sentiment === "Bullish" ? "success" : 
                                 post.sentiment === "Bearish" ? "error" : "info"} 
                          size="small" 
                          sx={{ fontFamily: comicFont, border: '2px solid #8B4513' }}
                        />
                        <Chip 
                          label={`${post.engagement} engagement`} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontFamily: comicFont, border: '2px solid #8B4513' }}
                        />
                        {post.whaleCorrelation && (
                          <Chip 
                            label="Whale Activity" 
                            color="warning"
                            size="small"
                            icon={<Psychology />}
                            sx={{ fontFamily: comicFont, border: '2px solid #8B4513' }}
                          />
                        )}
                      </Stack>
                      
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: comicFont }}>
                            Signal Strength
                          </Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ fontFamily: comicFont }}>
                            {Math.round((post.engagement / 2500) * 100)}%
                          </Typography>
                        </Stack>
                        <LinearProgress 
                          variant="determinate" 
                          value={(post.engagement / 2500) * 100} 
                          color={post.sentiment === "Bullish" ? "success" : 
                                 post.sentiment === "Bearish" ? "error" : "info"}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions */}
          <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography variant={isMobile ? "h6" : "h6"} fontWeight={600} gutterBottom sx={{ 
              fontFamily: comicFont,
              color: jungle.wheat,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Quick Actions
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                variant="contained"
                size={isMobile ? "small" : "medium"}
                startIcon={<TrendingUp />}
                sx={{ 
                  fontFamily: comicFont,
                  background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                  color: jungle.wheat,
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Set Alerts
              </Button>
              <Button 
                variant="contained"
                size={isMobile ? "small" : "medium"}
                startIcon={<Psychology />}
                sx={{ 
                  fontFamily: comicFont,
                  background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
                  color: jungle.wheat,
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                AI Analysis
              </Button>
              <Button 
                variant="contained"
                size={isMobile ? "small" : "medium"}
                startIcon={<Star />}
                sx={{ 
                  fontFamily: comicFont,
                  background: 'linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)',
                  color: jungle.wheat,
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Track Trends
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 