import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Task} from '../models/Task';

@Injectable({providedIn: 'root'})
export class TaskService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}/task`);
  }

  public get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiServerUrl}/task/${id}`);
  }

  public add(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiServerUrl}/task`, newTask);
  }

  public update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiServerUrl}/task`, task);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/task/${id}`);
  }

  public search(taskSearch: any): Observable<Task[]> {
    const params = new URLSearchParams(this.removeEmpty(taskSearch as {})).toString();
    return this.http.get<Task[]>(`${this.apiServerUrl}/task/search?${params}`);

  }

  private removeEmpty(obj: any): any {
    Object.keys(obj)
      .forEach((k) => {
        if (obj[k] === '' || obj[k] === undefined || obj[k] === null || obj[k] === 'null') {
          delete obj[k];
        }
      });
    return obj;
  }
}
