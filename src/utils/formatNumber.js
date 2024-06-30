export default function formatNumber(num, fixNum = 3, excludeThreshold = 0) {
  if (isNaN(num) || num === "") {
    return "Invalid input";
  }

  const absNum = Math.abs(num);

  let result;

  if (absNum < excludeThreshold) {
    result = absNum.toFixed(fixNum);
  } else {
    if (absNum >= 1e9) {
      result = (absNum / 1e9).toFixed(fixNum) + " B";
    } else if (absNum >= 1e6) {
      result = (absNum / 1e6).toFixed(fixNum) + " M";
    } else if (absNum >= 1e3) {
      result = (absNum / 1e3).toFixed(fixNum) + " K";
    } else {
      result = num.toLocaleString("en-US", {
        minimumFractionDigits: fixNum,
        maximumFractionDigits: fixNum,
      });
      return num < 0 ? "-" + result : result;
    }
  }

  const parts = result.split(".");
  parts[0] = parseInt(parts[0], 10).toLocaleString("en-US");

  result = parts.join(".");
  return num < 0 ? "-" + result : result;
}
