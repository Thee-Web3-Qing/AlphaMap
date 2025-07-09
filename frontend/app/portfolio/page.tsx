"use client";
import * as React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Stack, 
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Container
} from "@mui/material";
import { 
  Add,
  Refresh,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Visibility,
  Psychology,
  AccountTree,
  Warning,
  CheckCircle,
  Error,
  Info,
  Star,
  Speed,
  AttachMoney,
  ShowChart,
  PieChart,
  Timeline,
  SwapHoriz,
  Analytics
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

// Enhanced mock portfolio data
const mockPortfolio = {
  totalValue: "$847,234.56",
  totalPnL: "+$124,567.89",
  pnlPercentage: "+17.2%",
  change24h: "+$23,456.78",
  change7d: "+$67,890.12",
  change30d: "+$98,765.43",
  assets: [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      balance: "12.5",
      value: "$43,750.00",
      price: "$3,500.00",
      change24h: "+5.2%",
      change7d: "+12.4%",
      allocation: 51.6,
      avatar: "Ξ",
      chain: "Ethereum",
      status: "active"
    },
    {
      id: 2,
      name: "Bitcoin",
      symbol: "BTC",
      balance: "0.85",
      value: "$42,500.00",
      price: "$50,000.00",
      change24h: "+3.1%",
      change7d: "+8.7%",
      allocation: 50.2,
      avatar: "₿",
      chain: "Bitcoin",
      status: "active"
    },
    {
      id: 3,
      name: "Solana",
      symbol: "SOL",
      balance: "125.0",
      value: "$18,750.00",
      price: "$150.00",
      change24h: "+15.3%",
      change7d: "+28.9%",
      allocation: 22.1,
      avatar: "◎",
      chain: "Solana",
      status: "active"
    },
    {
      id: 4,
      name: "Base",
      symbol: "BASE",
      balance: "2,450.0",
      value: "$2,450.00",
      price: "$1.00",
      change24h: "+2.1%",
      change7d: "+5.6%",
      allocation: 2.9,
      avatar: "🔵",
      chain: "Base",
      status: "active"
    },
    {
      id: 5,
      name: "Internet Computer",
      symbol: "ICP",
      balance: "500.0",
      value: "$15,000.00",
      price: "$30.00",
      change24h: "-1.2%",
      change7d: "+4.3%",
      allocation: 17.7,
      avatar: "🌐",
      chain: "ICP",
      status: "active"
    }
  ],
  wallets: [
    {
      id: 1,
      name: "Main Wallet",
      address: "0x1234...abcd",
      chain: "Ethereum",
      balance: "8.5 ETH",
      value: "$29,750.00",
      status: "connected",
      lastSync: "2 minutes ago"
    },
    {
      id: 2,
      name: "Trading Wallet",
      address: "0xabcd...5678",
      chain: "Base",
      balance: "2,450 USDC",
      value: "$2,450.00",
      status: "connected",
      lastSync: "5 minutes ago"
    },
    {
      id: 3,
      name: "Staking Wallet",
      address: "0x9876...4321",
      chain: "Solana",
      balance: "125 SOL",
      value: "$18,750.00",
      status: "connected",
      lastSync: "1 hour ago"
    }
  ],
  recentTransactions: [
    {
      id: 1,
      type: "Buy",
      asset: "ETH",
      amount: "2.5 ETH",
      value: "$8,750.00",
      time: "2 hours ago",
      status: "completed",
      txHash: "0x1234...abcd"
    },
    {
      id: 2,
      type: "Swap",
      asset: "ETH → BASE",
      amount: "1.0 ETH",
      value: "$3,500.00",
      time: "5 hours ago",
      status: "completed",
      txHash: "0xabcd...5678"
    },
    {
      id: 3,
      type: "Stake",
      asset: "SOL",
      amount: "25 SOL",
      value: "$3,750.00",
      time: "1 day ago",
      status: "pending",
      txHash: "0x9876...4321"
    }
  ]
};

const portfolioStats = [
  { label: "Total Value", value: "$847,234", change: "+17.2%", icon: <AttachMoney />, color: "#1976d2" },
  { label: "24h P&L", value: "+$23,456", change: "+2.8%", icon: <TrendingUp />, color: "#2e7d32" },
  { label: "7d P&L", value: "+$67,890", change: "+8.7%", icon: <ShowChart />, color: "#0288d1" },
  { label: "30d P&L", value: "+$98,765", change: "+13.2%", icon: <Timeline />, color: "#388e3c" }
];

export default function PortfolioPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedAsset, setSelectedAsset] = React.useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'Buy': return 'success';
      case 'Sell': return 'error';
      case 'Swap': return 'primary';
      case 'Stake': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2F4F2F 0%, #556B2F 50%, #8FBC8F 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: comicFont,
      pt: { xs: 10, md: 12 } // Add padding top to push content below navbar
    }}>
      {/* Divider/Shadow below navbar */}
      <Box sx={{
        position: 'fixed',
        top: 64, // height of AppBar
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
        <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 3, md: 6 } }}>
          {/* Header */}
          <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: jungle.wheat,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 2,
                fontFamily: comicFont,
                fontSize: '3rem'
              }}
            >
              🏦 Portfolio Management
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: jungle.wheat,
                opacity: 0.9,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontFamily: comicFont,
                fontSize: '1.2rem'
              }}
            >
              Track your multichain assets and discover alpha opportunities!
            </Typography>
          </Box>

          {/* Portfolio Stats */}
          <Grid container columns={12} spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
            {portfolioStats.map((stat) => (
              <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }} key={stat.label}>
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
                  boxShadow: '0 8px 32px 0 rgba(139,69,19,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10)', // Stronger drop shadow
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: '0 16px 40px 0 rgba(139,69,19,0.25), 0 2px 8px 0 rgba(0,0,0,0.13)',
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
                      border: '3px solid #8B4513',
                      boxShadow: '0 2px 8px 0 rgba(139,69,19,0.12)'
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
                        border: '2px solid #8B4513',
                        boxShadow: '0 1px 4px 0 rgba(34,139,34,0.10)'
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Portfolio Overview */}
          <Grid container columns={12} spacing={3}>
            {/* Main Portfolio */}
            <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 8' } }}>
              <Card sx={{ 
                background: 'rgba(245, 222, 179, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '3px solid #8B4513',
                borderRadius: 3,
                mb: 3
              }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 3, borderBottom: '2px solid #8B4513' }}>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#8B4513', textAlign: 'center' }}>
                      🗺️ Your Jungle Assets
                    </Typography>
                  </Box>
                  <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                    {mockPortfolio.assets.map((asset) => (
                      <Box 
                        key={asset.id}
                        sx={{ 
                          p: 3, 
                          borderBottom: '1px solid rgba(139, 69, 19, 0.2)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(139, 69, 19, 0.05)'
                          },
                          '&:last-child': {
                            borderBottom: 'none'
                          }
                        }}
                      >
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: '100%', md: 200 } }}>
                            <Avatar sx={{ 
                              width: 50, 
                              height: 50, 
                              mr: 2,
                              border: '2px solid #8B4513'
                            }}>
                              {asset.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight={600} sx={{ color: '#8B4513', fontFamily: comicFont }}>
                                {asset.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#556B2F', fontFamily: comicFont }}>
                                {asset.symbol}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                              <Box sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                                <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                                  Balance
                                </Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', fontFamily: comicFont }}>
                                  {asset.balance}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                                <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                                  Value
                                </Typography>
                                <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', fontFamily: comicFont }}>
                                  ${asset.value}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                                <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                                  24h Change
                                </Typography>
                                <Typography 
                                  variant="h6" 
                                  fontWeight={700} 
                                  sx={{ 
                                    color: asset.change24h.startsWith('+') ? '#228B22' : '#DC143C',
                                    fontFamily: comicFont
                                  }}
                                >
                                  {asset.change24h.startsWith('+') ? '+' : ''}{asset.change24h}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                          
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Trade">
                              <IconButton 
                                size="small"
                                sx={{ 
                                  color: '#8B4513',
                                  border: '2px solid #8B4513',
                                  '&:hover': {
                                    background: 'rgba(139, 69, 19, 0.1)'
                                  }
                                }}
                              >
                                <SwapHoriz />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View Details">
                              <IconButton 
                                size="small"
                                sx={{ 
                                  color: '#228B22',
                                  border: '2px solid #228B22',
                                  '&:hover': {
                                    background: 'rgba(34, 139, 34, 0.1)'
                                  }
                                }}
                              >
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar */}
            <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 4' } }}>
              <Stack spacing={3}>
                {/* Quick Actions */}
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 2, textAlign: 'center' }}>
                      ⚡ Quick Actions
                    </Typography>
                    <Stack spacing={2}>
                      <Button 
                        variant="contained"
                        fullWidth
                        startIcon={<Add />}
                        sx={{ 
                          fontFamily: comicFont,
                          background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                          color: jungle.wheat,
                          border: '3px solid #8B4513',
                          borderRadius: 3,
                          fontWeight: 700,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 100%)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Add Asset
                      </Button>
                      <Button 
                        variant="contained"
                        fullWidth
                        startIcon={<SwapHoriz />}
                        sx={{ 
                          fontFamily: comicFont,
                          background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
                          color: jungle.wheat,
                          border: '3px solid #8B4513',
                          borderRadius: 3,
                          fontWeight: 700,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Trade
                      </Button>
                      <Button 
                        variant="contained"
                        fullWidth
                        startIcon={<Analytics />}
                        sx={{ 
                          fontFamily: comicFont,
                          background: 'linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)',
                          color: jungle.wheat,
                          border: '3px solid #8B4513',
                          borderRadius: 3,
                          fontWeight: 700,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Analytics
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 2, textAlign: 'center' }}>
                      📊 Recent Activity
                    </Typography>
                    <Stack spacing={2}>
                      {mockPortfolio.recentTransactions.map((tx) => (
                        <Box key={tx.id} sx={{ 
                          p: 2, 
                          bgcolor: 'rgba(255, 255, 255, 0.3)', 
                          borderRadius: 2,
                          border: '1px solid rgba(139, 69, 19, 0.2)'
                        }}>
                          <Typography variant="body2" fontWeight={600} sx={{ color: '#8B4513', fontFamily: comicFont }}>
                            {tx.type} {tx.asset}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#556B2F', fontFamily: comicFont }}>
                            {tx.amount}
                          </Typography>
                          <Typography variant="caption" display="block" sx={{ color: '#8B4513', fontFamily: comicFont }}>
                            {tx.time}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 