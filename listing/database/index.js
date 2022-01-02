const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecom-project')
.then(()=>console.log('connected successfully to database'))
.catch(err=>console.log('could not connect to database'));

const productSchema = new mongoose.Schema({
    user_id:{
      type:String,
      required:true
    },
    title: {
        type:String,
        required:true,
        trim:true
    },
    slug:{
      type:String,
      required:true
    },
    cost_price: {
        type:Number,
        required:true,
        validate:{
            isAsync:true,
            validator:function(v,callback){
                setTimeout(()=>{
                  const result = (parseInt(v)>=parseInt(this.sale_price));
                  callback(result);
                },2000)

            },
            message:'Cost Price must be greater than equal to Sale price'
        }
    },
    sale_price: {
      type:Number,
      required:true,
      min:1
    },
    inventory:{
      type:Number,
      required:true,
      min:1
   },
   short_des:{
     type:String
   },
   product_specification:{
     type:String
   },
   picture:{
     type:String,
     default:'[]'
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
  .select({title:1,short_des:1,cost_price:1,picture:1,added_on:1});
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

module.exports = {
  productList,
  listAllPads
}
