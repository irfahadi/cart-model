
// findAll = select * from regions
const findClit = async (req,res) => {
    if (req.params.stat_name){
        const clit = await req.context.models.clit.findAll({ 
          where:{ clit_cart_id: req.params.cart_id,
                clit_stat_name: req.params.stat_name},
          include:{
            model:req.context.models.product,
              include:{
                model:req.context.models.productImages
              }
          }
        }
        );
        return res.send(clit);
    }
    else {
        const clit = await req.context.models.clit.findAll({
          include:{
            model:req.context.models.product,
              include:{
                model:req.context.models.productImages
              }
          }
        }
        );
        return res.send(clit);
    }   
}

const createCart = async (req, res, next) => {
  const {
    clit_subweight,
    clit_subtotal,
    clit_qty,
  } = req.body;
  let cartItem = null
  try {
    if (req.params.cart_id == undefined) {
      const cart = await req.context.models.cart.create({
        cart_created_on: Date.now(),
        cart_total_weight: 0,
        cart_total_amount: 0,
        cart_total_qty: 0,
        cart_acco_id: req.params.acco_id,
        cart_stat_name: "PENDING",
      })
      return next();  
    } 
    else {
      cartItem = await req.context.models.clit.findOne({
        where:{ clit_cart_id: req.params.cart_id,
          clit_prod_id: req.params.prod_id,
          
        } 
      })
      // console.log(cartItem)
    }
  } catch (error) {
    return res.send(error);
  }
      if(cartItem==null){
        const clit = await req.context.models.clit.create({
          clit_subweight: clit_subweight,
          clit_subtotal: clit_subtotal,
          clit_qty: clit_qty,
          clit_prod_id: req.params.prod_id,
          clit_stat_name: 'PENDING',
          clit_cart_id: req.params.cart_id
        });
        return res.send(clit);
      }else{
        const clit = await req.context.models.clit.update({
          clit_subweight: cartItem.clit_subweight+clit_subweight,
          clit_subtotal: cartItem.clit_subtotal+clit_subtotal,
          clit_qty: cartItem.clit_qty+clit_qty,
          clit_prod_id: cartItem.clit_prod_id,
          clit_stat_name: cartItem.clit_stat_name,
          clit_cart_id: cartItem.clit_cart_id
        },
          {
            where: {
              clit_id: cartItem.clit_id
            }
          }
        );
        return res.send(clit);
      }
    
};

const createClit = async (req,res) =>{
  let cart = null
  try {
    cart = await req.context.models.cart.findOne({
      where:{ cart_acco_id: req.params.acco_id}
    }) 
  } catch (error) {
    return console.log(error)
  }
  const {
    clit_subweight,
    clit_subtotal,
    clit_qty,
    clit_prod_id,
    clit_stat_name,
  } = req.body;
  const clit = await req.context.models.clit.create({
    clit_subweight: clit_subweight,
    clit_subtotal: clit_subtotal,
    clit_qty: clit_qty,
    clit_prod_id: clit_prod_id,
    clit_stat_name: clit_stat_name,
    clit_cart_id: cart.cart_id 
  })
  return res.send(clit)
}

const updateClit = async (req, res) => {
  const { clit_subweight, clit_subtotal, clit_qty, clit_prod_id, clit_stat_name, clit_cart_id} = req.body.data;
  try {
    const clit = await req.context.models.clit.create({
      clit_subweight: clit_subweight,
      clit_subtotal: clit_subtotal,
      clit_qty: clit_qty,
      clit_prod_id: clit_prod_id,
      clit_stat_name: clit_stat_name,
      clit_cart_id: clit_cart_id
    },
      {
        where: {
          clit_id: req.params.clit_id
        }
      }
    );
  
    return res.send(200);  
  } catch (error) {
    return res.send(error)
  }
  
};
const deleteClit = async (req, res) => {
    const result = await req.context.models.clit.destroy({
      where: { clit_cart_id : req.params.cart_id },
    });
  
    return res.send(200);
  };

const deleteItem = async (req, res) => {
    const result = await req.context.models.clit.destroy({
      where: { clit_id : req.params.clit_id },
    });
  
    return res.send(200);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findClit, createClit, updateClit, deleteClit, createCart, deleteItem
}