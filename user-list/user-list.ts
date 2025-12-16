import { NgFor, NgIf } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { UserClass } from '../shared/services/user-classes/user-class';
import { UserService } from '../shared/services/user-services/user-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-user-list',
  imports: [NgFor, RouterLink , NgIf],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {

  users: UserClass[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsersList().subscribe({
      next: data => this.users = data,
      error: err => console.error("Error fetching users:", err)
    });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.getUsers(),
      error: err => console.error("Error deleting user:", err)
    });
  }

  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }

}