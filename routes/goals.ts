// >  deno cache app.ts  [force deno to look all your imports look and download and cache ]
import {
  Router,
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {
  getAllGoals,
  getSignalGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goals_controller.ts";
const router = new Router();

// READ
router.get("/", getAllGoals);
// READ SINGLE ELEMENT
router.get("/:goalId", getSignalGoal);

router.post("/add-goal", createGoal);

router.post("/update-goal", updateGoal);

router.post("/:goalId", deleteGoal);
export default router;