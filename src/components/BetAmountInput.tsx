
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface BetAmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

const BetAmountInput = ({ value, onChange }: BetAmountInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    
    // Allow only numbers and decimal point
    if (inputVal === '' || /^\d*\.?\d*$/.test(inputVal)) {
      const numValue = parseFloat(inputVal);
      
      // Check if value is within reasonable limits for betting
      if (inputVal === '' || (numValue >= 0 && numValue <= 10000)) {
        setInputValue(inputVal);
        onChange(inputVal);
      }
    }
  };

  const handleQuickAmount = (amount: string) => {
    setInputValue(amount);
    onChange(amount);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="betAmount" className="text-xs font-medium text-white">
        Amount to bet (USDC)
      </Label>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter amount"
          className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-7 pr-16"
          type="text"
          inputMode="decimal"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
          USDC
        </span>
      </div>
      <div className="flex gap-1">
        {['10', '25', '50', '100'].map((amount) => (
          <Button
            key={amount}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickAmount(amount)}
            className="flex-1 h-6 text-xs bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            ${amount}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BetAmountInput;
