import express, { Router } from "express";
import { getInvestedTokens, invest } from "../controllers/idoController";

const router: Router = express.Router();

router.post("/invest", invest);
router.get('/get-invested-tokens', getInvestedTokens)

module.exports = router;
