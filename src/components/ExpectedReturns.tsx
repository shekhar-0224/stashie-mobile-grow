
interface ExpectedReturnsProps {
  amount: string;
  duration: number;
  apy: number;
  showPercentage?: boolean;
}

const ExpectedReturns = ({ amount, duration, apy, showPercentage = false }: ExpectedReturnsProps) => {
  const calculateReturn = () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || inputAmount <= 0) return { total: 0, profit: 0, percentage: 0 };
    
    const principal = inputAmount;
    const rate = apy || 0;
    const time = duration / 365;
    
    const estimatedReturn = principal * (1 + (rate / 100) * time);
    const profit = estimatedReturn - principal;
    const percentage = principal > 0 ? (profit / principal) * 100 : 0;
    
    return { total: estimatedReturn, profit, percentage };
  };

  const returns = calculateReturn();

  if (!amount || parseFloat(amount) <= 0) return null;

  return (
    <div className="bg-white/10 rounded-stashbox p-2.5">
      <div className="text-xs font-medium text-white mb-2">Expected Returns</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-base font-bold text-white">
            ${returns.total.toFixed(0)}
          </div>
          <div className="text-xs text-white/70">
            After {duration} days
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-green-300">
            +${returns.profit.toFixed(0)}
            {showPercentage && (
              <span className="text-xs ml-1">({returns.percentage.toFixed(1)}%)</span>
            )}
          </div>
          <div className="text-xs text-white/70">
            Profit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpectedReturns;
