import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IBlog } from '@avans-nx-workshop/shared/api';
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
export class BlogService{
     endpoint = environment.apiUrl;


    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IBlog[] | null> {
        console.log(`list ${this.endpoint}blog`);

        return this.http
            .get<ApiResponse<IBlog[]>>(this.endpoint+'blog', {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IBlog[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IBlog> {
        console.log(`read ${this.endpoint}blog/${id}`);
        return this.http
            .get<ApiResponse<IBlog>>(this.endpoint+'blog/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IBlog),
                catchError(this.handleError)
            );
    }

    //Post Item
    public create(name: string, location: string, length: number, mapIMG: string): Observable<IBlog>{
        console.log(`post ${this.endpoint}blog`);
        return this.http
            .post<ApiResponse<IBlog>>(this.endpoint+'blog', {
                name, location, length, mapIMG,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IBlog),
                catchError(this.handleError)
            )
    }

    //Put Item
    public update(_id:string | null, name: string | undefined, location: string | undefined, length: number | undefined, mapIMG: string | undefined): Observable<IBlog>{
        console.log(`put ${this.endpoint}blog${_id}`);
        return this.http
            .put<ApiResponse<IBlog>>(this.endpoint+'blog/'+_id, {
                name, location, length, mapIMG,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IBlog),
                catchError(this.handleError)
            )
    }

    public delete(id: string| null, options?: any){
        console.log(`delete ${this.endpoint}blog/${id}`)
        return this.http
            .delete<ApiResponse<IBlog>>(this.endpoint+'blog/'+id, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((respone: any) => respone.results as IBlog),
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
