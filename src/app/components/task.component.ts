import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TaskService} from '../services/Task.service';
import {Task} from '../models/Task';
import {HttpErrorResponse} from '@angular/common/http';
import {
  faPlus, faCheck, faPencilAlt, faTrash, faUser,
  faSearch, faEye, faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import {ModalDialogService} from 'ngx-modal-dialog';
import {ToastrService} from 'ngx-toastr';
import {TaskSearch} from '../models/TaskSearch';
import {Employee} from '../models/Employee';
import {EmployeeService} from '../services/Employee.service';

@Component({
  templateUrl: '../views/task.component.html',
  styleUrls: ['../style/task.component.scss']
})
export class TaskComponent implements OnInit {
  public tasks: Task[] = [];
  public employees: Employee[] = [];
  public taskSearch: TaskSearch = {
    id: null,
    title: '',
    completed: null,
    employeeId: null
  };

  public loading = true;
  public showSearch = false;

  public icons = {
    faPlus, faCheck, faPencilAlt, faTrash, faUser,
    faSearch, faEye, faEyeSlash
  };

  constructor(
    private taskService: TaskService,
    private modalService: ModalDialogService,
    private employeeService: EmployeeService,
    private viewRef: ViewContainerRef,
    private toastr: ToastrService
  ) {
  }

  public toogleSeachForm(): void {
    this.showSearch = !this.showSearch;
  }

  public getBadgePriorityStyle(task: Task): any {
    return {
      'background-color': task.priority.color,
      color: task.priority.textColor
    };
  }

  onSearchTask(searchForm): void {
    const taskSearch: TaskSearch = searchForm.value;
    this.loading = true;
    this.taskService.search(taskSearch).subscribe(
      (response: Task[]) => {
        this.toastr.success(`Search completed`);
        this.tasks = response.sort(i => (new Date(i.deadline)).getTime());
      },
      (resErr: HttpErrorResponse) => {
        this.toastr.error(resErr?.error?.message || resErr.statusText);
      },
      () => this.loading = false
    );
  }

  public openModalCompleteTask(task: Task): void {
    this.modalService.openDialog(this.viewRef, {
      title: `You want to complete task '${task.title}' (${task.id})?`,
      actionButtons: [
        {
          text: 'Close',
          buttonClass: 'btn btn-light',
          onAction: () => true
        },
        {
          text: 'Complete task',
          buttonClass: 'btn btn-success',
          onAction: () => {
            this.toastr.info(`Updating task '${task.title}'.`);
            this.taskService.update({...task, completed: true}).subscribe(
              () => {
                this.toastr.success(`Task '${task.title}' completed.`);
                this.getTask();
              },
              (resErr) => this.toastr
                .error(resErr?.error?.message || resErr.statusText)
            );
            return true;
          }
        }
      ],
      settings: {
        bodyClass: 'd-none'
      },
      data: {}
    });
  }

  public openModalDeleteTask(task: Task): void {
    this.modalService.openDialog(this.viewRef, {
      title: `You want to delete task '${task.title}' (${task.id})?`,
      actionButtons: [
        {
          text: 'Close',
          buttonClass: 'btn btn-light',
          onAction: () => true
        },
        {
          text: 'Delete',
          buttonClass: 'btn btn-danger',
          onAction: () => {
            this.toastr.info(`Deleting task '${task.title}'.`);
            this.taskService.delete(task.id).subscribe(
              () => {
                this.toastr.success(`Task '${task.title}' deleted.`);
                this.getTask();
              },
              (resErr) => this.toastr
                .error(resErr?.error?.message || resErr.statusText)
            );
            return true;
          }
        }
      ],
      settings: {
        bodyClass: 'd-none'
      },
      data: {}
    });
  }

  public getTask(): void {
    this.loading = true;
    this.taskService.getAll().subscribe(
      (response: Task[]) => {
        this.tasks = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message || error.message);
      },
      () => this.loading = false
    );
  }

  public getEmployee(): void {
    this.employeeService.getAll().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (resErr: HttpErrorResponse) => {
        this.toastr.error(resErr?.error?.message || resErr.statusText);
      }
    );
  }

  ngOnInit(): void {
    this.getTask();
    this.getEmployee();
  }


}
