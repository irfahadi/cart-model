// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();
router.get('/:acco_id/', indexCtrl.cart.findCart);
router.get('/:acco_id/:stat_name/', indexCtrl.cart.findCart);
router.get('/:acco_id/:stat_name/:cart_id', indexCtrl.cart.findCart);
router.post('/', indexCtrl.cart.createCart);
router.put('/:cart_id', indexCtrl.cart.updateCart);
router.delete('/:cart_id', indexCtrl.cart.deleteCart);


export default router;
