export const formatDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleDateString("en-US", {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
