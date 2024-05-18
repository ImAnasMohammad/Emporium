export const formattedNumber= (number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
}).format(number);
