export function generateSuggestions(csvData) {
  const thresholds = {
    recycleEff: 50,
    wastePerProduct: 0.3,
    carbonOffsetPerProduct: 0.02,
  };

  let suggestions = [];

  // Total
  const totalWaste = csvData.reduce((sum, row) => sum + Number(row["Total Waste (kg)"] || 0), 0);
  const totalProducts = csvData.reduce((sum, row) => sum + Number(row["Total Products (units)"] || 0), 0);
  const totalCarbon = csvData.reduce((sum, row) => sum + Number(row["Carbon Offset (kg CO2)"] || 0), 0);

  const reusableCategories = ['Plastic', 'Metal'];
  const totalReusableWaste = csvData.reduce((sum, row) => {
    return sum + reusableCategories.reduce((catSum, cat) => catSum + (Number(row[cat]) || 0), 0);
  }, 0);

  const recycleEfficiency = (totalReusableWaste / totalWaste) * 100;
  const wastePerProduct = totalWaste / totalProducts;
  const carbonPerProduct = totalCarbon / totalProducts;

  // 1. Low recycling
  if (recycleEfficiency < thresholds.recycleEff) {
    suggestions.push("Increase recycling practices, especially for Plastic and Metal.");
  }

  // 2. High waste per product
  if (wastePerProduct > thresholds.wastePerProduct) {
    suggestions.push("Optimize production process to reduce waste per unit.");
  }

  // 3. Low carbon offset
  if (carbonPerProduct < thresholds.carbonOffsetPerProduct) {
    suggestions.push("Invest in more carbon offset methods (like tree planting or green energy).");
  }

  // 4. Specific category problem
  const categoryTotals = {};
  const categories = ['Plastic', 'Metal', 'Organic', 'Glass', 'E-waste'];
  csvData.forEach(row => {
    categories.forEach(cat => {
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(row[cat] || 0);
    });
  });

  const mostWasteCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  if (mostWasteCategory) {
    suggestions.push(`Focus on reducing ${mostWasteCategory[0]} waste.`);
  }

  return suggestions;
}
