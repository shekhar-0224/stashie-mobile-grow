
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from "lucide-react";
import { searchPolymarketMarkets } from "@/utils/polymarketApi";

interface PolymarketOutcome {
  id: string;
  title: string;
}

interface PolymarketMarket {
  id: string;
  title: string;
  outcomes: PolymarketOutcome[];
  resolveTime: string;
  slug?: string;
  active?: boolean;
  closed?: boolean;
  isResolved?: boolean;
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
        console.log('Searching Polymarket for:', query);
        const fetchedMarkets = await searchPolymarketMarkets(query);
        console.log('Fetched markets:', fetchedMarkets);
        
        setMarkets(fetchedMarkets);
        setShowDropdown(fetchedMarkets.length > 0);
      } catch (error) {
        console.error('Error fetching markets:', error);
        setMarkets([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMarkets, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleMarketSelect = (market: PolymarketMarket) => {
    console.log('Market selected:', market);
    onMarketSelect(market);
    onOutcomeSelect(null);
    setShowDropdown(false);
  };

  const formatResolveTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getOutcomePreview = (outcomes: PolymarketOutcome[]) => {
    if (outcomes.length <= 3) {
      return outcomes.map(o => o.title).join(', ');
    }
    return `${outcomes.slice(0, 2).map(o => o.title).join(', ')} +${outcomes.length - 2} more`;
  };

  return (
    <div className="space-y-3">
      {/* Market Search Results */}
      {showDropdown && (
        <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-3 space-y-2">
          <p className="text-xs text-white/60 font-medium">Live markets found:</p>
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
              <p className="text-sm text-white/60">Searching markets...</p>
            </div>
          ) : markets.length === 0 ? (
            <p className="text-sm text-white/60">No active markets found</p>
          ) : (
            markets.map((market) => (
              <div
                key={market.id}
                onClick={() => handleMarketSelect(market)}
                className="cursor-pointer p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-white font-medium leading-tight">{market.title}</p>
                  <Badge variant="secondary" className="bg-stashbox-orange/20 text-stashbox-orange text-xs ml-2">
                    Live
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>Options: {getOutcomePreview(market.outcomes)}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-white/60" />
                  <span className="text-xs text-white/60">
                    Resolves {formatResolveTime(market.resolveTime)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Selected Market & Outcome Selection */}
      {selectedMarket && (
        <div className="space-y-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white font-medium">{selectedMarket.title}</p>
              <Badge variant="secondary" className="bg-stashbox-orange/20 text-stashbox-orange text-xs flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Polymarket
              </Badge>
            </div>
            <p className="text-xs text-white/60">Choose your bet outcome:</p>
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
