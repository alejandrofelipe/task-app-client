import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from '../services/Jwt.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest: any;
    if (this.jwtService.isLoggedIn()) {
      newRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtService.getToken()}`
        }
      });
      return next.handle(newRequest);
    } else {
      return next.handle(req);
    }
  }
}
