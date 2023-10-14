export const formatItemCount = (count: number) => {
  if (count === 1) {
    return "1 item";
  }

  return `${count} items`;
};
