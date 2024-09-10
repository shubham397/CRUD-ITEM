import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController";
import authenticateJWT from "../middlewares/authenticateJWT";

const router: Router = Router();

router.get("/", authenticateJWT, getAllItems);
router.get("/:id", authenticateJWT, getItemById);
router.post("/", authenticateJWT, createItem);
router.put("/:id", authenticateJWT, updateItem);
router.delete("/:id", authenticateJWT, deleteItem);

export default router;
