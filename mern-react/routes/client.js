import express from "express";
import {getProduct ,getCustomers ,getTransactions ,getGeography} from "../server/controller/client.js";

const router = express.Router();
router.get("/product", getProduct)
router.get("/customers", getCustomers)
router.get("/transactions" , getTransactions);
router.get("/geography", getGeography);

export default router;