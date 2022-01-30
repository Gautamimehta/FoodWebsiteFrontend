import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo:BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  constructor() {
    this.loadUserInfo();
   }

  loadUserInfo(){
    const userdata = this.userInfo.getValue();
    if(!userdata){

      const accesstoken = localStorage.getItem("access_token")
      
      if(accesstoken){
        const decryptedUser = this.jwtHelper.decodeToken(accesstoken);
        const data ={
          access_token : accesstoken,
          refresh_token : localStorage.getItem("refresh_token"),
          username : decryptedUser.username,
          userid : decryptedUser.sub,
          tokenExpiration : decryptedUser.exp,
          // For admin
          user_type:localStorage.getItem("user_type"),
        };
        // next is observable for deliverd value
        this.userInfo.next(data);
      }
    }
  }

  userLogin(userPayload : any){
    console.log(userPayload);
    const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
    const refreshtoken = "dummy";
    // by me for admin
    const userType = "Emp";

    localStorage.setItem("access_token",accesstoken);
    localStorage.setItem("refresh_token",refreshtoken);
    // ny me for admin
    localStorage.setItem("user_type",userType);

    const decryptedUser = this.jwtHelper.decodeToken(accesstoken);
    console.log(decryptedUser);

    const data ={
      access_token : accesstoken,
      refresh_token : refreshtoken,
      username : decryptedUser.username,
      userid : decryptedUser.sub,
      tokenExpiration : decryptedUser.exp,
      // by me for admin
      user_type:userType
    };
    this.userInfo.next(data);
   
  }
  clearSession(){
   localStorage.removeItem('access_token')
   localStorage.removeItem('refresh_token')
   // by me for admin
   localStorage.removeItem('user_type')
  }


  
}
