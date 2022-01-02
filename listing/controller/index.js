const product_model = require('../database');

module.exports.getAllList = async(req,res,next)=>{
  try{
    const results = {};
    const details = await product_model.productList(req.query);
    results.result = details;
    if(req.query.initial){
      const total = await product_model.listAllPads(req.query.title);
      results.total = total;
    }
    res.status(200).json(results);
  }
  catch(error){
    res.status(500).json({error:error})
  }
}
