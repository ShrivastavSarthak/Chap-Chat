export function StringFormatService(url: string, params: string[]) {
  return url.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== "undefined" ? String(params[index]) : match;
  });
}
