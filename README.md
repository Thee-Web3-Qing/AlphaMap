# AlphaMap 🗺️

> **Decentralized Web3 Intelligence Platform** - Track whales, manage portfolios, and discover alpha across multiple chains

[![ICP](https://img.shields.io/badge/Built%20on-ICP-29abe2?style=for-the-badge&logo=internet-computer)](https://internetcomputer.org/)
[![AI](https://img.shields.io/badge/AI-Powered-10b981?style=for-the-badge&logo=openai)](https://openai.com/)
[![DeFi](https://img.shields.io/badge/DeFi-Ready-ff6b6b?style=for-the-badge&logo=ethereum)](https://ethereum.org/)

## 🎯 Product Vision

AlphaMap empowers Web3 degens and savvy users to:
- **Track whale wallet activity** across multiple chains
- **Manage multichain portfolios** with AI-driven insights
- **Discover high-signal community alpha** with unparalleled ease

Built on the Internet Computer Protocol (ICP), AlphaMap automates tedious tasks and delivers actionable insights through intuitive features like user-named wallet identities, AI-driven relationship inference, and interactive transaction mind maps.

## 🚀 Key Features

### 🐋 Whale Tracking with Intelligent Relationships
- Track top whale wallets across Bitcoin, Ethereum, Solana, Base, and ICP
- AI-powered wallet relationship inference (Primary, Secondary, Unknown)
- User-defined wallet naming (e.g., "Sofia", "Jacob")
- Interactive mind maps visualizing transaction flows
- CEX endpoint flagging as "Untrackable"

### 💼 Multichain Portfolio Management
- Aggregate user + whale wallets across all supported chains
- Real-time balances, PNL, and token allocation tracking
- AI-based rebalancing and tax efficiency suggestions
- User-defined wallet naming for clarity

### 🔥 Community Alpha Feed
- Curated high-signal posts from X, Discord, and ICP forums
- AI-ranked content by sentiment, engagement, and whale correlation
- "Alpha of the Day" featuring trending tokens and DeFi opportunities

### 🎨 Accessibility & Automation
- **Zero user fees** via ICP's reverse gas model
- Real-time automation of tracking, reconciliation, and curation
- Wallet-free logins via Internet Identity

## 💎 Premium Features

| Feature | Free Tier | Premium ($10/month) |
|---------|-----------|---------------------|
| Whale Tracking | 5 wallets | Unlimited |
| Wallet Naming | 5 total | Unlimited |
| Chains Supported | 2 (ETH, Base) | All chains |
| Mind Maps | View only | Exportable |
| Alpha Feed | Daily updates | Real-time alerts |
| Portfolio Tools | Basic | Full analytics |

## 🏗️ Technical Architecture

### Backend: ICP Canisters
- **Whale Tracking Canister**: API outcalls to Basescan, Etherscan, Solscan
- **Portfolio Canister**: Balance aggregation, PNL calculation, Internet Identity
- **Alpha Curation Canister**: Social media scraping, AI ranking
- **Mind Map Canister**: D3.js flow visualization, CEX detection

### Frontend
- **Framework**: Next.js with TypeScript
- **UI**: Material-UI with custom blue/green/purple theme
- **Hosting**: On-chain via ICP
- **Components**: Wallet naming, mind maps, portfolio dashboard, alpha feed

### Data Sources
- **On-Chain**: Basescan, Solscan, Etherscan, BitInfoCharts
- **Off-Chain**: X, Discord, ICP forums
- **AI Models**: GPT-2 for relationship + sentiment analysis

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- DFX (Internet Computer SDK)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/alphamap.git
cd alphamap

# Install dependencies
npm install

# Install DFX (if not already installed)
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Start local replica
dfx start --background

# Deploy canisters
dfx deploy

# Start frontend
npm run dev
```

## 📁 Project Structure

```
alphamap/
├── backend/                 # ICP canisters
│   ├── whale_tracking/     # Whale tracking logic
│   ├── portfolio/          # Portfolio management
│   ├── alpha_feed/         # Alpha curation
│   └── mind_map/           # Mind map generation
├── frontend/               # Next.js application
│   ├── app/               # App router pages
│   ├── components/        # Reusable components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   └── styles/           # Global styles
└── docs/                 # Documentation
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1976d2`
- **Secondary Green**: `#2e7d32`
- **Accent Purple**: `#7b1fa2`
- **Background**: `#fafafa`
- **Surface**: `#ffffff`

### Typography
- **Headings**: Inter (Bold)
- **Body**: Inter (Regular)
- **Code**: JetBrains Mono

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### ICP Deployment
```bash
dfx deploy --network ic
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 WCHL 2025 Submission

AlphaMap is being developed for the WCHL 2025 hackathon, targeting:
- **AI Track**: On-chain AI for wallet relationship inference
- **DeFi Track**: Cross-chain portfolio management and alpha discovery
- **Open Track**: Innovative UX with mind maps and wallet naming

## 📞 Support

- **Discord**: [Join our community](https://discord.gg/alphamap)
- **Twitter**: [@AlphaMap_ICP](https://twitter.com/AlphaMap_ICP)
- **Email**: hello@alphamap.ic

## 🙏 Acknowledgments

- Internet Computer Protocol team
- Chain Fusion for cross-chain data
- D3.js for mind map visualizations
- Material-UI for the design system

---

**Built with ❤️ for the Web3 community** 