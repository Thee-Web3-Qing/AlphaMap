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
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Grid
} from "@mui/material";
import { 
  Notifications,
  NotificationsActive,
  NotificationsOff,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Psychology,
  AccountTree,
  Visibility,
  Star,
  Warning,
  Info,
  CheckCircle,
  Error,
  Delete,
  MarkEmailRead,
  FilterList
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

const mockNotifications = [
  {
    id: 1,
    type: "whale_alert",
    title: "Whale Movement Detected",
    message: "Sofia (Primary) moved 500 ETH to Base DEX. Potential accumulation signal.",
    time: "2 minutes ago",
    priority: "high",
    read: false,
    icon: <Visibility />,
    color: "#8B4513"
  },
  {
    id: 2,
    type: "portfolio_update",
    title: "Portfolio Value Increased",
    message: "Your portfolio value increased by 12.4% in the last 24 hours.",
    time: "15 minutes ago",
    priority: "medium",
    read: false,
    icon: <AccountBalance />,
    color: "#228B22"
  },
  {
    id: 3,
    type: "alpha_signal",
    title: "New Alpha Signal",
    message: "High-confidence signal detected for BASE token. 95% confidence score.",
    time: "1 hour ago",
    priority: "high",
    read: true,
    icon: <Psychology />,
    color: "#4169E1"
  },
  {
    id: 4,
    type: "system_alert",
    title: "System Maintenance",
    message: "Scheduled maintenance completed. All services are now operational.",
    time: "3 hours ago",
    priority: "low",
    read: true,
    icon: <Info />,
    color: "#696969"
  },
  {
    id: 5,
    type: "mind_map_update",
    title: "Mind Map Updated",
    message: "New wallet relationships detected in your tracked addresses.",
    time: "5 hours ago",
    priority: "medium",
    read: true,
    icon: <AccountTree />,
    color: "#32CD32"
  },
  {
    id: 6,
    type: "whale_alert",
    title: "Large Withdrawal Detected",
    message: "Jacob (Unknown) withdrew 200 ETH to CEX. Endpoint flagged as untrackable.",
    time: "1 day ago",
    priority: "medium",
    read: true,
    icon: <Warning />,
    color: "#FF8C00"
  }
];

const notificationStats = [
  { label: "Total", value: "1,247", change: "+12", icon: <Notifications />, color: "#8B4513" },
  { label: "Unread", value: "23", change: "-5", icon: <NotificationsActive />, color: "#228B22" },
  { label: "High Priority", value: "8", change: "+2", icon: <Warning />, color: "#FF8C00" },
  { label: "Today", value: "47", change: "+15", icon: <TrendingUp />, color: "#4169E1" }
];

export default function NotificationsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filter, setFilter] = React.useState('all');
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'high') return notification.priority === 'high';
    return notification.type === filter;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
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
              🗺️ Explorer's Alerts
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
              Stay updated with jungle discoveries and expedition reports!
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container columns={12} spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
            {notificationStats.map((stat) => (
              <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }} key={stat.label}>
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
                🔍 Filter Your Discoveries
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap justifyContent="center">
                <Chip 
                  label="All Alerts" 
                  color={filter === 'all' ? 'primary' : 'default'}
                  onClick={() => setFilter('all')}
                  clickable
                  sx={{ 
                    fontWeight: 700,
                    border: '2px solid #8B4513',
                    '&.MuiChip-clickable:hover': {
                      background: '#8B4513',
                      color: jungle.wheat
                    }
                  }}
                />
                <Chip 
                  label="Unread" 
                  color={filter === 'unread' ? 'primary' : 'default'}
                  onClick={() => setFilter('unread')}
                  clickable
                  sx={{ 
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }}
                />
                <Chip 
                  label="High Priority" 
                  color={filter === 'high' ? 'primary' : 'default'}
                  onClick={() => setFilter('high')}
                  clickable
                  sx={{ 
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }}
                />
                <Chip 
                  label="Whale Alerts" 
                  color={filter === 'whale_alert' ? 'primary' : 'default'}
                  onClick={() => setFilter('whale_alert')}
                  clickable
                  sx={{ 
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }}
                />
                <Chip 
                  label="Alpha Signals" 
                  color={filter === 'alpha_signal' ? 'primary' : 'default'}
                  onClick={() => setFilter('alpha_signal')}
                  clickable
                  sx={{ 
                    fontWeight: 700,
                    border: '2px solid #8B4513'
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card sx={{ 
            background: 'rgba(245, 222, 179, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '3px solid #8B4513',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, borderBottom: '2px solid #8B4513' }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#8B4513', textAlign: 'center' }}>
                  📢 Latest Expedition Reports
                </Typography>
              </Box>
              <List>
                {filteredNotifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem 
                      sx={{ 
                        px: 3,
                        py: 3,
                        pr: 12, // Add right padding to prevent text overlap with icons
                        background: notification.read ? 'transparent' : 'rgba(139, 69, 19, 0.1)',
                        '&:hover': {
                          background: 'rgba(139, 69, 19, 0.15)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: notification.color,
                          width: 60,
                          height: 60,
                          border: '3px solid #8B4513'
                        }}>
                          {notification.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513' }}>
                              {notification.title}
                            </Typography>
                            {!notification.read && (
                              <Badge 
                                color="error" 
                                variant="dot" 
                                sx={{ '& .MuiBadge-dot': { width: 12, height: 12 } }}
                              />
                            )}
                            <Chip 
                              label={notification.priority.toUpperCase()} 
                              size="small" 
                              color={getPriorityColor(notification.priority) as any}
                              sx={{ 
                                ml: 'auto',
                                fontWeight: 700,
                                border: '2px solid #8B4513'
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body1" sx={{ color: '#556B2F', mb: 1, fontWeight: 600, display: 'block' }}>
                              {notification.message}
                            </Typography>
                            <Typography component="span" variant="caption" sx={{ color: '#8B4513', fontWeight: 600, display: 'block' }}>
                              🕐 {notification.time}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemSecondaryAction sx={{ right: 16 }}>
                        <Stack direction="row" spacing={1}>
                          {!notification.read && (
                            <Tooltip title="Mark as read">
                              <IconButton 
                                size="medium"
                                onClick={() => markAsRead(notification.id)}
                                sx={{ 
                                  color: '#228B22',
                                  bgcolor: 'rgba(34, 139, 34, 0.1)',
                                  border: '2px solid #228B22',
                                  width: 40,
                                  height: 40,
                                  '&:hover': {
                                    bgcolor: '#228B22',
                                    color: jungle.wheat
                                  }
                                }}
                              >
                                <MarkEmailRead fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Delete">
                            <IconButton 
                              size="medium"
                              onClick={() => deleteNotification(notification.id)}
                              sx={{ 
                                color: '#DC143C',
                                bgcolor: 'rgba(220, 20, 60, 0.1)',
                                border: '2px solid #DC143C',
                                width: 40,
                                height: 40,
                                '&:hover': {
                                  bgcolor: '#DC143C',
                                  color: jungle.wheat
                                }
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < filteredNotifications.length - 1 && (
                      <Divider sx={{ mx: 3, borderColor: '#8B4513', borderWidth: 2 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
} 