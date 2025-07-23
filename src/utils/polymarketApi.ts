
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

export const searchPolymarketMarkets = async (query: string): Promise<PolymarketMarket[]> => {
  try {
    console.log('Fetching from Polymarket API:', query);
    const response = await fetch(`https://gamma-api.polymarket.com/markets/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      throw new Error(`Failed to fetch markets: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Handle different possible response structures
    const markets = data.markets || data.data || data || [];
    
    // Transform API response to our interface
    const transformedMarkets = markets.map((market: any) => ({
      id: market.id || market.market_id || market.conditionId,
      title: market.title || market.question || market.description,
      outcomes: (market.outcomes || market.tokens || []).map((outcome: any) => ({
        id: outcome.id || outcome.token_id || outcome.outcome_id,
        title: outcome.title || outcome.outcome || outcome.name
      })),
      resolveTime: market.resolveTime || market.endTime || market.end_date_iso || new Date().toISOString()
    })).filter((market: PolymarketMarket) => market.title && market.outcomes.length > 0);

    console.log('Transformed markets:', transformedMarkets);
    return transformedMarkets;
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error);
    
    // Return mock data as fallback for demonstration
    const mockMarkets: PolymarketMarket[] = [
      {
        id: "demo-1",
        title: "2024 US Presidential Election Winner",
        outcomes: [
          { id: "1a", title: "Donald Trump" },
          { id: "1b", title: "Joe Biden" },
          { id: "1c", title: "Other" }
        ],
        resolveTime: "2024-11-06T00:00:00Z"
      },
      {
        id: "demo-2", 
        title: "Bitcoin Price Above $100K by End of 2024",
        outcomes: [
          { id: "2a", title: "Yes" },
          { id: "2b", title: "No" }
        ],
        resolveTime: "2024-12-31T23:59:59Z"
      }
    ];

    // Filter mock data based on query
    const filtered = mockMarkets.filter(market =>
      market.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
  }
};

export const getMarketResult = async (marketId: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://gamma-api.polymarket.com/markets/${marketId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch market result');
    }

    const data = await response.json();
    return data.winningOutcome || null;
  } catch (error) {
    console.error('Error fetching market result:', error);
    return null;
  }
};
