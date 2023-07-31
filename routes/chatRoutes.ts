import express, { Router } from "express";
import { saveMessages } from "../controllers/chatController";

const router: Router = express.Router();

router.post("/messages", saveMessages);

module.exports = router;
