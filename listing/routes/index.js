const express = require('express');
const router = express.Router();
const product_model = require('../database');

router.get('/list', (req,res)=>{
  //const user_id=req.user_id;
  async function product_list(){
    const details = await product_model.productList();
    res.send({status:200,result:details});

  }
  product_list();
});


module.exports = router;
