import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Employee} from '../models/Employee';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee`);
  }

  public get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/${id}`);
  }
}
