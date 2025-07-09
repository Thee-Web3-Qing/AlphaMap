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
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  Container
} from "@mui/material";
import { 
  Search,
  TrendingUp,
  Visibility,
  AccountBalance,
  AccountTree
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

// Enhanced mock whale data
const mockWhales = [
  {
    id: 1,
    name: "Sofia (Primary)",
    address: "0x1234...abcd",
    balance: "1,200 ETH",
    value: "$4.2M",
    change24h: "+12.4%",
    change7d: "+8.7%",
    activity: "Very High",
    lastTx: "2 hours ago",
    chains: ["Ethereum", "Base"],
    risk: "Low",
    avatar: "S",
    status: "active",
    relationship: "Primary"
  },
  {
    id: 2,
    name: "Jacob (Unknown)",
    address: "0xabcd...5678",
    balance: "850 ETH",
    value: "$2.98M",
    change24h: "-5.2%",
    change7d: "+15.3%",
    activity: "High",
    lastTx: "5 hours ago",
    chains: ["Ethereum", "Solana"],
    risk: "Medium",
    avatar: "J",
    status: "active",
    relationship: "Unknown"
  },
  {
    id: 3,
    name: "Whale_0x789",
    address: "0x7890...efgh",
    balance: "2,500 ETH",
    value: "$8.75M",
    change24h: "+23.1%",
    change7d: "+45.2%",
    activity: "Very High",
    lastTx: "15 minutes ago",
    chains: ["Ethereum", "Base", "Solana"],
    risk: "Low",
    avatar: "W",
    status: "active",
    relationship: "Primary"
  },
  {
    id: 4,
    name: "DeFi_Whale_001",
    address: "0xdef1...2345",
    balance: "650 ETH",
    value: "$2.28M",
    change24h: "-2.1%",
    change7d: "-8.5%",
    activity: "Medium",
    lastTx: "1 day ago",
    chains: ["Ethereum"],
    risk: "High",
    avatar: "D",
    status: "inactive",
    relationship: "Secondary"
  },
  {
    id: 5,
    name: "Base_Whale_Alpha",
    address: "0xbase...6789",
    balance: "3,200 ETH",
    value: "$11.2M",
    change24h: "+18.7%",
    change7d: "+32.1%",
    activity: "Very High",
    lastTx: "30 minutes ago",
    chains: ["Base", "Ethereum"],
    risk: "Low",
    avatar: "B",
    status: "active",
    relationship: "Primary"
  }
];

const whaleStats = [
  { label: "Total Whales", value: "1,247", change: "+12", icon: <Visibility />, color: jungle.lightGreen },
  { label: "Active Today", value: "847", change: "+23", icon: <TrendingUp />, color: jungle.olive },
  { label: "Total Value", value: "$847M", change: "+8.4%", icon: <AccountBalance />, color: jungle.accent },
  { label: "High Activity", value: "156", change: "+15", icon: <TrendingUp />, color: jungle.olive }
];

const recentMovements = [
  {
    id: 1,
    whale: "Sofia (Primary)",
    action: "Large Purchase",
    amount: "100 ETH",
    token: "ETH",
    destination: "Base DEX",
    time: "2 hours ago",
    value: "$350,000",
    type: "buy"
  },
  {
    id: 2,
    whale: "Whale_0x789",
    action: "Portfolio Rebalancing",
    amount: "500 ETH",
    token: "ETH → BASE",
    destination: "Base DEX",
    time: "15 minutes ago",
    value: "$1,750,000",
    type: "swap"
  },
  {
    id: 3,
    whale: "Jacob (Unknown)",
    action: "Withdrawal",
    amount: "50 ETH",
    token: "ETH",
    destination: "CEX Endpoint",
    time: "1 hour ago",
    value: "$175,000",
    type: "withdrawal"
  },
  {
    id: 4,
    whale: "Base_Whale_Alpha",
    action: "Yield Farming",
    amount: "1,000 ETH",
    token: "ETH",
    destination: "DeFi Protocol",
    time: "30 minutes ago",
    value: "$3,500,000",
    type: "deposit"
  }
];

export default function WhaleTrackingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedWhale, setSelectedWhale] = React.useState<number | null>(null);

  const filteredWhales = mockWhales.filter(whale =>
    whale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    whale.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'Very High': return jungle.olive;
      case 'High': return jungle.lightGreen;
      case 'Medium': return jungle.accent;
      case 'Low': return jungle.saddleBrown;
      default: return jungle.darkGreen;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
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
              🐋 Whale Tracking
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
              Track the biggest players in the crypto jungle!
            </Typography>
          </Box>

          {/* Live Stats */}
          <Grid container columns={12} spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
            {whaleStats.map((stat) => (
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

          {/* Filters */}
          <Card sx={{ 
            mb: 3, 
            background: 'rgba(245, 222, 179, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '3px solid #8B4513',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 2, textAlign: 'center' }}>
                🔍 Filter Whale Activity
              </Typography>
              <Grid container columns={12} spacing={2} alignItems="center">
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
                  <TextField
                    fullWidth
                    placeholder="Search whales by name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small">
                            <FilterList />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid #8B4513',
                        borderRadius: 2,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderColor: '#D2691E'
                        },
                        '&.Mui-focused': {
                          borderColor: '#8B4513'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                  <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<Refresh />}
                      sx={{ 
                        borderColor: '#8B4513',
                        color: '#8B4513',
                        border: '2px solid',
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': {
                          borderColor: '#D2691E',
                          background: 'rgba(139, 69, 19, 0.1)'
                        }
                      }}
                    >
                      Refresh
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<TrendingUp />}
                      sx={{ 
                        background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                        color: jungle.wheat,
                        borderRadius: 2,
                        fontWeight: 700,
                        border: '2px solid #8B4513',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 100%)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Track New
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        {/* Whale Table */}
        <Grid container columns={12} spacing={3}>
          <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 8' } }}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <CardContent sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'rgba(25, 118, 210, 0.05)' }}>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'left' }}>Whale</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Balance</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>24h Change</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Activity</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Risk</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredWhales.map((whale) => (
                        <TableRow 
                          key={whale.id}
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': {
                              background: 'rgba(25, 118, 210, 0.04)'
                            },
                            background: selectedWhale === whale.id ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
                          }}
                          onClick={() => setSelectedWhale(selectedWhale === whale.id ? null : whale.id)}
                        >
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar sx={{ 
                                bgcolor: whale.relationship === 'Primary' ? jungle.lightGreen : 
                                         whale.relationship === 'Secondary' ? jungle.olive : jungle.accent,
                                width: 40,
                                height: 40
                              }}>
                                {whale.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {whale.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {whale.address}
                                </Typography>
                                <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                                  {whale.chains.map((chain) => (
                                    <Chip 
                                      key={chain} 
                                      label={chain} 
                                      size="small" 
                                      variant="outlined"
                                      sx={{ fontSize: '0.6rem', height: 20 }}
                                    />
                                  ))}
                                </Stack>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {whale.balance}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {whale.value}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {whale.change24h.startsWith('+') ? (
                                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
                              ) : (
                                <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
                              )}
                              <Typography 
                                variant="body2" 
                                color={whale.change24h.startsWith('+') ? 'success.main' : 'error.main'}
                                fontWeight={600}
                              >
                                {whale.change24h}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={whale.activity} 
                              size="small"
                              sx={{ 
                                bgcolor: getActivityColor(whale.activity),
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={whale.risk} 
                              size="small"
                              color={getRiskColor(whale.risk) as any}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={whale.status} 
                              size="small"
                              color={getStatusColor(whale.status) as any}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={1}>
                              <Tooltip title="View Details">
                                <IconButton size="small" color="primary">
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Track Movements">
                                <IconButton size="small" color="secondary">
                                  <TrendingUp />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Movements Sidebar */}
          <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 4' } }}>
            <Stack spacing={3}>
              {/* Recent Movements */}
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Movements
                  </Typography>
                  <Stack spacing={2}>
                    {recentMovements.map((movement) => (
                      <Box key={movement.id} sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 1,
                        border: '1px solid rgba(0, 0, 0, 0.1)'
                      }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {movement.whale}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {movement.action}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {movement.amount} {movement.token}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Chip 
                              label={movement.type} 
                              size="small" 
                              color={movement.type === 'buy' ? 'success' : 
                                     movement.type === 'swap' ? 'primary' : 'warning'}
                            />
                            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                              {movement.time}
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          → {movement.destination}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    AI Insights
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, border: '1px solid rgba(76, 175, 80, 0.2)' }}>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        🚀 Accumulation Pattern Detected
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Sofia (Primary) showing consistent buying behavior across Base DEX
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 1, border: '1px solid rgba(255, 152, 0, 0.2)' }}>
                      <Typography variant="body2" fontWeight={600} color="warning.main">
                        ⚠️ Large Withdrawal Alert
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Jacob (Unknown) moved 50 ETH to untrackable CEX endpoint
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: 'info.50', borderRadius: 1, border: '1px solid rgba(33, 150, 243, 0.2)' }}>
                      <Typography variant="body2" fontWeight={600} color="info.main">
                        📊 Portfolio Correlation
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Whale_0x789 and Base_Whale_Alpha showing similar trading patterns
                      </Typography>
                    </Box>
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