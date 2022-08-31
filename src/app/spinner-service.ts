import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SpinnerService
{

    showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    showSpinnerAsObservable:Observable<boolean>=this.showSpinner.asObservable();
    spinnerMap:Map<string, boolean> = new Map<string, boolean>();

    constructor()
    {

    }

    setSpinner(url:string, spinner: boolean)
    {
        if(spinner==true)
        {
        this.spinnerMap.set(url, spinner);
        this.showSpinner.next(true);
        }
        else if(spinner==false && this.spinnerMap.has(url))
        {
            this.spinnerMap.delete(url);
        }

        if(this.spinnerMap.size === 0)
        {
            this.showSpinner.next(false);
        }
    }

    
}