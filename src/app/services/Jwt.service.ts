import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../models/AuthResponse';
import {AuthRequest} from '../models/AuthRequest';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class JwtService {
  private serverUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  public login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.serverUrl}/authenticate`, authRequest);
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
    this.toastr.success('You logged off.');
  }

  public saveToken(authResponse: AuthResponse, username: string): void {
    if (authResponse.jwt) {
      localStorage.setItem('jwt', authResponse.jwt);
      localStorage.setItem('username', username);
    } else {
      throw new Error('Invalid credentials.');
    }
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public getToken(): string {
    return localStorage.getItem('jwt');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

}
