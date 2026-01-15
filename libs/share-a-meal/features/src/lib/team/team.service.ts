import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ITeam } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';

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
export class TeamService{
     endpoint = environment.apiUrl;


    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<ITeam[] | null> {
        console.log(`list ${this.endpoint}team`);

        return this.http
            .get<ApiResponse<ITeam[]>>(this.endpoint+'team', {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as ITeam[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<ITeam> {
        console.log(`read ${this.endpoint}team/${id}`);
        return this.http
            .get<ApiResponse<ITeam>>(this.endpoint+'team/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ITeam),
                catchError(this.handleError)
            );
    }

    //Post Item
    public create(name: string, owner: string, country: string, constructor_champions: number, iconImg: string, dateFounded: string): Observable<ITeam>{
        console.log(`post ${this.endpoint}team`);
        return this.http
            .post<ApiResponse<ITeam>>(this.endpoint+'team', {
                name, owner, country, constructor_champions, dateFounded, iconImg
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ITeam),
                catchError(this.handleError)
            )
    }

    //Put Item
    public update(_id:string | null, name: string | undefined, owner: string | undefined, country: string | undefined, constructor_champions: number | undefined, dateFounded: string | undefined, iconImg: string | undefined): Observable<ITeam>{
        console.log(`put ${this.endpoint}team/${_id}`);
        return this.http
            .put<ApiResponse<ITeam>>(this.endpoint+'team/'+_id, {
                name, owner, country, constructor_champions, dateFounded, iconImg
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ITeam),
                catchError(this.handleError)
            )
    }

    public delete(id: string| null, options?: any){
        console.log(`delete ${this.endpoint}team/${id}`)
        return this.http
            .delete<ApiResponse<ITeam>>(this.endpoint+'team/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((respone: any) => respone.results as ITeam),
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
