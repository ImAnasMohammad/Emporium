import moment from "moment";

const formatCurrency = (price=0) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
}).format(price);


const formatDate=(date)=>moment(date).format('DD-MM-YYYY');

const formatOrderStatus = ()=>{

}


export {formatCurrency,formatDate,formatOrderStatus};