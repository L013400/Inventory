import { Router } from "express";
import userRouter from "./user/index.js"
import inventoryRouter from "./inventory/index.js"
const router = Router();

router.use('/user',userRouter)
router.use('/inventory', inventoryRouter)

router.get('/',(req,res)=>{
    res.status(200).send('Hello there')
})
export default router;