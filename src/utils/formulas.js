export const FEED_PERCENTAGE_TABLE = [
  { max: 20, value: 8 },
  { max: 50, value: 6 },
  { max: 100, value: 4 },
  { max: 200, value: 3 },
  { max: 350, value: 2.5 },
  { max: 500, value: 2 },
  { max: Infinity, value: 1.5 },
];

export const getWeightKg = (averageWeight) => Number(averageWeight || 0) / 1000;

export const getBiomass = (fishCount, averageWeight) => {
  const weightKg = getWeightKg(averageWeight);
  return Number(fishCount || 0) * weightKg;
};

export const getFeedPercentage = (averageWeight) => {
  const weight = Number(averageWeight || 0);
  const entry = FEED_PERCENTAGE_TABLE.find((item) => weight <= item.max);
  return entry ? entry.value : 1.5;
};

export const getDailyFeed = (fishCount, averageWeight) => {
  const biomass = getBiomass(fishCount, averageWeight);
  const feedPercentage = getFeedPercentage(averageWeight);
  return biomass * (feedPercentage / 100);
};

export const getMorningFeed = (dailyFeed) => Number(dailyFeed || 0) * 0.5;

export const getEveningFeed = (dailyFeed) => Number(dailyFeed || 0) * 0.5;

export const getFeedStats = ({ fishCount, averageWeight }) => {
  const biomass = getBiomass(fishCount, averageWeight);
  const feedPercentage = getFeedPercentage(averageWeight);
  const dailyFeed = getDailyFeed(fishCount, averageWeight);
  return {
    biomass,
    feedPercentage,
    dailyFeed,
    morningFeed: getMorningFeed(dailyFeed),
    eveningFeed: getEveningFeed(dailyFeed),
  };
};

export const formatNumber = (value, digits = 2) => {
  const num = Number(value || 0);
  return Number.isFinite(num) ? num.toFixed(digits) : '0.00';
};

export const getProteinContribution = (quantity, cp) => Number(quantity || 0) * (Number(cp || 0) / 100);

export const getFeedFormulaStats = (ingredients) => {
  const totalFeedWeight = ingredients.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const totalProtein = ingredients.reduce((sum, item) => sum + getProteinContribution(item.quantity, item.cp), 0);
  const feedCp = totalFeedWeight > 0 ? (totalProtein / totalFeedWeight) * 100 : 0;
  const totalCost = ingredients.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0);
  const costPerKg = totalFeedWeight > 0 ? totalCost / totalFeedWeight : 0;

  return {
    totalFeedWeight,
    totalProtein,
    feedCp,
    totalCost,
    costPerKg,
  };
};
