"use client";
import * as React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Stack, 
  Paper,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  AccountTree, 
  Visibility, 
  TrendingUp, 
  Warning,
  Info,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  Refresh
} from "@mui/icons-material";

// Mock mind map data
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
      connections: ["sofia-secondary", "base-dex", "cex-endpoint"]
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
      connections: ["base-dex"]
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
      connections: ["eth-dex"]
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
      connections: ["sofia-primary", "sofia-secondary"]
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
      connections: ["jacob-unknown"]
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
      connections: ["sofia-primary"]
    }
  ],
  connections: [
    { from: "sofia-primary", to: "sofia-secondary", amount: "50 ETH", type: "transfer" },
    { from: "sofia-primary", to: "base-dex", amount: "100 ETH", type: "swap" },
    { from: "sofia-secondary", to: "base-dex", amount: "25 ETH", type: "swap" },
    { from: "jacob-unknown", to: "eth-dex", amount: "10 ETH", type: "swap" },
    { from: "sofia-primary", to: "cex-endpoint", amount: "200 ETH", type: "withdrawal" }
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
    value: "$350,000"
  },
  {
    id: 2,
    from: "Sofia (Primary)", 
    to: "Sofia (Secondary)",
    amount: "50 ETH",
    type: "Transfer",
    token: "ETH",
    time: "5 hours ago",
    value: "$175,000"
  },
  {
    id: 3,
    from: "Jacob (Unknown)",
    to: "Ethereum DEX",
    amount: "10 ETH",
    type: "Swap",
    token: "ETH → USDC",
    time: "1 day ago",
    value: "$35,000"
  }
];

export default function MindMapPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);
  const [zoom, setZoom] = React.useState(1);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const getNodeColor = (type: string, relationship?: string) => {
    switch (type) {
      case 'whale':
        if (relationship === 'Primary') return theme.palette.primary.main;
        if (relationship === 'Secondary') return theme.palette.secondary.main;
        return theme.palette.info.main;
      case 'protocol':
        return theme.palette.success.main;
      case 'cex':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", mt: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          color="primary" 
          fontWeight={700} 
          gutterBottom
        >
          🧠 Mind Map Visualizer
        </Typography>
        <Typography 
          variant={isMobile ? "body1" : "subtitle1"} 
          color="text.secondary" 
          gutterBottom
        >
          Interactive visualization of wallet relationships and transaction flows across multiple chains.
        </Typography>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Typography variant="subtitle2" fontWeight={600}>
            Controls:
          </Typography>
          <Tooltip title="Zoom In">
            <IconButton size="small" onClick={() => setZoom(Math.min(zoom + 0.1, 2))}>
              <ZoomIn />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton size="small" onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}>
              <ZoomOut />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset View">
            <IconButton size="small" onClick={() => setZoom(1)}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Fullscreen">
            <IconButton size="small">
              <Fullscreen />
            </IconButton>
          </Tooltip>
          <Chip label={`Zoom: ${Math.round(zoom * 100)}%`} size="small" color="info" />
        </Stack>
      </Card>

      {/* Mind Map Visualization */}
      <Grid container spacing={3}>
        <Grid xs={12} lg={8}>
          <Card sx={{ height: 600, position: 'relative', overflow: 'hidden' }}>
            <CardContent sx={{ p: 0, height: '100%' }}>
              {/* SVG Container for Mind Map */}
              <Box 
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  bgcolor: 'grey.50',
                  position: 'relative',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Connection Lines */}
                <svg 
                  width="100%" 
                  height="100%" 
                  style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                >
                  {mockMindMapData.connections.map((connection, index) => {
                    const fromNode = mockMindMapData.nodes.find(n => n.id === connection.from);
                    const toNode = mockMindMapData.nodes.find(n => n.id === connection.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                      <g key={index}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke={connection.type === 'transfer' ? theme.palette.primary.main : 
                                  connection.type === 'swap' ? theme.palette.success.main : 
                                  theme.palette.warning.main}
                          strokeWidth={2}
                          strokeDasharray={connection.type === 'withdrawal' ? '5,5' : 'none'}
                        />
                        <circle
                          cx={(fromNode.x + toNode.x) / 2}
                          cy={(fromNode.y + toNode.y) / 2}
                          r={4}
                          fill={connection.type === 'transfer' ? theme.palette.primary.main : 
                                connection.type === 'swap' ? theme.palette.success.main : 
                                theme.palette.warning.main}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Nodes */}
                {mockMindMapData.nodes.map((node) => (
                  <Box
                    key={node.id}
                    sx={{
                      position: 'absolute',
                      left: node.x - 30,
                      top: node.y - 30,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        zIndex: 10
                      }
                    }}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    <Card 
                      sx={{ 
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: getNodeColor(node.type, node.relationship),
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: selectedNode === node.id ? '3px solid white' : 'none',
                        boxShadow: selectedNode === node.id ? 4 : 2,
                        position: 'relative'
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {node.avatar}
                      </Typography>
                    </Card>
                    
                    {/* Node Label */}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        position: 'absolute',
                        top: 70,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        bgcolor: 'rgba(255,255,255,0.9)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}
                    >
                      {node.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Selected Node Details */}
            {selectedNode && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Node Details
                  </Typography>
                  {(() => {
                    const node = mockMindMapData.nodes.find(n => n.id === selectedNode);
                    if (!node) return null;
                    
                    return (
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: getNodeColor(node.type, node.relationship) }}>
                            {node.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {node.name}
                            </Typography>
                            <Chip 
                              label={node.type.toUpperCase()} 
                              size="small" 
                              color={node.type === 'whale' ? 'primary' : 
                                     node.type === 'protocol' ? 'success' : 'error'}
                            />
                          </Box>
                        </Box>
                        
                        {node.type === 'whale' && (
                          <>
                            <Typography variant="body2">
                              <strong>Balance:</strong> {node.balance}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Value:</strong> {node.value}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Relationship:</strong> {node.relationship}
                            </Typography>
                          </>
                        )}
                        
                        {node.type === 'protocol' && (
                          <>
                            <Typography variant="body2">
                              <strong>Protocol:</strong> {node.protocol}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Volume:</strong> {node.volume}
                            </Typography>
                          </>
                        )}
                        
                        {node.type === 'cex' && (
                          <>
                            <Typography variant="body2">
                              <strong>Exchange:</strong> {node.exchange}
                            </Typography>
                            <Typography variant="body2" color="error.main">
                              <strong>Status:</strong> {node.status}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Transaction History */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Recent Transactions
                </Typography>
                <Stack spacing={2}>
                  {transactionHistory.map((tx) => (
                    <Box key={tx.id} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {tx.from} → {tx.to}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {tx.amount} • {tx.token}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Chip 
                            label={tx.type} 
                            size="small" 
                            color={tx.type === 'Swap' ? 'success' : 'primary'}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            {tx.time}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Legend
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    <Typography variant="body2">Primary Whale</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                    <Typography variant="body2">Secondary Whale</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'info.main' }} />
                    <Typography variant="body2">Unknown Whale</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'success.main' }} />
                    <Typography variant="body2">Protocol/DEX</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'error.main' }} />
                    <Typography variant="body2">CEX Endpoint</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* CEX Warning */}
      <Card sx={{ mt: 3, borderLeft: 6, borderColor: "error.main" }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Warning color="error" />
            <Typography variant="body1" fontWeight={600}>
              CEX Endpoints are flagged as "Untrackable"
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Centralized exchange endpoints are flagged and not tracked further for privacy and transparency. 
            Funds sent to CEX addresses cannot be traced beyond this point.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 