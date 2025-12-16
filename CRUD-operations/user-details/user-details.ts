import { Component } from '@angular/core';
import { UserClass } from '../../shared/services/user-classes/user-class';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user-services/user-service';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails {

  id: number = 0;
  user: UserClass=new UserClass();

  constructor(private route:ActivatedRoute ,
private userService : UserService){}


  ngOnInit(){
    this.id=this.route.snapshot.params['id'];

    this.user=new UserClass();
    this.userService.getUserById(this.id).subscribe(
      (data:UserClass)=>{
        this.user=data;
        },
    )
  }



}
