import {TaskComponent} from './components/task.component';
import {TaskAddComponent} from './components/task-add.component';
import {AuthComponent} from './components/auth.component';
import {AuthGuard} from './helpers/auth.guard';

export default [
  {path: '', component: TaskComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: 'task', component: TaskComponent, canActivate: [AuthGuard]},
  {path: 'task/add', component: TaskAddComponent, canActivate: [AuthGuard]},
  {path: 'task/edit/:id', component: TaskAddComponent, canActivate: [AuthGuard]},
];
