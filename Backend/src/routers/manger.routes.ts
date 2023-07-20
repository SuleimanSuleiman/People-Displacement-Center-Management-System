import express,{ Router } from "express";
import { checkFindUser } from '../middlewares/checkFindUser';
import { GetDataHandle } from '../controllers/humen.controller';
import { GetCentersHanlde, GetFuzzyResult } from '../controllers/center.controller';


const router: Router = express.Router();

router.get('/',
     [checkFindUser],
    GetDataHandle
)


router.post('/fuzzy',
      [checkFindUser],
    GetFuzzyResult
)

router.get('/get-centers',
      [checkFindUser],
    GetCentersHanlde
)

export default router;

