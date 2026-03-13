export const formatDate = (dateString) => {
  if (!dateString || dateString === 'Present') return 'Present';
  
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  
  const options = { year: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-US', options);
};

export const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};