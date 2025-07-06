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
  Grid,
  Avatar,
  LinearProgress,
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { TrendingUp, TrendingDown, AccountBalance, PieChart } from "@mui/icons-material";

const mockPortfolio = [
  {
    name: "My Base Wallet",
    address: "0xbase...1234",
    balance: "2.5 ETH",
    value: "$8,750",
    pnl: "+12%",
    pnlValue: "+$937",
    tokens: [
      { symbol: "ETH", amount: 2, value: 7000, percentage: 80 },
      { symbol: "USDC", amount: 500, value: 500, percentage: 6 },
      { symbol: "BASE", amount: 1000, value: 1250, percentage: 14 },
    ],
    avatar: "B"
  },
  {
    name: "Sofia's Wallet",
    address: "0xsofia...5678",
    balance: "1.2 ETH",
    value: "$4,200",
    pnl: "-3%",
    pnlValue: "-$130",
    tokens: [
      { symbol: "ETH", amount: 1, value: 3500, percentage: 83 },
      { symbol: "BASE", amount: 1000, value: 700, percentage: 17 },
    ],
    avatar: "S"
  }
];

const totalValue = mockPortfolio.reduce((sum, wallet) => sum + parseFloat(wallet.value.replace('$', '').replace(',', '')), 0);
const totalPnl = mockPortfolio.reduce((sum, wallet) => {
  const pnlValue = parseFloat(wallet.pnlValue.replace('$', '').replace(',', '').replace('+', '').replace('-', ''));
  return sum + (wallet.pnl.startsWith('+') ? pnlValue : -pnlValue);
}, 0);

export default function PortfolioPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          color="primary" 
          fontWeight={700} 
          gutterBottom
        >
          💼 Portfolio Management
        </Typography>
        <Typography 
          variant={isMobile ? "body1" : "subtitle1"} 
          color="text.secondary" 
          gutterBottom
        >
          Aggregate and monitor your multichain wallets with real-time balances, PNL, and AI-driven insights.
        </Typography>
      </Box>

      {/* Portfolio Summary */}
      <Grid container spacing={{ xs: 1, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        <Grid xs={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 1.5, md: 3 } }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AccountBalance />
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"}>
                    ${totalValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">Total Value</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} md={3}>
          <Card sx={{ bgcolor: totalPnl >= 0 ? 'success.main' : 'error.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 1.5, md: 3 } }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                {totalPnl >= 0 ? <TrendingUp /> : <TrendingDown />}
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"}>
                    ${totalPnl.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">Total P&L</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} md={3}>
          <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 1.5, md: 3 } }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PieChart />
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"}>
                    {mockPortfolio.length}
                  </Typography>
                  <Typography variant="body2">Wallets</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 1.5, md: 3 } }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AccountBalance />
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"}>3</Typography>
                  <Typography variant="body2">Chains</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Wallet Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {mockPortfolio.map((wallet) => (
          <Grid xs={12} sm={6} md={6} key={wallet.address}>
            <Card 
              sx={{ 
                height: '100%',
                borderLeft: 6, 
                borderColor: "primary.main",
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: isMobile ? 'none' : 'translateY(-2px)',
                  boxShadow: isMobile ? 2 : 4
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  {/* Header */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ 
                      bgcolor: "primary.main", 
                      fontWeight: 600,
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 }
                    }}>
                      {wallet.avatar}
                    </Avatar>
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
                    <Chip 
                      label={wallet.pnl} 
                      color={wallet.pnl.startsWith("+") ? "success" : "error"} 
                      size={isMobile ? "small" : "small"} 
                    />
                  </Stack>

                  {/* Balance and PNL */}
                  <Box>
                    <Typography 
                      variant={isMobile ? "h5" : "h4"} 
                      color="secondary" 
                      fontWeight={700}
                    >
                      {wallet.balance}
                    </Typography>
                    <Typography 
                      variant={isMobile ? "body2" : "body1"} 
                      color="text.secondary" 
                      sx={{ mb: 1 }}
                    >
                      ≈ {wallet.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={wallet.pnl.startsWith("+") ? "success.main" : "error.main"}
                    >
                      {wallet.pnlValue} ({wallet.pnl})
                    </Typography>
                  </Box>

                  {/* Token Allocation */}
                  <Box>
                    <Typography 
                      variant={isMobile ? "subtitle2" : "h6"} 
                      fontWeight={600} 
                      gutterBottom
                    >
                      Token Allocation
                    </Typography>
                    <Stack spacing={{ xs: 1.5, md: 2 }}>
                      {wallet.tokens.map((token) => (
                        <Box key={token.symbol}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Chip 
                                label={token.symbol} 
                                color="info" 
                                size={isMobile ? "small" : "small"} 
                              />
                              <Typography variant="body2">
                                {token.amount} {token.symbol}
                              </Typography>
                            </Stack>
                            <Typography variant="body2" fontWeight={600}>
                              ${token.value.toLocaleString()}
                            </Typography>
                          </Stack>
                          <LinearProgress 
                            variant="determinate" 
                            value={token.percentage} 
                            color="primary"
                            sx={{ height: { xs: 4, md: 6 }, borderRadius: 3 }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Divider sx={{ my: { xs: 4, md: 6 } }} />
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', height: '100%' }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight={600} 
              color="primary.main" 
              gutterBottom
            >
              📊 Portfolio Allocation
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              color="text.secondary" 
              sx={{ mb: { xs: 2, md: 3 } }}
            >
              Visual breakdown of your token allocation across all wallets.
            </Typography>
            <Box 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                border: "2px dashed #1976d2", 
                borderRadius: 2, 
                bgcolor: 'grey.50',
                minHeight: { xs: 150, md: 200 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant={isMobile ? "body1" : "h6"} 
                color="primary.main"
              >
                [Pie Chart Coming Soon]
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', height: '100%' }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight={600} 
              color="secondary.main" 
              gutterBottom
            >
              📈 Performance Chart
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              color="text.secondary" 
              sx={{ mb: { xs: 2, md: 3 } }}
            >
              Track your portfolio performance over time with detailed analytics.
            </Typography>
            <Box 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                border: "2px dashed #2e7d32", 
                borderRadius: 2, 
                bgcolor: 'grey.50',
                minHeight: { xs: 150, md: 200 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant={isMobile ? "body1" : "h6"} 
                color="secondary.main"
              >
                [Performance Chart Coming Soon]
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 