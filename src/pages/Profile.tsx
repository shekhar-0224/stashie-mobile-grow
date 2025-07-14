import { useState } from "react";
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Share, ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user, logout } = usePrivy();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [genie, setGenie] = useState(true);

  // Mock user data - in real app this would come from your backend
  const mockUserData = {
    name: user?.email?.address?.split('@')[0] || "User",
    avatar: "",
    wallet: {
      balanceLocal: "$2,847.50",
      addressShort: "0x4F2...8A3C",
      tokens: {
        USDC: "1,250.00",
        ETH: "0.85"
      }
    },
    badges: [
      { label: "First Step", icon: "👟", description: "First deposit made" },
      { label: "Max Savings", icon: "🎒", description: "Saved $100+ this month" },
      { label: "Streak Champ", icon: "🔥", description: "7-day streak" }
    ],
    transactions: [
      { title: "Deposit to GrowFund", subtitle: "Mar 21 · $100", icon: "💸" },
      { title: "Withdraw from QuickSave", subtitle: "Mar 15 · $35", icon: "📤" }
    ]
  };

  const shareWalletCard = async () => {
    const text = "📈 I'm growing my savings on Stashbox! Check out my journey → stashbox.xyz #save2earn #crypto";
    try {
      if (navigator.share && navigator.canShare && navigator.canShare({ text })) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        // Could add a toast notification here
      }
    } catch (error) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(text);
      } catch (clipboardError) {
        console.log('Share failed, text copied to clipboard');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-stashbox-cream pb-16">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 pt-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/home")}
            className="text-stashbox-text hover:bg-stashbox-text/10 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-stashbox-text">Profile</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-stashbox-text hover:bg-stashbox-text/10 text-xs p-2"
          >
            Logout
          </Button>
        </div>

        <div className="px-3 space-y-4">
          {/* User greeting */}
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={mockUserData.avatar} />
              <AvatarFallback className="bg-stashbox-mint text-stashbox-text font-bold text-sm">
                {mockUserData.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-base font-semibold text-stashbox-text">
              Hi, {mockUserData.name} 👋
            </h2>
          </div>

          {/* Wallet Summary Card */}
          <Card className="bg-stashbox-mint border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <p className="text-stashbox-text/70 text-xs font-medium mb-1">Your Wallet Summary</p>
              <h3 className="text-2xl font-bold text-stashbox-text mb-1">{mockUserData.wallet.balanceLocal}</h3>
              <p className="text-stashbox-text/60 text-xs mb-3">{mockUserData.wallet.addressShort}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={shareWalletCard}
                className="text-stashbox-text hover:bg-white/20 font-medium text-xs p-2 h-8"
              >
                <Share className="w-3 h-3 mr-1" />
                📤 Share on X
              </Button>
            </CardContent>
          </Card>

          {/* Token Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gray-50 border-0 rounded-xl">
              <CardContent className="p-3 text-center">
                <p className="text-stashbox-text/60 text-xs font-medium mb-1">USDC</p>
                <p className="text-stashbox-text font-bold text-base">${mockUserData.wallet.tokens.USDC}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 border-0 rounded-xl">
              <CardContent className="p-3 text-center">
                <p className="text-stashbox-text/60 text-xs font-medium mb-1">ETH</p>
                <p className="text-stashbox-text font-bold text-base">{mockUserData.wallet.tokens.ETH} ETH</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="badges" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 rounded-xl p-1 h-9">
              <TabsTrigger value="badges" className="rounded-lg text-xs">Badges</TabsTrigger>
              <TabsTrigger value="txns" className="rounded-lg text-xs">Txns</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-lg text-xs">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-3">
                {mockUserData.badges.map((badge, index) => (
                  <Card key={index} className="bg-white/80 border-0 rounded-xl">
                    <CardContent className="p-3 text-center">
                      <div className="text-xl mb-1">{badge.icon}</div>
                      <p className="text-stashbox-text font-semibold text-xs mb-1">{badge.label}</p>
                      <p className="text-stashbox-text/60 text-xs leading-tight">{badge.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="txns" className="space-y-2 mt-4">
              {mockUserData.transactions.map((txn, index) => (
                <Card key={index} className="bg-white/80 border-0 rounded-xl">
                  <CardContent className="p-3 flex items-center space-x-3">
                    <div className="text-lg">{txn.icon}</div>
                    <div className="flex-1">
                      <p className="text-stashbox-text font-semibold text-xs">{txn.title}</p>
                      <p className="text-stashbox-text/60 text-xs">{txn.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-3 mt-4">
              <Card className="bg-white/80 border-0 rounded-xl">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-stashbox-text font-semibold text-xs">Notifications</p>
                      <p className="text-stashbox-text/60 text-xs">Get notified about savings</p>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="h-px bg-stashbox-text/10"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-stashbox-text font-semibold text-xs">Genie Suggestions</p>
                      <p className="text-stashbox-text/60 text-xs">AI-powered savings tips</p>
                    </div>
                    <Switch 
                      checked={genie} 
                      onCheckedChange={setGenie}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;