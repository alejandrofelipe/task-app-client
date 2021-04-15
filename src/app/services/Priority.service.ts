import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Priority} from '../models/Priority';

@Injectable({providedIn: 'root'})
export class PriorityService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.apiServerUrl}/priority`);
  }

  public get(id: number): Observable<Priority> {
    return this.http.get<Priority>(`${this.apiServerUrl}/priority/${id}`);
  }

  public add(newPriority: Priority): Observable<Priority> {
    return this.http.post<Priority>(`${this.apiServerUrl}/priority`, newPriority);
  }

  public update(priority: Priority): Observable<Priority> {
    return this.http.put<Priority>(`${this.apiServerUrl}/priority`, priority);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/priority/${id}`);
  }
}
