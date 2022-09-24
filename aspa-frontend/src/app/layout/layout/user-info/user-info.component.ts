import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/session/session.service';

@Component({
  selector: 'aspa-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  username: string;
  rol: string;

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.session.getUsernameAsObservable().subscribe(
      username => {
        this.username = username;
      },
      (error: any) => { this.username = null; }
    );
    this.session.getRolAsObservable().subscribe(
      rol => { this.rol = rol; },
      (error: any) => { this.rol = null; }
    );
  }

}
