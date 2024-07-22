import express, { response } from "express"
import { dbSave, dbSearch, dbTimeBased } from "../controllers/input.controller.js";

const router=express.Router();

router.post("/db-save",dbSave)

router.post("/time-based-api",dbTimeBased)

router.get("/db-search",dbSearch)

export {router};