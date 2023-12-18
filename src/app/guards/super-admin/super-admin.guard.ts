import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Request } from 'src/app/shared/models/Request/request';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  requestModel = new Request();

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.requestModel.token = sessionStorage.getItem("authToken");
      this.requestModel.flag = "SA";

      this.authService.getMenuPermissions(this.requestModel).subscribe((resp: any) => {

        if (resp.code !== 1) {
          this.router.navigate(['auth/login']);
        }
      }, (err) => {
        this.router.navigate(['auth/login']);
      })

    return true;
  }
  
}
