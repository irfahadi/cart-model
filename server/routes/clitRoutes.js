// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();
router.get('/:cart_id/:stat_name', indexCtrl.clit.findClit);
router.post('/:acco_id', indexCtrl.clit.createCart, indexCtrl.clit.createClit);
router.post('/:acco_id/:cart_id:', indexCtrl.clit.createClit);
router.post('/:acco_id/:cart_id/:prod_id', indexCtrl.clit.createCart);
router.put('/:clit_id', indexCtrl.clit.updateClit);
router.delete('/:clit_id', indexCtrl.clit.deleteClit);

export default router;
