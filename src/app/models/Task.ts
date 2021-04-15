import {Employee} from './Employee';
import {Priority} from './Priority';

export interface Task {
  id?: number;
  title: string;
  description: string;
  created?: string;
  updated?: string;
  deadline: string;
  employee?: Employee;
  employeeId: number;
  priority?: Priority;
  priorityId: number;
  completed: boolean;
}
