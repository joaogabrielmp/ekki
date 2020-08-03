const formatMoney = (int: number): string => {
  let balance = `${int}`;
  balance = balance.replace('.', ',');

  return `R$ ${balance}`;
};

export default formatMoney;
