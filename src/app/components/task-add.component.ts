import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/Task.service';
import {Task} from '../models/Task';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Priority} from '../models/Priority';
import {Employee} from '../models/Employee';
import {PriorityService} from '../services/Priority.service';
import {EmployeeService} from '../services/Employee.service';
import {ToastrService} from 'ngx-toastr';
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: '../views/task-add.component.html',
})
export class TaskAddComponent implements OnInit {
  public task: Task = {
    title: '',
    description: '',
    employeeId: null,
    priorityId: null,
    completed: false
  } as Task;
  public priorities: Priority[] = [];
  public employees: Employee[] = [];
  public errors: Partial<Task> = {};

  public loading = true;
  public editForm = false;
  public wasSubmited = false;

  public icons = {faCaretLeft};

  constructor(
    private taskService: TaskService,
    private priorityService: PriorityService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  public getCurrentDate(): Date {
    return (new Date());
  }

  public onAddTask(addFormTask): void {
    this.errors = {};
    this.wasSubmited = false;
    const task: Task = addFormTask.value;
    if (task.id) {
      this.taskService.update(task).subscribe(
        (response: Task) => {
          this.task = response;
          this.toastr.success(`Task '${task.title}' was updated.`);
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message || error.message);
        },
        () => this.wasSubmited = true
      );
    } else {
      this.taskService.add(task).subscribe(
        (response: Task) => {
          this.toastr.success(`Task '${task.title}' was created.`);
          this.router.navigateByUrl('/task');
        },
        (resErr: HttpErrorResponse) => {
          this.toastr.error(resErr?.error?.message || resErr.statusText);
          this.errors = resErr?.error?.errors;
        },
        () => this.wasSubmited = true
      );
    }
  }

  public getTask(id: number): void {
    this.taskService.get(id).subscribe(
      (response: Task) => {
        this.task = response;
        this.editForm = true;
        this.loading = false;
      },
      (resErr: HttpErrorResponse) => {
        this.toastr.error(resErr?.error?.message || resErr.statusText);
      }
    );
  }

  public getEmployees(): void {
    this.employeeService.getAll().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (resErr: HttpErrorResponse) => {
        this.toastr.error(resErr?.error?.message || resErr.statusText);
      }
    );
  }

  public getPriorities(): void {
    this.priorityService.getAll().subscribe(
      (response: Priority[]) => {
        this.priorities = response.sort((a, b) => a.value - b.value);
      },
      (resErr: HttpErrorResponse) => {
        this.toastr.error(resErr?.error?.message || resErr.statusText);
      }
    );
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getPriorities();


    const routeParams = this.route.snapshot.paramMap;
    const taskId = Number(routeParams.get('id'));

    if (taskId) {
      this.getTask(taskId);
    } else {
      this.loading = false;
    }

  }
}
