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

// Types for mind map visualization
type NodeId = Text;
type NodeType = {
    #Whale;
    #Protocol;
    #CEX;
    #DEX;
    #Wallet;
};

type Node = {
    id: NodeId;
    name: Text;
    type: NodeType;
    balance: ?Float;
    value: ?Float;
    relationship: ?Text;
    avatar: Text;
    x: Float;
    y: Float;
    connections: [NodeId];
    activity: Text;
    lastTx: Text;
    protocol: ?Text;
    volume: ?Float;
    exchange: ?Text;
    status: ?Text;
};

type Connection = {
    from: NodeId;
    to: NodeId;
    amount: Float;
    type: Text;
    strength: Float;
};

type MindMapData = {
    nodes: [Node];
    connections: [Connection];
    timestamp: Int64;
};

// Actor class for Mind Map Canister
actor class MindMap() = {
    
    // Storage for mind map data
    private stable var mindMapData: ?MindMapData = null;
    
    // Storage for user mind maps
    private stable var userMindMapEntries: [(Principal, MindMapData)] = [];
    private var userMindMaps = HashMap.HashMap<Principal, MindMapData>(0, Principal.equal, Principal.hash);
    
    // Initialize with mock data
    private func initializeMockData() {
        let mockNodes: [Node] = [
            {
                id = "sofia-primary";
                name = "Sofia (Primary)";
                type = #Whale;
                balance = ?1200.0;
                value = ?4200000.0;
                relationship = ?"Primary";
                avatar = "S";
                x = 400.0;
                y = 200.0;
                connections = ["sofia-secondary", "base-dex", "cex-endpoint", "eth-dex"];
                activity = "High";
                lastTx = "2h ago";
                protocol = null;
                volume = null;
                exchange = null;
                status = null;
            },
            {
                id = "sofia-secondary";
                name = "Sofia (Secondary)";
                type = #Whale;
                balance = ?300.0;
                value = ?1050000.0;
                relationship = ?"Secondary";
                avatar = "S";
                x = 600.0;
                y = 300.0;
                connections = ["base-dex", "sofia-primary"];
                activity = "Medium";
                lastTx = "5h ago";
                protocol = null;
                volume = null;
                exchange = null;
                status = null;
            },
            {
                id = "jacob-unknown";
                name = "Jacob (Unknown)";
                type = #Whale;
                balance = ?50.0;
                value = ?175000.0;
                relationship = ?"Unknown";
                avatar = "J";
                x = 200.0;
                y = 400.0;
                connections = ["eth-dex", "base-dex"];
                activity = "Low";
                lastTx = "1d ago";
                protocol = null;
                volume = null;
                exchange = null;
                status = null;
            },
            {
                id = "base-dex";
                name = "Base DEX";
                type = #Protocol;
                balance = null;
                value = null;
                relationship = null;
                avatar = "🔄";
                x = 500.0;
                y = 150.0;
                connections = ["sofia-primary", "sofia-secondary", "jacob-unknown"];
                activity = "Very High";
                lastTx = "30m ago";
                protocol = ?"Uniswap V3";
                volume = ?2100000.0;
                exchange = null;
                status = null;
            },
            {
                id = "eth-dex";
                name = "Ethereum DEX";
                type = #Protocol;
                balance = null;
                value = null;
                relationship = null;
                avatar = "🔄";
                x = 100.0;
                y = 350.0;
                connections = ["jacob-unknown", "sofia-primary"];
                activity = "High";
                lastTx = "1h ago";
                protocol = ?"SushiSwap";
                volume = ?850000.0;
                exchange = null;
                status = null;
            },
            {
                id = "cex-endpoint";
                name = "CEX Endpoint";
                type = #CEX;
                balance = null;
                value = null;
                relationship = null;
                avatar = "⚠️";
                x = 700.0;
                y = 100.0;
                connections = ["sofia-primary"];
                activity = "Unknown";
                lastTx = "N/A";
                protocol = null;
                volume = null;
                exchange = ?"Binance";
                status = ?"Untrackable";
            }
        ];
        
        let mockConnections: [Connection] = [
            {
                from = "sofia-primary";
                to = "sofia-secondary";
                amount = 50.0;
                type = "transfer";
                strength = 0.8;
            },
            {
                from = "sofia-primary";
                to = "base-dex";
                amount = 100.0;
                type = "swap";
                strength = 0.9;
            },
            {
                from = "sofia-secondary";
                to = "base-dex";
                amount = 25.0;
                type = "swap";
                strength = 0.6;
            },
            {
                from = "jacob-unknown";
                to = "eth-dex";
                amount = 10.0;
                type = "swap";
                strength = 0.4;
            },
            {
                from = "sofia-primary";
                to = "cex-endpoint";
                amount = 200.0;
                type = "withdrawal";
                strength = 0.7;
            }
        ];
        
        mindMapData := ?{
            nodes = mockNodes;
            connections = mockConnections;
            timestamp = Time.now();
        };
    };
    
    // System functions
    system func preupgrade() {
        userMindMapEntries := Iter.toArray(userMindMaps.entries());
    };
    
    system func postupgrade() {
        userMindMaps := HashMap.fromIter<Principal, MindMapData>(userMindMapEntries.vals(), userMindMapEntries.size(), Principal.equal, Principal.hash);
        userMindMapEntries := [];
        initializeMockData();
    };
    
    // Public API functions
    
    // Get global mind map data
    public query func getMindMapData() : async ?MindMapData {
        mindMapData
    };
    
    // Get user's mind map
    public shared({caller}) func getUserMindMap() : async ?MindMapData {
        userMindMaps.get(caller)
    };
    
    // Create user mind map
    public shared({caller}) func createUserMindMap(data: MindMapData) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot create mind maps");
        };
        
        userMindMaps.put(caller, data);
        #ok(())
    };
    
    // Update user mind map
    public shared({caller}) func updateUserMindMap(data: MindMapData) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot update mind maps");
        };
        
        userMindMaps.put(caller, data);
        #ok(())
    };
    
    // Add node to mind map
    public shared({caller}) func addNode(node: Node) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add nodes");
        };
        
        switch (userMindMaps.get(caller)) {
            case null { #err("User mind map not found") };
            case (?mindMap) {
                let updatedNodes = Array.append(mindMap.nodes, [node]);
                let updatedMindMap: MindMapData = {
                    nodes = updatedNodes;
                    connections = mindMap.connections;
                    timestamp = Time.now();
                };
                userMindMaps.put(caller, updatedMindMap);
                #ok(())
            };
        }
    };
    
    // Add connection to mind map
    public shared({caller}) func addConnection(connection: Connection) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add connections");
        };
        
        switch (userMindMaps.get(caller)) {
            case null { #err("User mind map not found") };
            case (?mindMap) {
                let updatedConnections = Array.append(mindMap.connections, [connection]);
                let updatedMindMap: MindMapData = {
                    nodes = mindMap.nodes;
                    connections = updatedConnections;
                    timestamp = Time.now();
                };
                userMindMaps.put(caller, updatedMindMap);
                #ok(())
            };
        }
    };
    
    // Get node by ID
    public query func getNode(nodeId: NodeId) : async ?Node {
        switch (mindMapData) {
            case null { null };
            case (?data) {
                Array.find(data.nodes, func (node: Node) : Bool { node.id == nodeId })
            };
        }
    };
    
    // Get connections for a node
    public query func getNodeConnections(nodeId: NodeId) : async [Connection] {
        switch (mindMapData) {
            case null { [] };
            case (?data) {
                Array.filter(data.connections, func (conn: Connection) : Bool { 
                    conn.from == nodeId or conn.to == nodeId 
                })
            };
        }
    };
    
    // Get mind map statistics
    public query func getMindMapStats() : async {
        totalNodes: Nat;
        totalConnections: Nat;
        whaleNodes: Nat;
        protocolNodes: Nat;
        cexNodes: Nat;
        averageConnections: Float;
    } {
        switch (mindMapData) {
            case null {
                {
                    totalNodes = 0;
                    totalConnections = 0;
                    whaleNodes = 0;
                    protocolNodes = 0;
                    cexNodes = 0;
                    averageConnections = 0.0;
                }
            };
            case (?data) {
                let totalNodes = data.nodes.size();
                let totalConnections = data.connections.size();
                let whaleNodes = Array.filter(data.nodes, func (n: Node) : Bool { n.type == #Whale }).size();
                let protocolNodes = Array.filter(data.nodes, func (n: Node) : Bool { n.type == #Protocol }).size();
                let cexNodes = Array.filter(data.nodes, func (n: Node) : Bool { n.type == #CEX }).size();
                let averageConnections = if (totalNodes > 0) { Float.fromInt(totalConnections) / Float.fromInt(totalNodes) } else { 0.0 };
                
                {
                    totalNodes = totalNodes;
                    totalConnections = totalConnections;
                    whaleNodes = whaleNodes;
                    protocolNodes = protocolNodes;
                    cexNodes = cexNodes;
                    averageConnections = averageConnections;
                }
            };
        }
    };
}; 