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

// Types for whale tracking
type WhaleId = Text;
type WalletAddress = Text;
type Chain = {
    #Ethereum;
    #Bitcoin;
    #Solana;
    #Base;
    #ICP;
};

type WhaleData = {
    id: WhaleId;
    name: Text;
    address: WalletAddress;
    balance: Float;
    value: Float;
    change24h: Float;
    change7d: Float;
    activity: Text;
    lastTx: Int64;
    chains: [Chain];
    risk: Text;
    relationship: Text;
    status: Text;
};

type WhaleMovement = {
    id: WhaleId;
    action: Text;
    amount: Float;
    token: Text;
    destination: Text;
    timestamp: Int64;
    value: Float;
    type: Text;
};

// Actor class for Whale Tracking Canister
actor class WhaleTracking() = {
    
    // Storage for whale data
    private stable var whaleDataEntries: [(WhaleId, WhaleData)] = [];
    private var whaleData = HashMap.HashMap<WhaleId, WhaleData>(0, Text.equal, Text.hash);
    
    // Storage for whale movements
    private stable var movementEntries: [(WhaleId, [WhaleMovement])] = [];
    private var whaleMovements = HashMap.HashMap<WhaleId, [WhaleMovement]>(0, Text.equal, Text.hash);
    
    // Initialize with some mock data
    private func initializeMockData() {
        let mockWhales: [WhaleData] = [
            {
                id = "whale_1";
                name = "Sofia (Primary)";
                address = "0x1234...abcd";
                balance = 1200.0;
                value = 4200000.0;
                change24h = 12.4;
                change7d = 8.7;
                activity = "Very High";
                lastTx = 1703123456789;
                chains = [#Ethereum, #Base];
                risk = "Low";
                relationship = "Primary";
                status = "active";
            },
            {
                id = "whale_2";
                name = "Jacob (Unknown)";
                address = "0xabcd...5678";
                balance = 850.0;
                value = 2980000.0;
                change24h = -5.2;
                change7d = 15.3;
                activity = "High";
                lastTx = 1703123456789;
                chains = [#Ethereum, #Solana];
                risk = "Medium";
                relationship = "Unknown";
                status = "active";
            }
        ];
        
        for (whale in mockWhales.vals()) {
            whaleData.put(whale.id, whale);
        };
    };
    
    // System functions
    system func preupgrade() {
        whaleDataEntries := Iter.toArray(whaleData.entries());
        movementEntries := Iter.toArray(whaleMovements.entries());
    };
    
    system func postupgrade() {
        whaleData := HashMap.fromIter<WhaleId, WhaleData>(whaleDataEntries.vals(), whaleDataEntries.size(), Text.equal, Text.hash);
        whaleMovements := HashMap.fromIter<WhaleId, [WhaleMovement]>(movementEntries.vals(), movementEntries.size(), Text.equal, Text.hash);
        whaleDataEntries := [];
        movementEntries := [];
        initializeMockData();
    };
    
    // Public API functions
    
    // Get all whales
    public query func getAllWhales() : async [WhaleData] {
        Iter.toArray(whaleData.vals())
    };
    
    // Get whale by ID
    public query func getWhale(id: WhaleId) : async ?WhaleData {
        whaleData.get(id)
    };
    
    // Add new whale
    public shared({caller}) func addWhale(whale: WhaleData) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add whales");
        };
        
        whaleData.put(whale.id, whale);
        #ok(())
    };
    
    // Update whale data
    public shared({caller}) func updateWhale(id: WhaleId, whale: WhaleData) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot update whales");
        };
        
        switch (whaleData.get(id)) {
            case null { #err("Whale not found") };
            case (?_) {
                whaleData.put(id, whale);
                #ok(())
            };
        };
    };
    
    // Get whale movements
    public query func getWhaleMovements(id: WhaleId) : async [WhaleMovement] {
        switch (whaleMovements.get(id)) {
            case null { [] };
            case (?movements) { movements };
        }
    };
    
    // Add whale movement
    public shared({caller}) func addMovement(id: WhaleId, movement: WhaleMovement) : async Result.Result<(), Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot add movements");
        };
        
        let currentMovements = switch (whaleMovements.get(id)) {
            case null { [] };
            case (?movements) { movements };
        };
        
        let updatedMovements = Array.append(currentMovements, [movement]);
        whaleMovements.put(id, updatedMovements);
        #ok(())
    };
    
    // Get whale statistics
    public query func getWhaleStats() : async {
        totalWhales: Nat;
        activeWhales: Nat;
        totalValue: Float;
        highActivityWhales: Nat;
    } {
        let whales = Iter.toArray(whaleData.vals());
        let totalWhales = whales.size();
        let activeWhales = Array.filter(whales, func (w: WhaleData) : Bool { w.status == "active" }).size();
        let totalValue = Array.foldLeft<WhaleData, Float>(whales, 0.0, func (acc: Float, whale: WhaleData) : Float { acc + whale.value });
        let highActivityWhales = Array.filter(whales, func (w: WhaleData) : Bool { w.activity == "Very High" }).size();
        
        {
            totalWhales = totalWhales;
            activeWhales = activeWhales;
            totalValue = totalValue;
            highActivityWhales = highActivityWhales;
        }
    };
    
    // Search whales by name or address
    public query func searchWhales(query: Text) : async [WhaleData] {
        let whales = Iter.toArray(whaleData.vals());
        Array.filter(whales, func (whale: WhaleData) : Bool {
            Text.contains(whale.name, #text query) or Text.contains(whale.address, #text query)
        })
    };
}; 