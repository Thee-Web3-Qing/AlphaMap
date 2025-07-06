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
import { useTheme, useMediaQuery } from "@mui/material";
import { 
  Home, 
  Visibility, 
  AccountBalance, 
  Psychology, 
  AccountTree 
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
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          AlphaMap
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            button 
            onClick={() => handleNavigation(item.path)}
            selected={pathname === item.path}
            sx={{
              '&.Mui-selected': {
                bgcolor: `${item.color}.main`,
                color: 'white',
                '&:hover': {
                  bgcolor: `${item.color}.dark`,
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: pathname === item.path ? 'white' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: { xs: 2, md: 3 } }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            AlphaMap
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Tooltip key={item.path} title={item.label} placement="bottom">
                  <IconButton
                    color={pathname === item.path ? item.color : "inherit"}
                    onClick={() => handleNavigation(item.path)}
                    sx={{ 
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          )}
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
            width: 250,
            bgcolor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 