import { Router } from "express";

import {
  startAttempt,
  submitPuzzle,
  useHint,
  completeAttempt,
  getAttempt
} from "../controllers/attemptController.js";

const router = Router();

router.post("/", startAttempt);

router.get("/:id", getAttempt);

router.post(
  "/:id/puzzle",
  submitPuzzle
);

router.post(
  "/:id/hint",
  useHint
);

router.post(
  "/:id/complete",
  completeAttempt
);

export default router;