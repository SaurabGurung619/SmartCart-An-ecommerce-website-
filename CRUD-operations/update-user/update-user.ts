
import { UserService } from './../../shared/services/user-services/user-service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserClass } from '../../shared/services/user-classes/user-class';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-user',
  imports: [FormsModule,RouterLink],
  templateUrl: './update-user.html',
  styleUrl: './update-user.scss'
})
export class UpdateUser implements OnInit {

  id: number = 0;
  user: UserClass=new UserClass();
  constructor(private userService: UserService, 
    private route:ActivatedRoute,
    private router:Router
  ){  }




ngOnInit(){
  this.id= this.route.snapshot.params['id'];
  this.userService.getUserById(this.id).subscribe
  (data => {
    this.user=data;
    },
    error => 
      { console.log(error);
      }
      );
}

onSubmit() {
this.userService.UpdateUser(this.id,this.user).subscribe(data=>{
  this.goToUserList();
},
error => {
  console.log(error);
  })
}

goToUserList(){
  this.router.navigate(['/users'])

}

}
