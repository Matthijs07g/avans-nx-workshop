import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@fst/shared/util-env';

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
export class UserService{
     endpoint = environment.apiUrl;


    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IUser[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IUser[]>>(this.endpoint+'user', {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IUser> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<IUser>>(this.endpoint+'user/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public create(firstName: string, lastName: string, picture: string, emailadres: string, pass: string, birthdate: string): Observable<IUser>{
        console.log(`post ${this.endpoint}user`);
        return this.http
            .post<ApiResponse<IUser>>(this.endpoint+'user', {
                firstName, lastName, picture, emailadres, pass, birthdate
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            )
    }

    //Put Item
    public update(id:string | null, firstName: string | undefined, lastName: string | undefined, picture: string | undefined, emailadres: string | undefined, password: string | undefined, birthdate:string | undefined, role: string | undefined): Observable<IUser>{
        console.log(`put ${this.endpoint}user`);
        return this.http
            .put<ApiResponse<IUser>>(this.endpoint+'user/'+id, {
                firstName, lastName, picture, emailadres, password, birthdate, role
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            )
    }

    public delete(id: string| null, options?: any){
        console.log(`delete ${this.endpoint}user/${id}`)
        return this.http
            .delete<ApiResponse<IUser>>(this.endpoint+'user/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((respone: any) => respone.results as IUser),
                catchError(this.handleError)
            )
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}
