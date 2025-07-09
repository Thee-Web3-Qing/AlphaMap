"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, useMediaQuery, Badge, Avatar, Stack, Container, Divider } from "@mui/material";
import { 
  Home, 
  Visibility, 
  AccountBalance, 
  Psychology, 
  AccountTree,
  Notifications,
  AccountCircle,
  Map,
  Menu,
  Close
} from "@mui/icons-material";
import Link from "next/link";

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

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/whale-tracking', label: 'Whale Tracking', icon: <Visibility /> },
    { path: '/portfolio', label: 'Portfolio', icon: <AccountBalance /> },
    { path: '/alpha-feed', label: 'Alpha Feed', icon: <Psychology /> },
    { path: '/mind-map', label: 'Mind Map', icon: <AccountTree /> },
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(245, 222, 179, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '3px solid #8B4513',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        fontFamily: comicFont
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 1, md: 2 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 1, md: 3 } }}>
            <Map sx={{ 
              fontSize: { xs: 28, md: 32 }, 
              color: '#8B4513',
              mr: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
            }} />
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: comicFont,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              AlphaMap
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Stack direction="row" spacing={1}>
                {navItems.map((item) => (
                  <Tooltip key={item.path} title={item.label} placement="bottom">
                    <IconButton
                      component={Link}
                      href={item.path}
                      sx={{
                        color: pathname === item.path ? '#8B4513' : '#556B2F',
                        background: pathname === item.path ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                        border: pathname === item.path ? '2px solid #8B4513' : '2px solid transparent',
                        borderRadius: 2,
                        p: 1.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(139, 69, 19, 0.1)',
                          borderColor: '#D2691E',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                        }
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          )}

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <Tooltip title="Notifications" placement="bottom">
              <IconButton
                component={Link}
                href="/notifications"
                sx={{
                  color: pathname === '/notifications' ? '#8B4513' : '#556B2F',
                  background: pathname === '/notifications' ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                  border: pathname === '/notifications' ? '2px solid #8B4513' : '2px solid transparent',
                  borderRadius: 2,
                  p: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(139, 69, 19, 0.1)',
                    borderColor: '#D2691E',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title="Profile" placement="bottom">
              <IconButton
                component={Link}
                href="/profile"
                sx={{
                  color: pathname === '/profile' ? '#8B4513' : '#556B2F',
                  background: pathname === '/profile' ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                  border: pathname === '/profile' ? '2px solid #8B4513' : '2px solid transparent',
                  borderRadius: 2,
                  p: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(139, 69, 19, 0.1)',
                    borderColor: '#D2691E',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 32, 
                  height: 32,
                  border: '2px solid #8B4513',
                  fontSize: '1rem'
                }}>
                  🐒
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Mobile Menu */}
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: '#8B4513',
                  border: '2px solid #8B4513',
                  borderRadius: 2,
                  p: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(139, 69, 19, 0.1)',
                    borderColor: '#D2691E',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }
                }}
              >
                <Menu />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'rgba(245, 222, 179, 0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: '3px solid #8B4513',
            width: 280,
            fontFamily: comicFont
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', fontFamily: comicFont }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#8B4513' }}>
              <Close />
            </IconButton>
          </Box>
          
          <Stack spacing={1}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={Link}
                href={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  color: pathname === item.path ? '#8B4513' : '#556B2F',
                  background: pathname === item.path ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                  border: pathname === item.path ? '2px solid #8B4513' : '2px solid transparent',
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(139, 69, 19, 0.1)',
                    borderColor: '#D2691E',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      fontWeight: pathname === item.path ? 700 : 500,
                      fontFamily: comicFont
                    } 
                  }} 
                />
              </ListItemButton>
            ))}
            
            <Divider sx={{ my: 2, borderColor: 'rgba(139, 69, 19, 0.3)' }} />
            
            <ListItemButton
              component={Link}
              href="/notifications"
              onClick={handleDrawerToggle}
              sx={{
                color: pathname === '/notifications' ? '#8B4513' : '#556B2F',
                background: pathname === '/notifications' ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                border: pathname === '/notifications' ? '2px solid #8B4513' : '2px solid transparent',
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(139, 69, 19, 0.1)',
                  borderColor: '#D2691E',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </ListItemIcon>
              <ListItemText 
                primary="Notifications" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: pathname === '/notifications' ? 700 : 500,
                    fontFamily: comicFont
                  } 
                }} 
              />
            </ListItemButton>
            
            <ListItemButton
              component={Link}
              href="/profile"
              onClick={handleDrawerToggle}
              sx={{
                color: pathname === '/profile' ? '#8B4513' : '#556B2F',
                background: pathname === '/profile' ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                border: pathname === '/profile' ? '2px solid #8B4513' : '2px solid transparent',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(139, 69, 19, 0.1)',
                  borderColor: '#D2691E',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <Avatar sx={{ 
                  width: 24, 
                  height: 24,
                  border: '2px solid #8B4513',
                  fontSize: '0.8rem'
                }}>
                  🐒
                </Avatar>
              </ListItemIcon>
              <ListItemText 
                primary="Profile" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    fontWeight: pathname === '/profile' ? 700 : 500,
                    fontFamily: comicFont
                  } 
                }} 
              />
            </ListItemButton>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
} 