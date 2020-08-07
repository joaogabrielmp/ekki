export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const cellphoneMask = (value: string): string => {
  let formatted = value;
  formatted = formatted.replace(/\D/g, '');
  formatted = formatted.replace(/^(\d{2})(\d)/g, '($1) $2');
  formatted = formatted.replace(/(\d)(\d{4})$/, '$1-$2');

  return formatted;
};

export const onlyNumber = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};
