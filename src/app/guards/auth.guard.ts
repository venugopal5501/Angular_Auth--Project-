import { CanActivate, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private auth:AuthService, private router:Router){}
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      alert("Please login first");
      this.router.navigate(['login']);
      return false;
    }
  }



}

