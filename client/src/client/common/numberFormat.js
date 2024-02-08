

export const formatCurrency = (price) =>price = new Intl.NumberFormat('en-IN', {style: 'currency',currency: 'INR'}).format(price | 0).split('.')[0];


const formatNumber = (number)=>new Intl.NumberFormat().format(number | 0)

export default formatNumber;