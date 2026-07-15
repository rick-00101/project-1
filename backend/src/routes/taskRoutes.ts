import {Router} from 'express';
import { addTaskHandler } from '../controllers/taskCOntrollers';
import { removeTaskHandler } from '../controllers/taskCOntrollers';
import { protectRoute } from '../middleware/auth';
const taskrouter= Router ();

taskrouter.route('/workadd').post(protectRoute,addTaskHandler);

taskrouter.route('/workdelete').post(protectRoute,removeTaskHandler);

export default taskrouter;