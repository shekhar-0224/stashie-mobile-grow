
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";

interface PolymarketOutcome {
  id: string;
  title: string;
}

interface PolymarketMarket {
  id: string;
  title: string;
  outcomes: PolymarketOutcome[];
  resolveTime: string;
}

interface MarketSelectorProps {
  query: string;
  onMarketSelect: (market: PolymarketMarket | null) => void;
  onOutcomeSelect: (outcome: PolymarketOutcome | null) => void;
  selectedMarket: PolymarketMarket | null;
  selectedOutcome: PolymarketOutcome | null;
}

const MarketSelector = ({
  query,
  onMarketSelect,
  onOutcomeSelect,
  selectedMarket,
  selectedOutcome
}: MarketSelectorProps) => {
  const [markets, setMarkets] = useState<PolymarketMarket[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const searchMarkets = async () => {
      if (query.length < 3) {
        setMarkets([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        // Mock API call - replace with actual Polymarket API
        const mockMarkets: PolymarketMarket[] = [
          {
            id: "1",
            title: "India vs England Cricket Match Winner",
            outcomes: [
              { id: "1a", title: "India" },
              { id: "1b", title: "England" },
              { id: "1c", title: "Draw" }
            ],
            resolveTime: "2024-01-20T15:00:00Z"
          },
          {
            id: "2",
            title: "Premier League: Manchester City vs Arsenal",
            outcomes: [
              { id: "2a", title: "Manchester City" },
              { id: "2b", title: "Arsenal" },
              { id: "2c", title: "Draw" }
            ],
            resolveTime: "2024-01-18T17:30:00Z"
          }
        ];

        // Filter based on query
        const filtered = mockMarkets.filter(market =>
          market.title.toLowerCase().includes(query.toLowerCase())
        );

        setMarkets(filtered.slice(0, 5));
        setShowDropdown(filtered.length > 0);
      } catch (error) {
        console.error('Error fetching markets:', error);
        setMarkets([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMarkets, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleMarketSelect = (market: PolymarketMarket) => {
    onMarketSelect(market);
    onOutcomeSelect(null);
    setShowDropdown(false);
  };

  const formatResolveTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3">
      {/* Market Search Results */}
      {showDropdown && (
        <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-2 space-y-2">
          <p className="text-xs text-white/60 font-medium">Matching markets:</p>
          {loading ? (
            <p className="text-sm text-white/60">Searching...</p>
          ) : (
            markets.map((market) => (
              <div
                key={market.id}
                onClick={() => handleMarketSelect(market)}
                className="cursor-pointer p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{market.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-white/60" />
                      <span className="text-xs text-white/60">
                        Resolves {formatResolveTime(market.resolveTime)}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    Polymarket
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Selected Market & Outcome Selection */}
      {selectedMarket && (
        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white font-medium">{selectedMarket.title}</p>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Polymarket
              </Badge>
            </div>
            <p className="text-xs text-white/60">Choose your outcome:</p>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {selectedMarket.outcomes.map((outcome) => (
              <Button
                key={outcome.id}
                onClick={() => onOutcomeSelect(outcome)}
                variant={selectedOutcome?.id === outcome.id ? "default" : "outline"}
                className={`w-full justify-start text-left ${
                  selectedOutcome?.id === outcome.id
                    ? "bg-stashbox-orange text-white hover:bg-stashbox-orange/90"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                I bet on {outcome.title}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketSelector;
