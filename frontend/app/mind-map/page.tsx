"use client";
import * as React from "react";
import Link from "next/link";
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
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Container
} from "@mui/material";
import { 
  Warning,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  Refresh,
  FilterList,
  Settings,
  PlayArrow,
  Pause,
  Speed,
  AccountTree,
  Visibility,
  TrendingUp,
  AccountBalance,
  Psychology,
  CenterFocusStrong,
  Share,
  Download,
  Link as LinkIcon
} from "@mui/icons-material";
import dynamic from "next/dynamic";
import { MindMapGraph } from "../../components/MindMapGraph";

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

// Enhanced mock mind map data
const mockMindMapData = {
  nodes: [
    {
      id: "sofia-primary",
      name: "Sofia (Primary)",
      type: "whale",
      balance: "1200 ETH",
      value: "$4.2M",
      relationship: "Primary",
      avatar: "S",
      x: 400,
      y: 200,
      connections: ["sofia-secondary", "base-dex", "cex-endpoint", "eth-dex"],
      activity: "High",
      lastTx: "2h ago"
    },
    {
      id: "sofia-secondary", 
      name: "Sofia (Secondary)",
      type: "whale",
      balance: "300 ETH",
      value: "$1.05M",
      relationship: "Secondary",
      avatar: "S",
      x: 600,
      y: 300,
      connections: ["base-dex", "sofia-primary"],
      activity: "Medium",
      lastTx: "5h ago"
    },
    {
      id: "jacob-unknown",
      name: "Jacob (Unknown)",
      type: "whale", 
      balance: "50 ETH",
      value: "$175K",
      relationship: "Unknown",
      avatar: "J",
      x: 200,
      y: 400,
      connections: ["eth-dex", "base-dex"],
      activity: "Low",
      lastTx: "1d ago"
    },
    {
      id: "base-dex",
      name: "Base DEX",
      type: "protocol",
      protocol: "Uniswap V3",
      volume: "$2.1M",
      avatar: "🔄",
      x: 500,
      y: 150,
      connections: ["sofia-primary", "sofia-secondary", "jacob-unknown"],
      activity: "Very High",
      lastTx: "30m ago"
    },
    {
      id: "eth-dex",
      name: "Ethereum DEX",
      type: "protocol", 
      protocol: "SushiSwap",
      volume: "$850K",
      avatar: "🔄",
      x: 100,
      y: 350,
      connections: ["jacob-unknown", "sofia-primary"],
      activity: "High",
      lastTx: "1h ago"
    },
    {
      id: "cex-endpoint",
      name: "CEX Endpoint",
      type: "cex",
      exchange: "Binance",
      status: "Untrackable",
      avatar: "⚠️",
      x: 700,
      y: 100,
      connections: ["sofia-primary"],
      activity: "Unknown",
      lastTx: "N/A"
    },
    {
      id: "whale-0x789",
      name: "Whale_0x789",
      type: "whale",
      balance: "2500 ETH",
      value: "$8.75M",
      relationship: "Primary",
      avatar: "W",
      x: 300,
      y: 100,
      connections: ["base-dex", "eth-dex"],
      activity: "Very High",
      lastTx: "15m ago"
    },
    {
      id: "defi-protocol",
      name: "DeFi Protocol",
      type: "protocol",
      protocol: "Aave V3",
      volume: "$1.5M",
      avatar: "🏦",
      x: 800,
      y: 400,
      connections: ["sofia-secondary"],
      activity: "Medium",
      lastTx: "3h ago"
    }
  ],
  connections: [
    { from: "sofia-primary", to: "sofia-secondary", amount: "50 ETH", type: "transfer", strength: 0.8 },
    { from: "sofia-primary", to: "base-dex", amount: "100 ETH", type: "swap", strength: 0.9 },
    { from: "sofia-secondary", to: "base-dex", amount: "25 ETH", type: "swap", strength: 0.6 },
    { from: "jacob-unknown", to: "eth-dex", amount: "10 ETH", type: "swap", strength: 0.4 },
    { from: "sofia-primary", to: "cex-endpoint", amount: "200 ETH", type: "withdrawal", strength: 0.7 },
    { from: "whale-0x789", to: "base-dex", amount: "500 ETH", type: "swap", strength: 0.95 },
    { from: "whale-0x789", to: "eth-dex", amount: "300 ETH", type: "swap", strength: 0.8 },
    { from: "sofia-secondary", to: "defi-protocol", amount: "75 ETH", type: "deposit", strength: 0.5 },
    { from: "jacob-unknown", to: "base-dex", amount: "5 ETH", type: "swap", strength: 0.3 }
  ]
};

const transactionHistory = [
  {
    id: 1,
    from: "Sofia (Primary)",
    to: "Base DEX",
    amount: "100 ETH",
    type: "Swap",
    token: "ETH → BASE",
    time: "2 hours ago",
    value: "$350,000",
    status: "completed"
  },
  {
    id: 2,
    from: "Sofia (Primary)", 
    to: "Sofia (Secondary)",
    amount: "50 ETH",
    type: "Transfer",
    token: "ETH",
    time: "5 hours ago",
    value: "$175,000",
    status: "completed"
  },
  {
    id: 3,
    from: "Jacob (Unknown)",
    to: "Ethereum DEX",
    amount: "10 ETH",
    type: "Swap",
    token: "ETH → USDC",
    time: "1 day ago",
    value: "$35,000",
    status: "completed"
  },
  {
    id: 4,
    from: "Whale_0x789",
    to: "Base DEX",
    amount: "500 ETH",
    type: "Swap",
    token: "ETH → BASE",
    time: "15 minutes ago",
    value: "$1,750,000",
    status: "pending"
  }
];

// Dynamically import react-force-graph for SSR compatibility
const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), { ssr: false });

export default function MindMapPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedNode, setSelectedNode] = React.useState<string | null>('sofia-primary');
  const [zoom, setZoom] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showLabels, setShowLabels] = React.useState(true);
  const [filterType, setFilterType] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading for better UX
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const getNodeColor = (type: string, relationship?: string) => {
    switch (type) {
      case 'whale':
        if (relationship === 'Primary') return '#1976d2';
        if (relationship === 'Secondary') return '#2e7d32';
        return '#0288d1';
      case 'protocol':
        return '#388e3c';
      case 'cex':
        return '#d32f2f';
      default:
        return theme.palette.grey[500];
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'Very High': return '#2e7d32';
      case 'High': return '#1976d2';
      case 'Medium': return '#f57c00';
      case 'Low': return '#757575';
      default: return '#d32f2f';
    }
  };

  const filteredNodes = mockMindMapData.nodes.filter(node => {
    if (filterType === 'all') return true;
    return node.type === filterType;
  });

  const mindMapStats = [
    { label: "Total Nodes", value: mockMindMapData.nodes.length, change: "+10%", color: jungle.olive, icon: <AccountTree /> },
    { label: "Total Connections", value: mockMindMapData.connections.length, change: "+5%", color: jungle.olive, icon: <LinkIcon /> },
    { label: "Average Activity", value: "High", change: "+20%", color: jungle.olive, icon: <TrendingUp /> },
    { label: "Total Value", value: "$12.5M", change: "+15%", color: jungle.olive, icon: <AccountBalance /> }
  ];

  // Find the selected wallet node
  const selectedWallet = mockMindMapData.nodes.find(n => n.id === selectedNode);

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
              🗺️ Mind Map Visualizer
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
              Visualize wallet relationships and flows!
            </Typography>
          </Box>

          {/* Selected Wallet Name */}
          {selectedWallet && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#8B4513', fontFamily: comicFont }}>
                Wallet: {selectedWallet.name}
              </Typography>
            </Box>
          )}

          {/* Mind Map Visualization */}
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
                  🗺️ Interactive Mind Map
                </Typography>
              </Box>
              <Box sx={{ 
                height: { xs: 400, md: 500 }, 
                width: '100%',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                m: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2
              }}>
                {isLoading ? (
                  <>
                    <Box sx={{ 
                      width: 80, 
                      height: 80, 
                      border: '4px solid #8B4513', 
                      borderTop: '4px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      mb: 2
                    }} />
                    <Typography variant="h6" sx={{ color: '#8B4513', fontFamily: comicFont, textAlign: 'center' }}>
                      Loading Mind Map...
                    </Typography>
                  </>
                ) : (
                  <>
                    <AccountTree sx={{ fontSize: 80, color: '#8B4513', opacity: 0.7 }} />
                    <Typography variant="h5" sx={{ color: '#8B4513', fontFamily: comicFont, mb: 2, textAlign: 'center' }}>
                      Mind Map Visualization Coming Soon!
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#556B2F', textAlign: 'center', fontFamily: comicFont }}>
                      Interactive wallet relationship and transaction map will be available here soon.
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Controls and Filters */}
          <Card sx={{ 
            background: 'rgba(245, 222, 179, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '3px solid #8B4513',
            borderRadius: 3,
            mb: 3
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#8B4513', mb: 2, textAlign: 'center' }}>
                🎛️ Map Controls
              </Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="center">
                <Button 
                  variant="contained"
                  startIcon={<ZoomIn />}
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
                  Zoom In
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<ZoomOut />}
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
                  Zoom Out
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<CenterFocusStrong />}
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
                  Reset View
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<Refresh />}
                  sx={{ 
                    fontFamily: comicFont,
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    color: jungle.wheat,
                    border: '3px solid #8B4513',
                    borderRadius: 3,
                    fontWeight: 700,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #F7931E 0%, #FF6B35 100%)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Refresh Data
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant={isMobile ? "h6" : "h6"} fontWeight={600} gutterBottom sx={{ 
              fontFamily: comicFont,
              color: jungle.wheat,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Quick Actions
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                variant="contained"
                size={isMobile ? "small" : "medium"}
                startIcon={<AccountTree />}
                sx={{ 
                  fontFamily: comicFont,
                  background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
                  color: jungle.wheat,
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Create Map
              </Button>
              <Button 
                variant="contained"
                size={isMobile ? "small" : "medium"}
                startIcon={<Share />}
                sx={{ 
                  fontFamily: comicFont,
                  background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
                  color: jungle.wheat,
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Share Map
              </Button>
              <Button 
                variant="contained"
                size={isMobile ? "small" : "medium"}
                startIcon={<Download />}
                sx={{ 
                  fontFamily: comicFont,
                  background: 'linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)',
                  color: jungle.wheat,
                  border: '3px solid #8B4513',
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Export
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 