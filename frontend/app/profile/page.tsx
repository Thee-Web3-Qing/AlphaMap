"use client";
import * as React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Stack, 
  Chip, 
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Container,
  Divider,
  Button,
  TextField,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { 
  AccountCircle,
  Edit,
  Settings,
  Security,
  Notifications,
  Language,
  Palette,
  Storage,
  Speed,
  TrendingUp,
  Star,
  Verified,
  LocationOn,
  Email,
  Phone,
  Link,
  GitHub,
  Twitter,
  LinkedIn,
  Save,
  Cancel,
  Visibility,
  AccountBalance,
  AccountTree
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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

// Styled jungle background
const JungleBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${jungle.darkGreen} 0%, ${jungle.olive} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  fontFamily: comicFont,
}));

// Comic card style
const ComicCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(120deg, ${jungle.wheat} 80%, ${jungle.lightGreen} 100%)`,
  border: `3px solid ${jungle.saddleBrown}`,
  borderRadius: 24,
  boxShadow: `8px 8px 0px 0px ${jungle.saddleBrown}`,
  fontFamily: comicFont,
}));

// Comic header style
const ComicHeader = styled(Typography)(({ theme }) => ({
  fontFamily: comicFont,
  color: jungle.accent,
  textShadow: `2px 2px 0px ${jungle.saddleBrown}`,
  letterSpacing: 2,
}));

// Monkey mascot avatar
const MonkeyAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  fontSize: 60,
  margin: '0 auto',
  marginBottom: 16,
  background: `radial-gradient(circle, ${jungle.goldenBrown} 60%, ${jungle.saddleBrown} 100%)`,
  border: `4px solid ${jungle.olive}`,
  boxShadow: `0 4px 16px ${jungle.saddleBrown}55`,
}));

const mockProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@alphamap.io",
  avatar: "AJ",
  role: "Premium User",
  joinDate: "March 2024",
  location: "San Francisco, CA",
  bio: "DeFi enthusiast and early adopter of Web3 technologies. Passionate about discovering alpha and building the future of finance.",
  stats: {
    totalValue: "$847,234",
    totalPnL: "+$124,567",
    winRate: "78.5%",
    tradesCount: "1,247",
    signalsGenerated: "2,341",
    whalesTracked: "156"
  },
  preferences: {
    theme: "Dark",
    notifications: "High Priority Only",
    language: "English",
    timezone: "PST (UTC-8)"
  },
  connectedWallets: [
    { name: "Main Wallet", address: "0x1234...abcd", chain: "Ethereum", balance: "12.5 ETH" },
    { name: "Trading Wallet", address: "0xabcd...5678", chain: "Base", balance: "2,450 USDC" },
    { name: "Staking Wallet", address: "0x9876...4321", chain: "Solana", balance: "125 SOL" }
  ],
  recentActivity: [
    { action: "Whale Alert", description: "Tracked Sofia's movement", time: "2 hours ago", type: "tracking" },
    { action: "Portfolio Update", description: "Added new wallet", time: "1 day ago", type: "portfolio" },
    { action: "Alpha Signal", description: "Generated BASE signal", time: "2 days ago", type: "signal" },
    { action: "Mind Map", description: "Updated wallet relationships", time: "3 days ago", type: "visualization" }
  ]
};

const profileStats = [
  { label: "Total Value", value: "$847,234", change: "+17.2%", icon: <AccountBalance />, color: "#8B4513" },
  { label: "24h P&L", value: "+$23,456", change: "+2.8%", icon: <TrendingUp />, color: "#228B22" },
  { label: "7d P&L", value: "+$67,890", change: "+8.7%", icon: <Star />, color: "#4169E1" },
  { label: "30d P&L", value: "+$98,765", change: "+13.2%", icon: <Speed />, color: "#556B2F" }
];

const recentActivity = [
  { id: 1, action: "Whale Alert", time: "2 hours ago" },
  { id: 2, action: "Portfolio Update", time: "1 day ago" },
  { id: 3, action: "Alpha Signal", time: "2 days ago" },
  { id: 4, action: "Mind Map", time: "3 days ago" }
];

export default function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState(mockProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfile(mockProfile); // Reset to original
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
              🐒 Explorer Profile
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
              Your jungle explorer identity and preferences!
            </Typography>
          </Box>

          {/* Profile Stats */}
          <Grid container columns={12} spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
            {profileStats.map((stat) => (
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

          {/* Profile Content */}
          <Grid container columns={12} spacing={3}>
            {/* Profile Info */}
            <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 4' } }}>
              <Card sx={{ 
                background: 'rgba(245, 222, 179, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '3px solid #8B4513',
                borderRadius: 3,
                mb: 3
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Avatar sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    mb: 3,
                    border: '4px solid #8B4513',
                    fontSize: '3rem'
                  }}>
                    🐒
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#8B4513', mb: 1, fontFamily: comicFont }}>
                    Jungle Explorer
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#556B2F', mb: 2, fontFamily: comicFont }}>
                    Level 42 Explorer
                  </Typography>
                  <Chip 
                    label="Premium Member" 
                    color="primary"
                    sx={{ 
                      mb: 2,
                      background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                      color: jungle.wheat,
                      fontWeight: 700,
                      border: '2px solid #8B4513'
                    }}
                  />
                  <Stack spacing={2}>
                    <Button 
                      variant="contained"
                      fullWidth
                      startIcon={<Edit />}
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
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outlined"
                      fullWidth
                      startIcon={<Settings />}
                      sx={{ 
                        fontFamily: comicFont,
                        borderColor: '#8B4513',
                        color: '#8B4513',
                        border: '3px solid',
                        borderRadius: 3,
                        fontWeight: 700,
                        '&:hover': {
                          background: 'rgba(139, 69, 19, 0.1)',
                          borderColor: '#D2691E'
                        }
                      }}
                    >
                      Settings
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Main Content */}
            <Grid sx={{ gridColumn: { xs: 'span 12', lg: 'span 8' } }}>
              <Stack spacing={3}>
                {/* Personal Info */}
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 2, textAlign: 'center' }}>
                      📋 Personal Information
                    </Typography>
                    <Grid container columns={12} spacing={2}>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Username
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', mb: 2, fontFamily: comicFont }}>
                          JungleExplorer42
                        </Typography>
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', mb: 2, fontFamily: comicFont }}>
                          explorer@jungle.com
                        </Typography>
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Member Since
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', mb: 2, fontFamily: comicFont }}>
                          January 2024
                        </Typography>
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Last Active
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', mb: 2, fontFamily: comicFont }}>
                          2 minutes ago
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card sx={{ 
                  background: 'rgba(245, 222, 179, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid #8B4513',
                  borderRadius: 3
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 2, textAlign: 'center' }}>
                      ⚙️ Preferences
                    </Typography>
                    <Grid container columns={12} spacing={2}>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Theme
                        </Typography>
                        <Chip 
                          label="Jungle Comic" 
                          sx={{ 
                            background: '#228B22',
                            color: jungle.wheat,
                            fontWeight: 700,
                            border: '2px solid #8B4513'
                          }}
                        />
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Notifications
                        </Typography>
                        <Chip 
                          label="Enabled" 
                          sx={{ 
                            background: '#228B22',
                            color: jungle.wheat,
                            fontWeight: 700,
                            border: '2px solid #8B4513'
                          }}
                        />
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Language
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', fontFamily: comicFont }}>
                          English
                        </Typography>
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <Typography variant="body2" sx={{ color: '#556B2F', fontWeight: 600, fontFamily: comicFont }}>
                          Timezone
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', fontFamily: comicFont }}>
                          UTC-5 (EST)
                        </Typography>
                      </Grid>
                    </Grid>
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
                      {recentActivity.map((activity) => (
                        <Box key={activity.id} sx={{ 
                          p: 2, 
                          bgcolor: 'rgba(255, 255, 255, 0.3)', 
                          borderRadius: 2,
                          border: '1px solid rgba(139, 69, 19, 0.2)'
                        }}>
                          <Typography component="span" variant="body2" fontWeight={600} sx={{ color: '#8B4513', fontFamily: comicFont, display: 'block' }}>
                            {activity.action}
                          </Typography>
                          <Typography component="span" variant="caption" sx={{ color: '#556B2F', fontFamily: comicFont, display: 'block' }}>
                            {activity.time}
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