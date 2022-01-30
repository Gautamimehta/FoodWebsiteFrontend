import { Injectable } from '@angular/core';

// by me 
import { ActivatedRouteSnapshot, 
         CanActivate, 
         Router, 
         RouterStateSnapshot, 
         UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate{

  constructor(private authService : AuthService,
              private route : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    | boolean 
    | UrlTree 
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> {
 
    const userData = this.authService.userInfo.getValue();
    
    // when user is logged in
    if(userData && userData.userid){
      // when user tries to enter login page
       if(state.url.indexOf("login")>-1){
          this.route.navigate(['/home']);
          return false;
       }
       if(state.url.indexOf("register")>-1){
        this.route.navigate(['/home']);
        return false;
     }
    }
    else{
      if(state.url.indexOf("dashboard")>-1){
        alert("Please Login with Admin Credentials")
        this.route.navigate(['/login']);
        return false;
      }

      if(state.url.indexOf("aboutus")>-1){
        // alert("Please Login")
        this.route.navigate(['/login']);
        return false;
      }

      if(state.url.indexOf("contactus")>-1){
        // alert("Please Login")
        this.route.navigate(['/login']);
        return false;
      }
      if(state.url.indexOf("home")>-1){
        // alert("Please Login")
        this.route.navigate(['/login']);
        return false;
      }
      // logout by me 
      if(state.url.indexOf("logout")>-1){
        this.route.navigate(['/login']);
        return false;
      }

    }
    return true;
  }
}
function elif(arg0: boolean) {
  throw new Error('Function not implemented.');
}