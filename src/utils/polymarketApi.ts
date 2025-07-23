
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
    const response = await fetch(`https://gamma-api.polymarket.com/markets/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch markets');
    }

    const data = await response.json();
    
    // Transform API response to our interface
    return data.markets?.map((market: any) => ({
      id: market.id,
      title: market.title,
      outcomes: market.outcomes?.map((outcome: any) => ({
        id: outcome.id,
        title: outcome.title
      })) || [],
      resolveTime: market.resolveTime || market.endTime
    })) || [];
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error);
    return [];
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
