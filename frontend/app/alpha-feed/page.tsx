"use client";
import * as React from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  Divider, 
  Avatar,
  IconButton,
  Paper,
  LinearProgress,
  Badge,
  Tooltip,
  Fab,
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  TrendingUp, 
  TrendingDown, 
  Psychology, 
  Visibility, 
  Share, 
  Bookmark,
  Bolt,
  LocalFireDepartment,
  Star,
  TrendingFlat,
  AutoGraph,
  PsychologyAlt
} from "@mui/icons-material";

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
  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
      {/* Header with Live Indicator */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            color="primary" 
            fontWeight={700}
          >
            🔥 Community Alpha Feed
          </Typography>
          <Badge badgeContent="LIVE" color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }} />
        </Stack>
        <Typography 
          variant={isMobile ? "body1" : "subtitle1"} 
          color="text.secondary" 
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
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2 }}>
          <LocalFireDepartment sx={{ fontSize: { xs: 30, md: 40 }, opacity: 0.3 }} />
        </Box>
        
        <Stack spacing={{ xs: 2, md: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Bolt sx={{ fontSize: { xs: 24, md: 32 } }} />
            <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
              Alpha of the Day
            </Typography>
          </Stack>
          
          <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={600}>
            {alphaOfTheDay.title}
          </Typography>
          
          <Typography variant={isMobile ? "body2" : "body1"} sx={{ opacity: 0.9 }}>
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
              sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
            />
            <Chip 
              label={`${alphaOfTheDay.confidence}% Confidence`} 
              color="success" 
              size={isMobile ? "small" : "small"}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
            />
            <Chip 
              label={`${alphaOfTheDay.whaleActivity} Activity`} 
              color="info" 
              size={isMobile ? "small" : "small"}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
            />
          </Stack>
          
          <Box>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
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
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {mockAlphaPosts.map((post, index) => (
          <Grid xs={12} sm={6} md={6} key={post.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderLeft: 6, 
                borderColor: post.whaleCorrelation ? "secondary.main" : "info.main",
                '&:hover': { 
                  transform: isMobile ? 'none' : 'translateY(-4px)',
                  boxShadow: isMobile ? 4 : 8
                }
              }}
              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={{ xs: 1.5, md: 2 }}>
                  {/* Header */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ 
                      bgcolor: post.verified ? 'success.main' : 'grey.500',
                      width: { xs: 36, md: 40 },
                      height: { xs: 36, md: 40 }
                    }}>
                      {post.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography 
                          variant={isMobile ? "body2" : "subtitle1"} 
                          fontWeight={600}
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {post.author}
                        </Typography>
                        {post.verified && <Star sx={{ color: 'success.main', fontSize: { xs: 14, md: 16 } }} />}
                        {post.trending && <TrendingUp sx={{ color: 'warning.main', fontSize: { xs: 14, md: 16 } }} />}
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {post.source} • {post.timeAgo}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Bookmark">
                        <IconButton size="small">
                          <Bookmark />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton size="small">
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* Content */}
                  <Typography 
                    variant={isMobile ? "body2" : "body1"} 
                    sx={{ lineHeight: 1.6 }}
                  >
                    {post.content}
                  </Typography>

                  {/* Tags and Stats */}
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    flexWrap="wrap" 
                    useFlexGap
                    sx={{ gap: { xs: 0.5, md: 1 } }}
                  >
                    <Chip 
                      label={post.source} 
                      color="primary" 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={post.sentiment} 
                      color={post.sentiment === "Bullish" ? "success" : 
                             post.sentiment === "Bearish" ? "error" : "info"} 
                      size="small" 
                    />
                    <Chip 
                      label={`${post.engagement} engagement`} 
                      color="info" 
                      size="small" 
                      variant="outlined"
                    />
                    {post.whaleCorrelation && (
                      <Chip 
                        label="Whale Correlated" 
                        color="secondary" 
                        size="small"
                        icon={<Psychology />}
                      />
                    )}
                  </Stack>

                  {/* Engagement Bar */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Signal Strength
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {Math.round((post.engagement / 2500) * 100)}%
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={(post.engagement / 2500) * 100} 
                      color={post.whaleCorrelation ? "secondary" : "primary"}
                      sx={{ height: { xs: 4, md: 6 }, borderRadius: 3 }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <Typography variant={isMobile ? "h6" : "h6"} fontWeight={600} gutterBottom>
          Quick Actions
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={{ xs: 1, sm: 2 }} 
          justifyContent="center" 
          flexWrap="wrap" 
          useFlexGap
          sx={{ gap: { xs: 1, sm: 2 } }}
        >
          <Button 
            variant="outlined" 
            size={isMobile ? "small" : "medium"}
            startIcon={<AutoGraph />}
          >
            Set Alerts
          </Button>
          <Button 
            variant="outlined" 
            size={isMobile ? "small" : "medium"}
            startIcon={<PsychologyAlt />}
          >
            AI Analysis
          </Button>
          <Button 
            variant="outlined" 
            size={isMobile ? "small" : "medium"}
            startIcon={<TrendingFlat />}
          >
            Track Trends
          </Button>
        </Stack>
      </Box>

      {/* Floating Action Button - Hidden on Mobile */}
      {!isMobile && (
        <Tooltip title="New Alpha Alert">
          <Fab
            color="secondary"
            aria-label="new alpha"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
              '&:hover': {
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Bolt />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
} 