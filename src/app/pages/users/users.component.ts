import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  status: string;
  role: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  private auth = JSON.parse(localStorage.getItem('auth') || '{}');

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };

    this.userService.getAllUser(httpOptions).subscribe(
      (res: any) => {
        this.users = res;
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  updateStatus(id: number, status: string) {
    const newStatus = String(!JSON.parse(status)); // change to opposite status
    const body = { id: id, status: newStatus };

    const confirmed = confirm(
      `Update the status of user id ${id} to ${newStatus}?`
    );
    if (!confirmed) return;

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    this.userService.updateStatus(body, httpOptions).subscribe(
      (res: any) => {
        alert(res.message);
        this.getAllUser();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  updateRole(id: number, role: string) {
    const newRole = role === 'user' ? 'admin' : 'user';
    const body = { id: id, role: newRole };

    const confirmed = confirm(
      `Update the role of user id ${id} to ${newRole}?`
    );
    if (!confirmed) return;

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    };
    this.userService.updateRole(body, httpOptions).subscribe(
      (res: any) => {
        alert(res.message);
        this.getAllUser();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }
}
