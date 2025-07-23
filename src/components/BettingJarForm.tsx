
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink } from "lucide-react";
import BetAmountInput from "./BetAmountInput";
import InviteChips from "./InviteChips";
import MarketSelector from "./MarketSelector";

interface BettingJarFormProps {
  onSubmit: () => void;
}

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

const BettingJarForm = ({ onSubmit }: BettingJarFormProps) => {
  const [betQuery, setBetQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<PolymarketMarket | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<PolymarketOutcome | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [openChallenge, setOpenChallenge] = useState(false);

  const handleSubmit = () => {
    console.log("Creating betting jar with Polymarket integration:", {
      betQuery,
      selectedMarket,
      selectedOutcome,
      betAmount,
      invitees,
      openChallenge
    });
    
    // TODO: Lock funds and store market data
    onSubmit();
  };

  const isFormValid = betQuery.length > 0 && selectedMarket && selectedOutcome && betAmount.length > 0;

  return (
    <div className="space-y-4 py-2">
      {/* Step 1: Write Your Bet Condition */}
      <div className="space-y-2">
        <Label htmlFor="betQuery" className="text-sm font-medium text-white">
          What do you want to bet on?
        </Label>
        <Input
          value={betQuery}
          onChange={(e) => setBetQuery(e.target.value)}
          placeholder="e.g., India vs England winner"
          className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm"
        />
      </div>

      {/* Step 2: Market Selection with Auto-matching */}
      <MarketSelector
        query={betQuery}
        onMarketSelect={setSelectedMarket}
        onOutcomeSelect={setSelectedOutcome}
        selectedMarket={selectedMarket}
        selectedOutcome={selectedOutcome}
      />

      {/* Step 3: Set Bet Amount */}
      <BetAmountInput
        value={betAmount}
        onChange={setBetAmount}
      />

      {/* Step 4: Invite Friends */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-white">
          Invite a friend to bet against you
        </Label>
        <InviteChips
          invitees={invitees}
          onInviteesChange={setInvitees}
        />
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="openChallenge"
            checked={openChallenge}
            onChange={(e) => setOpenChallenge(e.target.checked)}
            className="w-4 h-4 text-stashbox-orange bg-white/20 border-white/30 rounded focus:ring-stashbox-orange"
          />
          <Label htmlFor="openChallenge" className="text-sm text-white/80">
            Open challenge (anyone can match it)
          </Label>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-3">
        <p className="text-sm text-white/80 leading-relaxed flex items-center gap-2">
          💡 <span className="font-medium">Using Polymarket markets.</span> Oracle-backed resolution.
          {selectedMarket && (
            <ExternalLink className="w-4 h-4 text-white/60" />
          )}
        </p>
      </div>
      
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full bg-stashbox-orange text-white hover:bg-stashbox-orange/90 font-medium py-2 rounded-stashbox transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Betting Jar
      </Button>
    </div>
  );
};

export default BettingJarForm;
