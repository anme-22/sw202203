import express from 'express';

import CashFlowRouter from './CashFlows';

const router  = express.Router();
//http://localhost:3001/cashflow/update/1
router.use('/cashflow',CashFlowRouter);

export default router;
