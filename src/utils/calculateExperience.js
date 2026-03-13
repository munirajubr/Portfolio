const getEndDate = (endDate) => {
  return !endDate || endDate === "Present"
    ? new Date()
    : new Date(endDate);
};

const calculateTotalMonths = (items) => {
  return items.reduce((total, { startDate, endDate }) => {
    const start = new Date(startDate);
    const end = getEndDate(endDate);

    if (isNaN(start) || isNaN(end)) return total;

    // Calculate difference in milliseconds and convert to months (approx 30.4375 days per month)
    const diffTime = Math.max(0, end - start);
    const months = diffTime / (1000 * 60 * 60 * 24 * 30.4375);

    return total + months;
  }, 0);
};

export const calculateTotalExperienceCount = (items) => {
  const totalMonths = calculateTotalMonths(items);
  const years = totalMonths / 12;
  return parseFloat(Math.max(0.1, years).toFixed(1));
};

export const calculateExperienceDuration = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = getEndDate(endDate);

  if (isNaN(start) || isNaN(end)) return "Unknown";

  const diffTime = Math.max(0, end - start);
  const months = diffTime / (1000 * 60 * 60 * 24 * 30.4375);

  if (months < 1) {
    const days = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? "s" : ""}`;
  } else if (months < 11.5) {
    const roundedMonths = Math.max(1, Math.round(months));
    return `${roundedMonths} month${roundedMonths !== 1 ? "s" : ""}`;
  } else {
    const years = (months / 12).toFixed(1);
    return `${years} year${years !== "1.0" ? "s" : ""}`;
  }
};
