
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const AmountInput = ({ value, onChange, placeholder, className }: AmountInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    
    // Allow only numbers and decimal point
    if (inputVal === '' || /^\d*\.?\d*$/.test(inputVal)) {
      const numValue = parseFloat(inputVal);
      
      // Check if value is within limit (max $100)
      if (inputVal === '' || (numValue >= 0 && numValue <= 100)) {
        setInputValue(inputVal);
        onChange(inputVal);
      }
    }
  };

  const handleMaxClick = () => {
    setInputValue('100');
    onChange('100');
  };

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`pr-12 ${className}`}
        type="text"
        inputMode="decimal"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleMaxClick}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
      >
        Max
      </Button>
    </div>
  );
};

export default AmountInput;
