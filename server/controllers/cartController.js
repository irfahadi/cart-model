
// findAll = select * from regions
const findCart = async (req,res) => {
    if (req.params.stat_name){
        const cart = await req.context.models.cart.findAll({
          where: { cart_acco_id : req.params.acco_id },
          include:{
            model:req.context.models.clit,
            where:{
              clit_stat_name: req.params.stat_name
            },
            include:{
              model:req.context.models.product,
                include:{
                  model:req.context.models.productImages
                }
            }
          }
        });
        return res.send(cart);
    }else {
      const cart = await req.context.models.cart.findAll({
        where:{cart_acco_id:req.params.acco_id}
      }
      );
      return res.send(cart);
  }   
        
}


const createCart = async (req,res) =>{
    const { cart_total_weight, cart_total_amount, cart_total_qty, cart_acco_id, cart_stat_name} = req.body.data;
    const cart = await req.context.models.cart.create({
      cart_created_on: Date.now(),
      cart_total_weight: cart_total_weight,
      cart_total_amount: cart_total_amount,
      cart_total_qty: cart_total_qty,
      cart_acco_id: cart_acco_id,
      cart_stat_name: cart_stat_name
    });
  
    return res.send(cart);
}
const updateCart = async (req, res) => {
    const { cart_total_weight, cart_total_amount, cart_total_qty, cart_acco_id, cart_stat_name, cart_line_items} = req.body;
    console.log(cart_line_items)
    const cart = await req.context.models.cart.update({
      cart_created_on: Date.now(),
      cart_total_weight: cart_total_weight,
      cart_total_amount: cart_total_amount,
      cart_total_qty: cart_total_qty,
      cart_acco_id: cart_acco_id,
      cart_stat_name: cart_stat_name,
    },
    {
      where: {
        cart_id: req.params.cart_id
      }
    }
    );
    cart_line_items.forEach( async (element) => {
      console.log(element)
      const clit = await req.context.models.clit.update({
        clit_qty: element.clit_qty,
        clit_subweight : element.clit_subweight,
        clit_subtotal: element.clit_subtotal,
        clit_stat_name:element.clit_stat_name,
      },
      {
        where: {
          clit_id: element.clit_id
        }
      }
      )
      return res.send(clit)  
    });
  }    

  
const deleteCart = async (req, res) => {
    const result = await req.context.models.cart.destroy({
      where: { cart_id : req.params.cart_id },
    });
  
    return res.send(200);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findCart, createCart, updateCart, deleteCart
}