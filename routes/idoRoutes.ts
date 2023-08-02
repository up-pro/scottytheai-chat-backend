import express, { Router } from "express";
import { invest } from "../controllers/idoController";

const router: Router = express.Router();

router.post("/invest", invest);

module.exports = router;
