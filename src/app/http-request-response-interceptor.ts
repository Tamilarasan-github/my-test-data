import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { SpinnerService } from "./spinner-service";

@Injectable()
export class HttpRequestResponseInterceptor implements HttpInterceptor
{
    constructor(private spinnerService:SpinnerService)
    {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       this.spinnerService.setSpinner(req.url, true);
        console.log("Spinner: displayed");
       return new Observable(observer => {
        next.handle(req)
       .subscribe(
        
        next => {
          if (next instanceof HttpResponse) {
            this.spinnerService.setSpinner(req.url, false);
            observer.next(next);
            console.log("Spinner: stopped")
          }
        },
        error => {
          alert('error' + error);
          this.spinnerService.setSpinner(req.url, false);
          observer.error(error);
        },
        () => {
          this.spinnerService.setSpinner(req.url, false);
          observer.complete();
          console.log("Spinner: stopped")
        });
    })
    }





       
    //    .pipe(
    //     catchError((err)=> {
    //         this.spinnerService.setSpinner(req.url, false);
    //         return err;
    //     }
    //    )) 
    //    .pipe(map<HttpEvent<any>, <any>>((evt: HttpEvent<any>) => 
    //    {
    //     if (evt instanceof HttpResponse) {
    //       this.spinnerService.setSpinner(req.url, false);
    //     }
    //     return evt;
    //   }));
    // }
}