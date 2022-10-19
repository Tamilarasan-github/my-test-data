import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LogInService } from "./auth/components/log-in/log-in.service";
import { SpinnerService } from "./spinner-service";

@Injectable()
export class HttpRequestResponseInterceptor implements HttpInterceptor
{
    constructor(private spinnerService:SpinnerService, private logInService:LogInService)
    {

    }

    

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       this.spinnerService.setSpinner(req.url, true);
        console.log("Spinner: displayed");

        const  updatedRequest=req.clone({
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.logInService.basicAuth
            })
          });
        
      console.log("Request in Interceptor:" +JSON.stringify(updatedRequest));

       return next.handle(updatedRequest).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.setSpinner(req.url, false);
                    console.log("Spinner: stopped")
                    console.log("Response: "+JSON.stringify(JSON.stringify(event)))
          }
          return event;
      }),
        catchError((response: HttpErrorResponse) => {
          if (response.status === 401) {
            alert('Unauthorized 401');
          }
          alert('error' + JSON.stringify(response));
          this.spinnerService.setSpinner(req.url, false);
          console.log(JSON.stringify(response));
          return throwError(JSON.stringify(response));
        }
      ))
       
       
       
       
    //    new Observable(observer => next.handle(updatedRequest)
    //    .subscribe({
    //     next:(response)=>
    //     {
    //       console.log("Reponse in Interceptor:"+JSON.stringify(response))
    //       if (response instanceof HttpResponse) 
    //       {
    //         this.spinnerService.setSpinner(req.url, false);
    //         console.log("Spinner: stopped")
    //         observer.next(response);
    //         console.log("Response: "+JSON.stringify(response))
    //       }
    //     },
    //     error:(error:any)=>
    //     {
    //       alert('error' + error);
    //       this.spinnerService.setSpinner(req.url, false);
    //       console.log(JSON.stringify(error));
    //     }
    //    }))
        
    // }
      }



        
   
}