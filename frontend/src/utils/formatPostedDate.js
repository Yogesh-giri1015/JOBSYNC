export const formatPostedDate = (date) => {
  const postedDate = new Date(date);
  const today = new Date();

  const diff = Math.floor(
    (today - postedDate) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";

  return `${diff} days ago`;
}; 