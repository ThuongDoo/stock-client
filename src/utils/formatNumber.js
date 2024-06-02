export default function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " K";
  }
  return num;
}
