import {Router} from 'express';
import { addTaskHandler } from '../controllers/taskCOntrollers';
import { removeTaskHandler } from '../controllers/taskCOntrollers';
const taskrouter= Router ();

taskrouter.route('/workadd').post(addTaskHandler);

taskrouter.route('/workdelete').post(removeTaskHandler);

export default taskrouter;