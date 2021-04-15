import {Component, OnInit} from '@angular/core';
import {AuthRequest} from '../models/AuthRequest';
import {JwtService} from '../services/Jwt.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: '../views/auth.component.html',
})
export class AuthComponent implements OnInit {
  authRequest: AuthRequest = {
    username: '',
    password: ''
  } as AuthRequest;
  loading = false;

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  public login(formLogin): void {
    this.loading = true;

    const auth: AuthRequest = formLogin.value;
    this.jwtService.login(auth).subscribe(
      (response) => {
        try {
          this.jwtService.saveToken(response, auth.username);
          this.router.navigateByUrl('/');
        } catch (e) {
          this.toastr.error(e);
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message || error.message);
        this.loading = false;
      },
      () => this.loading = false
  )
    ;
  }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

}
