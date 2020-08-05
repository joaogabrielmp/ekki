const formatMoney = (value: number): string => {
  const numero = Number(value).toFixed(2).split('.');
  numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join('.')}`;
  const balance = numero.join(',');

  return balance;
};

export default formatMoney;
