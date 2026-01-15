import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICircuit } from '@avans-nx-workshop/shared/api';
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
export class CircuitService{
     endpoint = environment.apiUrl;


    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<ICircuit[] | null> {
        console.log(`list ${this.endpoint}circuit`);

        return this.http
            .get<ApiResponse<ICircuit[]>>(this.endpoint+'circuit', {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as ICircuit[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<ICircuit> {
        console.log(`read ${this.endpoint}circuit/${id}`);
        return this.http
            .get<ApiResponse<ICircuit>>(this.endpoint+'circuit/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ICircuit),
                catchError(this.handleError)
            );
    }

    //Post Item
    public create(name: string, location: string, length: number, mapIMG: string): Observable<ICircuit>{
        console.log(`post ${this.endpoint}circuit`);
        return this.http
            .post<ApiResponse<ICircuit>>(this.endpoint+'circuit', {
                name, location, length, mapIMG,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ICircuit),
                catchError(this.handleError)
            )
    }

    //Put Item
    public update(_id:string | null, name: string | undefined, location: string | undefined, length: number | undefined, mapIMG: string | undefined): Observable<ICircuit>{
        console.log(`put ${this.endpoint}circuit${_id}`);
        return this.http
            .put<ApiResponse<ICircuit>>(this.endpoint+'circuit/'+_id, {
                name, location, length, mapIMG,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ICircuit),
                catchError(this.handleError)
            )
    }

    public delete(id: string| null, options?: any){
        console.log(`delete ${this.endpoint}circuit/${id}`)
        return this.http
            .delete<ApiResponse<ICircuit>>(this.endpoint+'circuit/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((respone: any) => respone.results as ICircuit),
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
