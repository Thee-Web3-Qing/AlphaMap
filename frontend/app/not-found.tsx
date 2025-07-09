"use client";
import * as React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

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

export default function NotFound() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2F4F2F 0%, #556B2F 50%, #8FBC8F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: comicFont,
      pt: { xs: 10, md: 12 }
    }}>
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

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            textAlign: 'center',
            background: 'rgba(245, 222, 179, 0.95)',
            backdropFilter: 'blur(10px)',
            color: jungle.saddleBrown,
            border: '3px solid #8B4513',
            borderRadius: 3,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 700,
              color: jungle.saddleBrown,
              fontFamily: comicFont,
              textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              color: jungle.saddleBrown,
              fontWeight: 700,
              fontFamily: comicFont,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            🗺️ Page Not Found
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: jungle.saddleBrown,
              fontFamily: comicFont,
              mb: 4,
              opacity: 0.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Oops! Looks like you've ventured into uncharted territory. 
            The page you're looking for doesn't exist in our jungle.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => router.push('/')}
              sx={{
                background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                color: jungle.wheat,
                fontFamily: comicFont,
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                border: '2px solid #8B4513',
                '&:hover': {
                  background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(139, 69, 19, 0.4)'
                }
              }}
            >
              Go Home
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => router.back()}
              sx={{
                borderColor: jungle.saddleBrown,
                color: jungle.saddleBrown,
                fontFamily: comicFont,
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderColor: jungle.goldenBrown,
                  color: jungle.goldenBrown,
                  background: 'rgba(139, 69, 19, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(139, 69, 19, 0.2)'
                }
              }}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 