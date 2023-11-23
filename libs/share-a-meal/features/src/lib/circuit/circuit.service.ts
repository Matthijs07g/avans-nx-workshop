import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICircuit } from '@avans-nx-workshop/shared/api';
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
export class CircuitService{
     endpoint = environment.apiUrl;


    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<ICircuit[] | null> {
        console.log(`list ${this.endpoint}`);

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
        console.log(`read ${this.endpoint}/${id}`);
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

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}
