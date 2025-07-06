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
  useMediaQuery
} from "@mui/material";
import { Search, TrendingUp, AccountBalance, Visibility } from "@mui/icons-material";

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
    avatar: "S"
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
    avatar: "S"
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
    avatar: "J"
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
    avatar: "W"
  }
];

export default function WhaleTrackingPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredWallets = mockWallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search and Stats */}
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
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AccountBalance />
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"}>{mockWallets.length}</Typography>
                  <Typography variant="body2">Active Whales</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Whale Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filteredWallets.map((wallet) => (
          <Grid xs={12} sm={6} md={6} key={wallet.address}>
            <Card 
              sx={{ 
                height: '100%',
                borderLeft: 6, 
                borderColor: wallet.relationship === "Primary" ? "primary.main" : 
                             wallet.relationship === "Secondary" ? "secondary.main" : "info.main",
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: isMobile ? 'none' : 'translateY(-2px)',
                  boxShadow: isMobile ? 2 : 4
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={{ xs: 1.5, md: 2 }}>
                  {/* Header */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: wallet.relationship === "Primary" ? "primary.main" : 
                                 wallet.relationship === "Secondary" ? "secondary.main" : "info.main",
                        fontWeight: 600,
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 }
                      }}
                    >
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
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  {/* Relationship and Chains */}
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    flexWrap="wrap" 
                    useFlexGap
                    sx={{ gap: { xs: 0.5, md: 1 } }}
                  >
                    <Chip 
                      label={wallet.relationship} 
                      color={wallet.relationship === "Primary" ? "primary" : 
                             wallet.relationship === "Secondary" ? "secondary" : "info"} 
                      size={isMobile ? "small" : "small"} 
                    />
                    {wallet.chains.map((chain) => (
                      <Chip 
                        key={chain} 
                        label={chain} 
                        color="info" 
                        size={isMobile ? "small" : "small"} 
                        variant="outlined" 
                      />
                    ))}
                  </Stack>

                  {/* Balance and Value */}
                  <Box>
                    <Typography 
                      variant={isMobile ? "h6" : "h5"} 
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
                      color={wallet.activity > 80 ? "success" : wallet.activity > 60 ? "warning" : "error"}
                      sx={{ height: { xs: 4, md: 6 }, borderRadius: 3 }}
                    />
                  </Box>

                  {/* Last Activity */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                  >
                    <TrendingUp fontSize="small" />
                    Last activity: {wallet.lastActivity}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mind Map Placeholder */}
      <Divider sx={{ my: { xs: 4, md: 6 } }} />
      <Card sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          fontWeight={600} 
          color="info.main" 
          gutterBottom
        >
          🧠 Interactive Mind Map Visualization
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "body1"} 
          color="text.secondary" 
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          Visualize wallet relationships and transaction flows with our D3.js-powered mind map.
        </Typography>
        <Box 
          sx={{ 
            p: { xs: 3, md: 4 }, 
            border: "2px dashed #7b1fa2", 
            borderRadius: 2, 
            bgcolor: 'white',
            minHeight: { xs: 150, md: 200 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="info.main"
          >
            [Mind Map Coming Soon]
          </Typography>
        </Box>
      </Card>
    </Box>
  );
} 