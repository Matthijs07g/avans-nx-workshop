import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class AuthService{
     endpoint = environment.apiUrl;
    public currentUser$ = new BehaviorSubject<IUserIdentity | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json'})


    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public register(firstName: string, lastName: string, picture: string, emailadres: string, pass: string, birthdate: string): Observable<IUser>{
        console.log(`register ${this.endpoint}auth/register`);
        return this.http
            .post<ApiResponse<IUser>>(this.endpoint+'auth/register', 
                {firstName, lastName, picture, emailadres, pass, birthdate},
            )
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            )
    }

    public login(emailadres: string, pass: string, options?: any): Observable<IUserIdentity> {
        console.log('frontend service')
        console.log(`login ${this.endpoint}auth/login`);
        return this.http
            .post<ApiResponse<IUserIdentity>>(this.endpoint+'auth/login', 
                { emailadres, pass},
                { headers: this.headers }
            )
            .pipe(
                tap(console.log),
                map((response: any) => {
                    const user = {...response} as IUserIdentity;
                    this.saveUserToLocalStorage(user);
                    this.currentUser$.next(user);
                    console.log('Logged in');
                    console.log(this.currentUser$)
                    return user;
                }),
                catchError(this.handleError)
            );
    }
    
    getUserFromLocalStorage(): Observable<IUserIdentity>{

        const storedUser = localStorage.getItem(this.CURRENT_USER);
        let localUser;
        if(storedUser){
            localUser = JSON.parse(storedUser);
        } else{
            Logger.debug('No user in localstorage');
        }
        console.log(localUser.results._id);
        return of(localUser);
    }

    getUserIdFromLocalStorage(): string{
        const storedUser = localStorage.getItem(this.CURRENT_USER);
        let localUser;
        if(storedUser){
            localUser = JSON.parse(storedUser);
        } else{
            Logger.debug('No user in localstorage');
        }
        const userId = localUser.results._id;
        return userId;
    }

    getUserRoleFromLocalStorage(): string{
        const storedUser = localStorage.getItem(this.CURRENT_USER);
        let localUser;
        if(storedUser){
            localUser = JSON.parse(storedUser);
        } else{
            Logger.debug('No user in localstorage');
        }
        const userId = localUser.results.role;
        return userId;
    }

    private saveUserToLocalStorage(user: IUserIdentity): void{
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
    }

    public removeFromLocalStorage() : void{
        localStorage.removeItem(this.CURRENT_USER)
    }

    public userMayEdit(itemUserId: string) : Observable<boolean>{
        return this.currentUser$.pipe(
            map((user:IUserIdentity|undefined) =>(user ? user._id === itemUserId : false))
        )

    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in Authservice frontend', error);

        return throwError(() => new Error(error.message));
    }
}