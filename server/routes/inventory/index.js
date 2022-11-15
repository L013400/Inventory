import { Router } from "express";
import InventoryController from "../../controllers/inventory/inventory.js";
import auth from "../../middlewares/auth.js"
const router = Router();
router.get('/:type', InventoryController.getInventoryDetails)
router.put('/edit', auth, InventoryController.updateInventoryDetails)

export default router;