import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LogInService } from "./components/log-in/log-in.service";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private route:Router, private logInService:LogInService)
    {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        let allowAccess:boolean = false;
        this.logInService.allowAccessAsObservable.subscribe(
            {
                next:(value)=>
                {
                    if(value==true){
                        allowAccess= true;
                    }
                    else{
                        allowAccess= false;
                        this.route.navigateByUrl("/");
                    }
                }
            }
        )
        return allowAccess;
    }
}