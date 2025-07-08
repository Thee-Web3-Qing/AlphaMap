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
  TextField,
  InputAdornment,
  Grid,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Paper,
  Container,
  Badge
} from "@mui/material";
import { 
  Search, 
  TrendingUp, 
  AccountBalance, 
  Visibility, 
  FilterList,
  Sort,
  Refresh,
  MoreVert,
  TrendingDown,
  AccountTree
} from "@mui/icons-material";

const mockWallets = [
  {
    name: "Sofia (Primary)",
    address: "0x1234...abcd",
    relationship: "Primary",
    balance: "1200 ETH",
    value: "$4,200,000",
    chains: ["Ethereum", "Base"],
    activity: 85,
    lastActivity: "2 hours ago",
    avatar: "S",
    change24h: "+12.4%",
    isPositive: true,
    transactions: 47
  },
  {
    name: "Sofia (Secondary)",
    address: "0xabcd...5678",
    relationship: "Secondary",
    balance: "300 ETH",
    value: "$1,050,000",
    chains: ["Base"],
    activity: 65,
    lastActivity: "5 hours ago",
    avatar: "S",
    change24h: "+8.2%",
    isPositive: true,
    transactions: 23
  },
  {
    name: "Jacob (Unknown)",
    address: "0x9876...4321",
    relationship: "Unknown",
    balance: "50 ETH",
    value: "$175,000",
    chains: ["Ethereum"],
    activity: 45,
    lastActivity: "1 day ago",
    avatar: "J",
    change24h: "-3.1%",
    isPositive: false,
    transactions: 12
  },
  {
    name: "Whale_0x789",
    address: "0x7890...efgh",
    relationship: "Primary",
    balance: "2500 ETH",
    value: "$8,750,000",
    chains: ["Ethereum", "Solana"],
    activity: 95,
    lastActivity: "30 min ago",
    avatar: "W",
    change24h: "+18.7%",
    isPositive: true,
    transactions: 89
  }
];

const stats = [
  { label: "Total Whales", value: "1,247", change: "+12", icon: <AccountBalance />, color: "#1976d2" },
  { label: "Total Value", value: "$847M", change: "+8.2%", icon: <TrendingUp />, color: "#2e7d32" },
  { label: "Active Today", value: "892", change: "+5.1%", icon: <Visibility />, color: "#0288d1" },
  { label: "New Signals", value: "47", change: "+15", icon: <AccountTree />, color: "#388e3c" }
];

export default function WhaleTrackingPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredWallets = mockWallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        background: 'radial-gradient(circle at 20% 80%, rgba(25, 118, 210, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(46, 125, 50, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 3, md: 6 } }}>
          {/* Header */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="primary" 
              fontWeight={700} 
              gutterBottom
              sx={{ mb: 1 }}
            >
              🐋 Whale Tracking
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "subtitle1"} 
              color="text.secondary" 
              gutterBottom
            >
              Track top whale wallets, relationships, and flows across multiple chains with AI-powered insights.
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
            {stats.map((stat) => (
              <Grid xs={6} sm={6} md={3} key={stat.label}>
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
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ 
                        bgcolor: stat.color,
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 }
                      }}>
                        {stat.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {stat.label}
                        </Typography>
                        <Chip 
                          label={stat.change} 
                          size="small"
                          sx={{ 
                            background: 'rgba(76, 175, 80, 0.1)',
                            color: 'success.main',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Search and Filters */}
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
            <Grid xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search wallets by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.95)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                    },
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{ 
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Sort />}
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Sort
                </Button>
                <IconButton
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Refresh />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>

          {/* Whale Cards */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredWallets.map((wallet) => (
              <Grid xs={12} sm={6} md={6} key={wallet.address}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderLeft: 6, 
                    borderColor: wallet.relationship === "Primary" ? "primary.main" : 
                                 wallet.relationship === "Secondary" ? "secondary.main" : "info.main",
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Stack spacing={{ xs: 1.5, md: 2 }}>
                      {/* Header */}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Badge
                          badgeContent={wallet.transactions}
                          color="primary"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: wallet.relationship === "Primary" ? "primary.main" : 
                                       wallet.relationship === "Secondary" ? "secondary.main" : "info.main",
                              fontWeight: 600,
                              width: { xs: 48, md: 56 },
                              height: { xs: 48, md: 56 },
                              fontSize: { xs: '1.2rem', md: '1.4rem' }
                            }}
                          >
                            {wallet.avatar}
                          </Avatar>
                        </Badge>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography 
                            variant={isMobile ? "subtitle1" : "h6"} 
                            fontWeight={600}
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {wallet.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {wallet.address}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View Details">
                            <IconButton size="small" sx={{ 
                              background: 'rgba(25, 118, 210, 0.1)',
                              '&:hover': { background: 'rgba(25, 118, 210, 0.2)' }
                            }}>
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <IconButton size="small" sx={{ 
                            background: 'rgba(0, 0, 0, 0.05)',
                            '&:hover': { background: 'rgba(0, 0, 0, 0.1)' }
                          }}>
                            <MoreVert />
                          </IconButton>
                        </Stack>
                      </Stack>

                      {/* Relationship and Chains */}
                      <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                      >
                        <Chip 
                          label={wallet.relationship} 
                          size="small"
                          color={wallet.relationship === "Primary" ? "primary" : 
                                 wallet.relationship === "Secondary" ? "secondary" : "info"}
                          sx={{ fontWeight: 600 }}
                        />
                        {wallet.chains.map((chain) => (
                          <Chip 
                            key={chain} 
                            label={chain} 
                            size="small" 
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                          />
                        ))}
                      </Stack>

                      {/* Balance and Value */}
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="primary">
                          {wallet.balance}
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                          {wallet.value}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {wallet.isPositive ? (
                            <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />
                          ) : (
                            <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />
                          )}
                          <Typography 
                            variant="body2" 
                            color={wallet.isPositive ? 'success.main' : 'error.main'}
                            fontWeight={600}
                          >
                            {wallet.change24h}
                          </Typography>
                        </Stack>
                      </Box>

                      {/* Activity */}
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Activity Level
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {wallet.activity}%
                          </Typography>
                        </Stack>
                        <LinearProgress 
                          variant="determinate" 
                          value={wallet.activity}
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: 'rgba(0, 0, 0, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: wallet.activity > 80 ? 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)' :
                                         wallet.activity > 60 ? 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)' :
                                         'linear-gradient(90deg, #f44336 0%, #ef5350 100%)'
                            }
                          }}
                        />
                      </Box>

                      {/* Last Activity */}
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                        Last activity: {wallet.lastActivity}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 