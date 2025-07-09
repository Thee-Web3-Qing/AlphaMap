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

// Types for alpha feed
type PostId = Text;
type Source = {
    #Twitter;
    #Discord;
    #ICPForum;
    #Telegram;
};

type Sentiment = {
    #Bullish;
    #Bearish;
    #Neutral;
};

type AlphaPost = {
    id: PostId;
    source: Source;
    author: Text;
    content: Text;
    sentiment: Sentiment;
    engagement: Nat;
    whaleCorrelation: Bool;
    timeAgo: Text;
    avatar: Text;
    trending: Bool;
    verified: Bool;
    timestamp: Int64;
    confidence: Float;
};

type AlphaOfTheDay = {
    title: Text;
    description: Text;
    sentiment: Sentiment;
    confidence: Float;
    sources: [Source];
    whaleActivity: Text;
    timeWindow: Text;
    timestamp: Int64;
};

// Actor class for Alpha Feed Canister
actor class AlphaFeed() = {
    
    // Storage for alpha posts
    private stable var postEntries: [(PostId, AlphaPost)] = [];
    private var alphaPosts = HashMap.HashMap<PostId, AlphaPost>(0, Text.equal, Text.hash);
    
    // Storage for alpha of the day
    private stable var alphaOfTheDay: ?AlphaOfTheDay = null;
    
    // Initialize with mock data
    private func initializeMockData() {
        let mockPosts: [AlphaPost] = [
            {
                id = "post_1";
                source = #Twitter;
                author = "@crypto_whale";
                content = "$BASE is trending! Sofia just bought 10k tokens. This could be the next big move. 🚀";
                sentiment = #Bullish;
                engagement = 1200;
                whaleCorrelation = true;
                timeAgo = "2h ago";
                avatar = "🐋";
                trending = true;
                verified = true;
                timestamp = 1703123456789;
                confidence = 0.85;
            },
            {
                id = "post_2";
                source = #Discord;
                author = "alpha_hunter#1234";
                content = "Jacob minted a rare NFT on Base. Community is buzzing! Floor price up 40% in last hour.";
                sentiment = #Bullish;
                engagement = 800;
                whaleCorrelation = true;
                timeAgo = "5h ago";
                avatar = "🎯";
                trending = true;
                verified = false;
                timestamp = 1703123456789;
                confidence = 0.72;
            },
            {
                id = "post_3";
                source = #ICPForum;
                author = "DeFi_Explorer";
                content = "Airdrop opportunity for early Base users. Requirements: 10+ transactions, 30+ days active.";
                sentiment = #Neutral;
                engagement = 300;
                whaleCorrelation = false;
                timeAgo = "1d ago";
                avatar = "💎";
                trending = false;
                verified = true;
                timestamp = 1703123456789;
                confidence = 0.65;
            },
            {
                id = "post_4";
                source = #Twitter;
                author = "@defi_analyst";
                content = "Whale alert: 5000 ETH moved to Base DEX. Could be preparing for major liquidity event.";
                sentiment = #Bearish;
                engagement = 2500;
                whaleCorrelation = true;
                timeAgo = "30m ago";
                avatar = "📊";
                trending = true;
                verified = true;
                timestamp = 1703123456789;
                confidence = 0.78;
            }
        ];
        
        for (post in mockPosts.vals()) {
            alphaPosts.put(post.id, post);
        };
        
        // Set alpha of the day
        alphaOfTheDay := ?{
            title = "Base Protocol Launch";
            description = "Major protocol launching on Base with 10x potential. Sofia and Jacob both accumulating.";
            sentiment = #Bullish;
            confidence = 0.95;
            sources = [#Twitter, #Discord, #Telegram];
            whaleActivity = "High";
            timeWindow = "24h";
            timestamp = 1703123456789;
        };
    };
    
    // System functions
    system func preupgrade() {
        postEntries := Iter.toArray(alphaPosts.entries());
    };
    
    system func postupgrade() {
        alphaPosts := HashMap.fromIter<PostId, AlphaPost>(postEntries.vals(), postEntries.size(), Text.equal, Text.hash);
        postEntries := [];
        initializeMockData();
    };
    
    // Public API functions
    
    // Get all alpha posts
    public query func getAllPosts() : async [AlphaPost] {
        Iter.toArray(alphaPosts.vals())
    };
    
    // Get trending posts
    public query func getTrendingPosts() : async [AlphaPost] {
        let allPosts = Iter.toArray(alphaPosts.vals());
        Array.filter(allPosts, func (post: AlphaPost) : Bool { post.trending })
    };
    
    // Get posts by sentiment
    public query func getPostsBySentiment(sentiment: Sentiment) : async [AlphaPost] {
        let allPosts = Iter.toArray(alphaPosts.vals());
        Array.filter(allPosts, func (post: AlphaPost) : Bool { post.sentiment == sentiment })
    };
    
    // Get posts with whale correlation
    public query func getWhaleCorrelatedPosts() : async [AlphaPost] {
        let allPosts = Iter.toArray(alphaPosts.vals());
        Array.filter(allPosts, func (post: AlphaPost) : Bool { post.whaleCorrelation })
    };
    
    // Add new alpha post
    public shared({caller}) func addPost(post: AlphaPost) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add posts");
        };
        
        alphaPosts.put(post.id, post);
        #ok(())
    };
    
    // Update post engagement
    public shared({caller}) func updateEngagement(postId: PostId, engagement: Nat) : async Result.Result<(), Text> {
        switch (alphaPosts.get(postId)) {
            case null { #err("Post not found") };
            case (?post) {
                let updatedPost: AlphaPost = {
                    id = post.id;
                    source = post.source;
                    author = post.author;
                    content = post.content;
                    sentiment = post.sentiment;
                    engagement = engagement;
                    whaleCorrelation = post.whaleCorrelation;
                    timeAgo = post.timeAgo;
                    avatar = post.avatar;
                    trending = post.trending;
                    verified = post.verified;
                    timestamp = post.timestamp;
                    confidence = post.confidence;
                };
                alphaPosts.put(postId, updatedPost);
                #ok(())
            };
        }
    };
    
    // Get alpha of the day
    public query func getAlphaOfTheDay() : async ?AlphaOfTheDay {
        alphaOfTheDay
    };
    
    // Set alpha of the day
    public shared({caller}) func setAlphaOfTheDay(alpha: AlphaOfTheDay) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot set alpha of the day");
        };
        
        alphaOfTheDay := ?alpha;
        #ok(())
    };
    
    // Search posts by content
    public query func searchPosts(query: Text) : async [AlphaPost] {
        let allPosts = Iter.toArray(alphaPosts.vals());
        Array.filter(allPosts, func (post: AlphaPost) : Bool {
            Text.contains(post.content, #text query) or Text.contains(post.author, #text query)
        })
    };
    
    // Get posts by source
    public query func getPostsBySource(source: Source) : async [AlphaPost] {
        let allPosts = Iter.toArray(alphaPosts.vals());
        Array.filter(allPosts, func (post: AlphaPost) : Bool { post.source == source })
    };
    
    // Get alpha feed statistics
    public query func getAlphaFeedStats() : async {
        totalPosts: Nat;
        trendingPosts: Nat;
        whaleCorrelatedPosts: Nat;
        averageEngagement: Float;
        bullishPosts: Nat;
        bearishPosts: Nat;
        neutralPosts: Nat;
    } {
        let allPosts = Iter.toArray(alphaPosts.vals());
        let totalPosts = allPosts.size();
        let trendingPosts = Array.filter(allPosts, func (p: AlphaPost) : Bool { p.trending }).size();
        let whaleCorrelatedPosts = Array.filter(allPosts, func (p: AlphaPost) : Bool { p.whaleCorrelation }).size();
        let totalEngagement = Array.foldLeft<AlphaPost, Nat>(allPosts, 0, func (acc: Nat, p: AlphaPost) : Nat { acc + p.engagement });
        let averageEngagement = if (totalPosts > 0) { Float.fromInt(totalEngagement) / Float.fromInt(totalPosts) } else { 0.0 };
        let bullishPosts = Array.filter(allPosts, func (p: AlphaPost) : Bool { p.sentiment == #Bullish }).size();
        let bearishPosts = Array.filter(allPosts, func (p: AlphaPost) : Bool { p.sentiment == #Bearish }).size();
        let neutralPosts = Array.filter(allPosts, func (p: AlphaPost) : Bool { p.sentiment == #Neutral }).size();
        
        {
            totalPosts = totalPosts;
            trendingPosts = trendingPosts;
            whaleCorrelatedPosts = whaleCorrelatedPosts;
            averageEngagement = averageEngagement;
            bullishPosts = bullishPosts;
            bearishPosts = bearishPosts;
            neutralPosts = neutralPosts;
        }
    };
}; 