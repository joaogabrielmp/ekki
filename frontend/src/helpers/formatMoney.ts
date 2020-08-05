const formatMoney = (value: number): string => {
  const amount = Number(value).toFixed(2).split('.');
  amount[0] = `R$ ${amount[0].split(/(?=(?:...)*$)/).join('.')}`;
  const balance = amount.join(',');

  return balance;
};

export default formatMoney;
