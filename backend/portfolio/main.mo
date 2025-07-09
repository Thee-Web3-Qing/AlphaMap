import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Trie "mo:base/Trie";

// Types for portfolio management
type PortfolioId = Text;
type WalletAddress = Text;
type Chain = {
    #Ethereum;
    #Bitcoin;
    #Solana;
    #Base;
    #ICP;
};

type Asset = {
    id: Text;
    name: Text;
    symbol: Text;
    balance: Float;
    value: Float;
    price: Float;
    change24h: Float;
    change7d: Float;
    allocation: Float;
    avatar: Text;
    chain: Chain;
    status: Text;
};

type Portfolio = {
    id: PortfolioId;
    owner: Principal;
    totalValue: Float;
    totalPnL: Float;
    pnlPercentage: Float;
    change24h: Float;
    change7d: Float;
    change30d: Float;
    assets: [Asset];
    createdAt: Int64;
    updatedAt: Int64;
};

type Wallet = {
    id: Text;
    name: Text;
    address: WalletAddress;
    chain: Chain;
    balance: Float;
    isConnected: Bool;
};

// Actor class for Portfolio Canister
actor class Portfolio() = {
    
    // Storage for portfolios
    private stable var portfolioEntries: [(PortfolioId, Portfolio)] = [];
    private var portfolios = HashMap.HashMap<PortfolioId, Portfolio>(0, Text.equal, Text.hash);
    
    // Storage for user wallets
    private stable var walletEntries: [(Principal, [Wallet])] = [];
    private var userWallets = HashMap.HashMap<Principal, [Wallet]>(0, Principal.equal, Principal.hash);
    
    // Initialize with mock data
    private func initializeMockData() {
        let mockAssets: [Asset] = [
            {
                id = "eth_1";
                name = "Ethereum";
                symbol = "ETH";
                balance = 12.5;
                value = 43750.0;
                price = 3500.0;
                change24h = 5.2;
                change7d = 12.4;
                allocation = 51.6;
                avatar = "Ξ";
                chain = #Ethereum;
                status = "active";
            },
            {
                id = "btc_1";
                name = "Bitcoin";
                symbol = "BTC";
                balance = 0.85;
                value = 42500.0;
                price = 50000.0;
                change24h = 3.1;
                change7d = 8.7;
                allocation = 50.2;
                avatar = "₿";
                chain = #Bitcoin;
                status = "active";
            },
            {
                id = "sol_1";
                name = "Solana";
                symbol = "SOL";
                balance = 125.0;
                value = 18750.0;
                price = 150.0;
                change24h = 15.3;
                change7d = 28.9;
                allocation = 22.1;
                avatar = "◎";
                chain = #Solana;
                status = "active";
            }
        ];
        
        let mockPortfolio: Portfolio = {
            id = "default_portfolio";
            owner = Principal.fromText("2vxsx-fae"); // Anonymous principal for demo
            totalValue = 847234.56;
            totalPnL = 124567.89;
            pnlPercentage = 17.2;
            change24h = 23456.78;
            change7d = 67890.12;
            change30d = 98765.43;
            assets = mockAssets;
            createdAt = 1703123456789;
            updatedAt = 1703123456789;
        };
        
        portfolios.put(mockPortfolio.id, mockPortfolio);
    };
    
    // System functions
    system func preupgrade() {
        portfolioEntries := Iter.toArray(portfolios.entries());
        walletEntries := Iter.toArray(userWallets.entries());
    };
    
    system func postupgrade() {
        portfolios := HashMap.fromIter<PortfolioId, Portfolio>(portfolioEntries.vals(), portfolioEntries.size(), Text.equal, Text.hash);
        userWallets := HashMap.fromIter<Principal, [Wallet]>(walletEntries.vals(), walletEntries.size(), Principal.equal, Principal.hash);
        portfolioEntries := [];
        walletEntries := [];
        initializeMockData();
    };
    
    // Public API functions
    
    // Get portfolio by ID
    public query func getPortfolio(id: PortfolioId) : async ?Portfolio {
        portfolios.get(id)
    };
    
    // Get user's portfolio
    public shared({caller}) func getUserPortfolio() : async ?Portfolio {
        let userPortfolios = Array.filter(Iter.toArray(portfolios.vals()), func (p: Portfolio) : Bool { p.owner == caller });
        if (userPortfolios.size() > 0) {
            ?userPortfolios[0]
        } else {
            null
        }
    };
    
    // Create new portfolio
    public shared({caller}) func createPortfolio() : async Result.Result<PortfolioId, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot create portfolios");
        };
        
        let portfolioId = "portfolio_" # Principal.toText(caller);
        let newPortfolio: Portfolio = {
            id = portfolioId;
            owner = caller;
            totalValue = 0.0;
            totalPnL = 0.0;
            pnlPercentage = 0.0;
            change24h = 0.0;
            change7d = 0.0;
            change30d = 0.0;
            assets = [];
            createdAt = Time.now();
            updatedAt = Time.now();
        };
        
        portfolios.put(portfolioId, newPortfolio);
        #ok(portfolioId)
    };
    
    // Add asset to portfolio
    public shared({caller}) func addAsset(portfolioId: PortfolioId, asset: Asset) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add assets");
        };
        
        switch (portfolios.get(portfolioId)) {
            case null { #err("Portfolio not found") };
            case (?portfolio) {
                if (portfolio.owner != caller) {
                    return #err("Not authorized to modify this portfolio");
                };
                
                let updatedAssets = Array.append(portfolio.assets, [asset]);
                let totalValue = Array.foldLeft<Asset, Float>(updatedAssets, 0.0, func (acc: Float, a: Asset) : Float { acc + a.value });
                
                let updatedPortfolio: Portfolio = {
                    id = portfolio.id;
                    owner = portfolio.owner;
                    totalValue = totalValue;
                    totalPnL = portfolio.totalPnL;
                    pnlPercentage = portfolio.pnlPercentage;
                    change24h = portfolio.change24h;
                    change7d = portfolio.change7d;
                    change30d = portfolio.change30d;
                    assets = updatedAssets;
                    createdAt = portfolio.createdAt;
                    updatedAt = Time.now();
                };
                
                portfolios.put(portfolioId, updatedPortfolio);
                #ok(())
            };
        }
    };
    
    // Update asset in portfolio
    public shared({caller}) func updateAsset(portfolioId: PortfolioId, assetId: Text, asset: Asset) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot update assets");
        };
        
        switch (portfolios.get(portfolioId)) {
            case null { #err("Portfolio not found") };
            case (?portfolio) {
                if (portfolio.owner != caller) {
                    return #err("Not authorized to modify this portfolio");
                };
                
                let updatedAssets = Array.map<Asset, Asset>(portfolio.assets, func (a: Asset) : Asset {
                    if (a.id == assetId) { asset } else { a }
                });
                
                let totalValue = Array.foldLeft<Asset, Float>(updatedAssets, 0.0, func (acc: Float, a: Asset) : Float { acc + a.value });
                
                let updatedPortfolio: Portfolio = {
                    id = portfolio.id;
                    owner = portfolio.owner;
                    totalValue = totalValue;
                    totalPnL = portfolio.totalPnL;
                    pnlPercentage = portfolio.pnlPercentage;
                    change24h = portfolio.change24h;
                    change7d = portfolio.change7d;
                    change30d = portfolio.change30d;
                    assets = updatedAssets;
                    createdAt = portfolio.createdAt;
                    updatedAt = Time.now();
                };
                
                portfolios.put(portfolioId, updatedPortfolio);
                #ok(())
            };
        }
    };
    
    // Get user wallets
    public shared({caller}) func getUserWallets() : async [Wallet] {
        switch (userWallets.get(caller)) {
            case null { [] };
            case (?wallets) { wallets };
        }
    };
    
    // Add wallet
    public shared({caller}) func addWallet(wallet: Wallet) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add wallets");
        };
        
        let currentWallets = switch (userWallets.get(caller)) {
            case null { [] };
            case (?wallets) { wallets };
        };
        
        let updatedWallets = Array.append(currentWallets, [wallet]);
        userWallets.put(caller, updatedWallets);
        #ok(())
    };
    
    // Get portfolio statistics
    public query func getPortfolioStats() : async {
        totalPortfolios: Nat;
        totalValue: Float;
        averagePnL: Float;
        activeAssets: Nat;
    } {
        let allPortfolios = Iter.toArray(portfolios.vals());
        let totalPortfolios = allPortfolios.size();
        let totalValue = Array.foldLeft<Portfolio, Float>(allPortfolios, 0.0, func (acc: Float, p: Portfolio) : Float { acc + p.totalValue });
        let averagePnL = if (totalPortfolios > 0) { totalValue / Float.fromInt(totalPortfolios) } else { 0.0 };
        let activeAssets = Array.foldLeft<Portfolio, Nat>(allPortfolios, 0, func (acc: Nat, p: Portfolio) : Nat { acc + p.assets.size() });
        
        {
            totalPortfolios = totalPortfolios;
            totalValue = totalValue;
            averagePnL = averagePnL;
            activeAssets = activeAssets;
        }
    };
}; 