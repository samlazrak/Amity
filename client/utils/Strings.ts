import numeral from 'numeral';

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength - 3)}...`;
};

export const toCurrency = (text: string|number) => {
  const toConvert = typeof text === 'string' ? text : text.toString();

  return numeral(text).format('$0,0.00');
};
