import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(){
    let Role = localStorage.getItem("user_type");
    if(Role==="admin"){
      return true;
    }
    alert("You dont have admin rights")
    return false;
  }
  
  
}
