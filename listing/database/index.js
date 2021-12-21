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
  var name="test";
  var added = "added_on";
  var ord = -1;
  const product = await Products
  .find({title: { $regex: '.*' + name + '.*' } })
  .sort([[''+added+'', ord]])
  .skip()
  .limit();
  const userMap = {};
    product.forEach((product) => {
        userMap[product._id] = product;
    });
  return userMap;
}

module.exports = {
  productList
}
