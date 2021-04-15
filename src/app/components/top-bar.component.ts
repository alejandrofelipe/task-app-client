import {Component, OnInit} from '@angular/core';
import {JwtService} from '../services/Jwt.service';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: '../views/elements/top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  username: string;
  public icons = {faSignOutAlt};

  constructor(private jwtConteiner: JwtService) {
  }

  ngOnInit(): void {
    this.username = this.jwtConteiner.getUsername();
  }

  public isLoggedIn(): boolean {
    return this.jwtConteiner.isLoggedIn();
  }

  public logout(): void {
    this.jwtConteiner.logout();
  }
}
