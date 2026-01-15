import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, throwIfEmpty } from 'rxjs/operators';
import { ApiResponse, IDriver, ITeam } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { TeamService } from '../team/team.service';

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
export class DriverService{
     endpoint = environment.apiUrl;


    constructor(private readonly http: HttpClient, private teamService: TeamService) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IDriver[] | null> {
        console.log(`list ${this.endpoint}driver`);

        return this.http
            .get<ApiResponse<IDriver[]>>(this.endpoint+'driver', {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IDriver[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IDriver> {
        console.log(`read ${this.endpoint}driver/${id} frontend`);
        return this.http
            .get<ApiResponse<IDriver>>(this.endpoint+'driver/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IDriver),
                catchError(this.handleError)
            );
    }

    //Post Item
    public create(firstName: string, lastName: string, country: string, birthdate: string, team: ITeam, racewins: number, champion: number, timeActive: string, picture: string): Observable<IDriver>{
        console.log(`post ${this.endpoint}driver frontend`);

        return this.http
            .post<ApiResponse<IDriver>>(this.endpoint+'driver', {
                firstName, lastName, country, birthdate, team, racewins, champion, timeActive, picture
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IDriver),
                catchError(this.handleError)
            )
    }

    //Put Item
    public update(_id:string | null, firstName: string | undefined, lastName: string | undefined, country: string | undefined, birthdate: string | undefined, team: ITeam | undefined, racewins: number | undefined, champion: number | undefined, timeActive: string | undefined, picture: string | undefined): Observable<IDriver>{
        console.log(`put ${this.endpoint}driver/${_id}  frontend`);

        return this.http
            .put<ApiResponse<IDriver>>(this.endpoint+'driver/'+_id, {
                firstName, lastName, country, birthdate, team, racewins, champion, timeActive,  picture
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IDriver),
                catchError(this.handleError)
            )
    }

    public delete(id: string| null, options?: any){
        console.log(`delete ${this.endpoint}driver/${id}`)
        return this.http
            .delete<ApiResponse<IDriver>>(this.endpoint+'driver/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((respone: any) => respone.results as IDriver),
                catchError(this.handleError)
            )
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in DriverService', error);

        return throwError(() => new Error(error.message));
    }
}
