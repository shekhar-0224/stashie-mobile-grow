import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface InviteChipsProps {
  invitees: string[];
  onInviteesChange: (invitees: string[]) => void;
}

const InviteChips = ({ invitees, onInviteesChange }: InviteChipsProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock autocomplete data - in a real app, this would come from an API
  const pastInvites = [
    "john@email.com",
    "sarah.smith@gmail.com",
    "alex_crypto",
    "betting_pro",
    "mike.johnson@outlook.com"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);

    // Generate suggestions based on input
    if (value.length > 0) {
      const filtered = pastInvites.filter(invite => 
        invite.toLowerCase().includes(value.toLowerCase()) &&
        !invitees.includes(invite)
      );
      setSuggestions(filtered.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const addInvitee = (invitee: string) => {
    if (invitee.trim() && !invitees.includes(invitee.trim())) {
      onInviteesChange([...invitees, invitee.trim()]);
      setCurrentInput("");
      setSuggestions([]);
    }
  };

  const removeInvitee = (index: number) => {
    onInviteesChange(invitees.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      addInvitee(currentInput);
    } else if (e.key === ',' && currentInput.trim()) {
      e.preventDefault();
      addInvitee(currentInput);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUsername = (username: string) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="invitees" className="text-xs font-medium text-white">
        Invite people to join
      </Label>
      
      {/* Existing invitees */}
      {invitees.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {invitees.map((invitee, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-white/20 text-white text-xs flex items-center gap-1"
            >
              {invitee}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-300"
                onClick={() => removeInvitee(index)}
              />
            </Badge>
          ))}
        </div>
      )}

      <Input
        value={currentInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter email or username, press Enter or comma to add"
        className="rounded-stashbox border-gray-200 bg-white/90 text-gray-800 placeholder:text-gray-400 text-sm h-7"
      />
      
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white/10 rounded-stashbox p-1 space-y-1">
          <p className="text-xs text-white/60">Recent invites:</p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => addInvitee(suggestion)}
              className="text-xs text-white/80 hover:text-white cursor-pointer p-1 rounded hover:bg-white/10"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-white/60">
        Add multiple people by separating with commas
      </p>
    </div>
  );
};

export default InviteChips;
