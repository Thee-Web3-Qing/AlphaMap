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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, useMediaQuery, Badge, Avatar } from "@mui/material";
import { 
  Home, 
  Visibility, 
  AccountBalance, 
  Psychology, 
  AccountTree,
  Notifications,
  AccountCircle
} from "@mui/icons-material";

const navItems = [
  { 
    label: "Home", 
    path: "/", 
    icon: <Home />,
    color: "inherit"
  },
  { 
    label: "Whale Tracking", 
    path: "/whale-tracking", 
    icon: <Visibility />,
    color: "primary"
  },
  { 
    label: "Portfolio", 
    path: "/portfolio", 
    icon: <AccountBalance />,
    color: "secondary"
  },
  { 
    label: "Alpha Feed", 
    path: "/alpha-feed", 
    icon: <Psychology />,
    color: "info"
  },
  { 
    label: "Mind Map", 
    path: "/mind-map", 
    icon: <AccountTree />,
    color: "success"
  }
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ 
      width: 280, 
      height: '100%',
      background: 'linear-gradient(180deg, rgba(25, 118, 210, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white'
      }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
          🗺️ AlphaMap
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Web3 Intelligence Platform
        </Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            onClick={() => handleNavigation(item.path)}
            selected={pathname === item.path}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 2,
              cursor: 'pointer',
              '&.Mui-selected': {
                background: `linear-gradient(135deg, ${theme.palette[item.color as keyof typeof theme.palette]?.main} 0%, ${theme.palette[item.color as keyof typeof theme.palette]?.light} 100%)`,
                color: 'white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette[item.color as keyof typeof theme.palette]?.dark} 0%, ${theme.palette[item.color as keyof typeof theme.palette]?.main} 100%)`,
                }
              },
              '&:hover': {
                background: 'rgba(25, 118, 210, 0.08)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <ListItemIcon sx={{ 
              color: pathname === item.path ? 'white' : 'inherit',
              minWidth: 40
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                fontWeight: pathname === item.path ? 600 : 500
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: { xs: 2, md: 3 } }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ px: { xs: 1, md: 3 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => router.push('/')}
            >
              🗺️ AlphaMap
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              {navItems.map((item) => (
                <Tooltip key={item.path} title={item.label} placement="bottom">
                  <IconButton
                    color={pathname === item.path ? (item.color as any) : "inherit"}
                    onClick={() => handleNavigation(item.path)}
                    sx={{ 
                      background: pathname === item.path 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: 'rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          )}

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Profile">
              <IconButton
                color="inherit"
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            border: 'none',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 