import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

@Injectable()
export class LogInService {
  public basicAuth: string = '';

  private userNameBehaviorSubject: BehaviorSubject<string>;
  public userNameAsObservable: Observable<string>;

  private allowAccessBehaviorSubject: BehaviorSubject<boolean>;
  public allowAccessAsObservable: Observable<boolean>;

  constructor(private route: Router, private httpClient: HttpClient) {
    this.userNameBehaviorSubject = new BehaviorSubject<string>('');
    this.userNameAsObservable = this.userNameBehaviorSubject.asObservable();

    this.allowAccessBehaviorSubject = new BehaviorSubject<boolean>(false);
    this.allowAccessAsObservable =
      this.allowAccessBehaviorSubject.asObservable();
  }

  createBasicAuthToken(username: String, password: String) {
    console.log('Username:' + username);
    console.log('Password:' + password);
    this.basicAuth = 'Basic ' + window.btoa(username + ':' + password);
    console.log('BasicAuth:' + this.basicAuth);
    return this.basicAuth;
  }

  validateLoginCredentials(userName: string, password: string) {
    this.createBasicAuthToken(userName, password);

    return this.httpClient
      .get<User>(environment.backendBaseURL + '/auth')
      .subscribe({
        next: (user) => {
          this.userNameBehaviorSubject.next(user.username);
          console.log('Login response:' + JSON.stringify(user));
          this.allowAccessBehaviorSubject.next(true);
          sessionStorage.setItem('authenticatedUser', user.username);
          this.route.navigateByUrl('/testscripts');
        },
        error: (e) => {
          console.log('Tables fetching error:' + e);
          console.error();
          this.allowAccessBehaviorSubject.next(false);
        },
      });
  }
}