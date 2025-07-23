import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface WinConditionInputProps {
  betDescription: string;
  winConditions: string[];
  onWinConditionsChange: (conditions: string[]) => void;
}

const WinConditionInput = ({ betDescription, winConditions, onWinConditionsChange }: WinConditionInputProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate suggestions based on bet description
  useEffect(() => {
    if (betDescription.length > 0) {
      const suggestions = generateSuggestions(betDescription, winConditions);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  }, [betDescription, winConditions]);

  const generateSuggestions = (description: string, existingConditions: string[]): string[] => {
    const lowerDesc = description.toLowerCase();
    const baseSuggestions: string[] = [];

    // Sports match suggestions
    if (lowerDesc.includes('vs') || lowerDesc.includes('match') || lowerDesc.includes('game')) {
      const teams = extractTeams(description);
      if (teams.length >= 2) {
        baseSuggestions.push(`${teams[0]} wins`);
        baseSuggestions.push(`${teams[1]} wins`);
        baseSuggestions.push("Match ends in draw");
      }
    }

    // Election suggestions
    if (lowerDesc.includes('election') || lowerDesc.includes('president') || lowerDesc.includes('vote')) {
      baseSuggestions.push("Candidate A wins");
      baseSuggestions.push("Candidate B wins");
    }

    // Weather suggestions
    if (lowerDesc.includes('weather') || lowerDesc.includes('rain') || lowerDesc.includes('temperature')) {
      baseSuggestions.push("It will rain");
      baseSuggestions.push("It will be sunny");
      baseSuggestions.push("Temperature above 70°F");
    }

    // Market suggestions
    if (lowerDesc.includes('price') || lowerDesc.includes('stock') || lowerDesc.includes('crypto')) {
      baseSuggestions.push("Price goes up");
      baseSuggestions.push("Price goes down");
      baseSuggestions.push("Price stays same");
    }

    // Generic binary suggestions
    if (baseSuggestions.length === 0) {
      baseSuggestions.push("Yes");
      baseSuggestions.push("No");
    }

    // Filter out existing conditions
    return baseSuggestions.filter(suggestion => 
      !existingConditions.some(condition => 
        condition.toLowerCase() === suggestion.toLowerCase()
      )
    );
  };

  const extractTeams = (description: string): string[] => {
    const vsMatch = description.match(/(\w+)\s+vs\s+(\w+)/i);
    if (vsMatch) {
      return [vsMatch[1], vsMatch[2]];
    }
    return [];
  };

  const addCondition = (condition: string) => {
    if (condition.trim() && !winConditions.includes(condition.trim())) {
      onWinConditionsChange([...winConditions, condition.trim()]);
      setCurrentInput("");
    }
  };

  const removeCondition = (index: number) => {
    onWinConditionsChange(winConditions.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      addCondition(currentInput);
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="winConditions" className="text-xs font-medium text-white">
        Set win condition(s)
      </Label>
      
      {/* Existing conditions */}
      {winConditions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {winConditions.map((condition, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-white/20 text-white text-xs flex items-center gap-1"
            >
              {condition}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-300"
                onClick={() => removeCondition(index)}
              />
            </Badge>
          ))}
        </div>
      )}

      <Input
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., Team A wins or match ends in draw"
        className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-7"
      />
      
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-white/60">Quick suggestions:</p>
          <div className="flex flex-wrap gap-1">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addCondition(suggestion)}
                className="h-6 text-xs bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Plus className="w-3 h-3 mr-1" />
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-white/60">
        Add multiple conditions for complex bets
      </p>
    </div>
  );
};

export default WinConditionInput;
