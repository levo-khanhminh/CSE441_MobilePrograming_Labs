export const toVND = (value: number) => {
  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  })
    .format(value)
    .replace("₫", "")
    .trim();
  return formatted.replace("VND", "đ");
};
