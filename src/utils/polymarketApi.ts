
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

export const searchPolymarketMarkets = async (query: string): Promise<PolymarketMarket[]> => {
  try {
    console.log('Searching Polymarket for:', query);
    
    // Due to CORS issues with direct API calls, we'll use mock data that represents real Polymarket markets
    // In production, this would be handled by a backend proxy
    const mockMarkets: PolymarketMarket[] = [
      {
        id: "0x123",
        title: "India vs England 4th Test Match Winner",
        slug: "india-vs-england-4th-test-match-winner",
        outcomes: [
          { id: "india", title: "India" },
          { id: "england", title: "England" },
          { id: "draw", title: "Draw" }
        ],
        resolveTime: "2024-12-31T23:59:59Z",
        active: true,
        closed: false,
        isResolved: false
      },
      {
        id: "0x456",
        title: "2024 US Presidential Election Winner",
        slug: "2024-us-presidential-election-winner",
        outcomes: [
          { id: "trump", title: "Donald Trump" },
          { id: "biden", title: "Joe Biden" },
          { id: "other", title: "Other" }
        ],
        resolveTime: "2024-11-06T00:00:00Z",
        active: true,
        closed: false,
        isResolved: false
      },
      {
        id: "0x789",
        title: "Bitcoin Price Above $100K by End of 2024",
        slug: "bitcoin-price-above-100k-by-end-of-2024",
        outcomes: [
          { id: "yes", title: "Yes" },
          { id: "no", title: "No" }
        ],
        resolveTime: "2024-12-31T23:59:59Z",
        active: true,
        closed: false,
        isResolved: false
      },
      {
        id: "0x101",
        title: "Premier League Winner 2024-25 Season",
        slug: "premier-league-winner-2024-25-season",
        outcomes: [
          { id: "city", title: "Manchester City" },
          { id: "arsenal", title: "Arsenal" },
          { id: "liverpool", title: "Liverpool" },
          { id: "other", title: "Other" }
        ],
        resolveTime: "2025-05-31T23:59:59Z",
        active: true,
        closed: false,
        isResolved: false
      }
    ];

    // Filter based on query and only return active, non-closed, non-resolved markets
    const filtered = mockMarkets.filter(market =>
      market.title.toLowerCase().includes(query.toLowerCase()) &&
      market.active && 
      !market.closed && 
      !market.isResolved
    );

    // Return only top 2 results as specified
    return filtered.slice(0, 2);
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error);
    return [];
  }
};

export const getMarketResult = async (marketId: string): Promise<{ isResolved: boolean; resolvedOutcome?: string }> => {
  try {
    // In production, this would make an actual API call
    // For now, return mock resolution data
    return {
      isResolved: false,
      resolvedOutcome: undefined
    };
  } catch (error) {
    console.error('Error fetching market result:', error);
    return { isResolved: false };
  }
};

export const getPolymarketUrl = (slug: string): string => {
  return `https://polymarket.com/event/${slug}`;
};
