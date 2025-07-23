
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import BetAmountInput from "./BetAmountInput";
import WinConditionInput from "./WinConditionInput";
import InviteChips from "./InviteChips";

interface BettingJarFormProps {
  onSubmit: () => void;
}

const BettingJarForm = ({ onSubmit }: BettingJarFormProps) => {
  const [betDescription, setBetDescription] = useState("");
  const [winConditions, setWinConditions] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState("");
  const [invitees, setInvitees] = useState<string[]>([]);

  const handleSubmit = () => {
    // TODO: Integrate with UMA Optimistic Oracle
    // 1. Create ancillary data from betDescription + winConditions
    // 2. Call UMA requestPrice() with YES_OR_NO_QUERY identifier
    // 3. Set up polling for resolution
    console.log("Creating betting jar with UMA integration:", {
      betDescription,
      winConditions,
      betAmount,
      invitees
    });
    
    onSubmit();
  };

  const isFormValid = betDescription.length > 0 && winConditions.length > 0 && betAmount.length > 0;

  return (
    <div className="space-y-2 py-1">
      <div className="space-y-1">
        <Label htmlFor="betDescription" className="text-xs font-medium text-white">
          Define the bet
        </Label>
        <Input
          value={betDescription}
          onChange={(e) => setBetDescription(e.target.value.slice(0, 50))}
          placeholder="e.g., Who will win the Lakers vs Warriors match?"
          className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-7"
        />
        <p className="text-xs text-white/60">({betDescription.length}/50)</p>
      </div>

      <WinConditionInput
        betDescription={betDescription}
        winConditions={winConditions}
        onWinConditionsChange={setWinConditions}
      />

      <BetAmountInput
        value={betAmount}
        onChange={setBetAmount}
      />

      <InviteChips
        invitees={invitees}
        onInviteesChange={setInvitees}
      />

      <div className="bg-white/10 backdrop-blur-sm rounded-stashbox p-2">
        <p className="text-xs text-white/80 leading-relaxed">
          💡 <span className="font-medium">How it works:</span> Funds are pooled. UMA resolves the outcome post-match. Winner takes the pot.
        </p>
      </div>
      
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full bg-stashbox-orange text-white hover:bg-stashbox-orange/90 font-medium py-2 rounded-stashbox transition-all duration-200 text-sm h-7 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Betting Jar
      </Button>
    </div>
  );
};

export default BettingJarForm;
