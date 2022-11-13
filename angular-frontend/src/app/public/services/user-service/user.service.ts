import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {LoginResponseI, UserI} from "../../public.interfaces";
import {catchError, Observable, tap, throwError} from "rxjs";

export const snackBarConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'right',
  verticalPosition: 'top'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  login(user: UserI): Observable<LoginResponseI> {
    return this.httpClient.post<LoginResponseI>('api/users/login', user).pipe(
      tap((res: LoginResponseI) => localStorage.setItem('nestjs_todo_app', res.access_token)),
      tap(() => this.snackbar.open('Login Successfull', 'Close', snackBarConfig)),
      catchError(e => {
        this.snackbar.open(`${e.error.message}`, 'Close', snackBarConfig);
        return throwError(e);
      })
    )
  }

  register(user: UserI): Observable<UserI> {
    return this.httpClient.post<UserI>('api/users', user).pipe(
     tap((createdUser: UserI) => this.snackbar.open(`User ${createdUser.username} was created`, 'Close', snackBarConfig)),
     catchError(e => {
       this.snackbar.open(`User could not be created because: ${e.error.message}`, 'Close', snackBarConfig);
       return throwError(e);
     })
    )
  }
}
