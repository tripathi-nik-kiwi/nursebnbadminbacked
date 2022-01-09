const product_model = require('../database');

module.exports.getAllList = async(req,res,next)=>{
  try{
    const results = {};
    const details = await product_model.productList(req.query);
    results.result = details;
    if(req.query.initial){
      const total = await product_model.listAllPads(req.query);
      results.total = total;
    }
    res.status(200).json(results);
  }
  catch(error){
    res.status(500).json({error:error})
  }
}

module.exports.updateStatus = async(req,res,next)=>{

  try{
    const id = req.params.id;
    const status = req.body.status;
    const data = await product_model.updateStatus(id,status);

    res.status(200).json({id:data,status:status});
  }
  catch(error){
    res.status(500).json({error:error})
  }
}
