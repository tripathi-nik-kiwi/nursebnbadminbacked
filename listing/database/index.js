const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecom-project')
.then(()=>console.log('connected successfully to database'))
.catch(err=>console.log('could not connect to database'));
const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true
    },
    short_des:{
      type:String
    },
    cost_price: {
      type:Number,
      required:true,
      min:1
    },
    picture:{
      type:String,
      default:'[]'
    },
    status: {
      type:Number,
      required:true
    },
    isFeatured: {
      type:Number,
      required:true
    },
   added_on:{ type:Date,default:Date.now }
});
const Products = mongoose.model('Products',productSchema);
async function productList(value){
  const { title,orderBy,order,start,total } = value;
  const product = await Products
  .find({title: { $regex: '.*' + title + '.*' } })
  .sort([[''+orderBy+'', parseInt(order)]])
  .skip(parseInt(start))
  .limit(parseInt(total))
  .select({title:1,short_des:1,cost_price:1,picture:1,added_on:1,status:1,isFeatured:1});
  const userMap = [];
  let k =0;
    product.forEach((product) => {
        userMap.push(product);
        k++;
    });
  return userMap;

}

async function listAllPads(value){
  const counter = await Products
  .find({title: { $regex: '.*' + value + '.*' } })
  .countDocuments();
  return counter;
}

async function updateStatus(pid,status){
  let product = await Products.updateOne({_id:pid},{
      $set:{
          status:status
      }
  });

  if(product.modifiedCount){
    return pid;
  }else{
    return {status:404};
  }
}
module.exports = {
  productList,
  listAllPads,
  updateStatus
}
