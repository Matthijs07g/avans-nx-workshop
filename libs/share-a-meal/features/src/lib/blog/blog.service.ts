import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, elementAt } from 'rxjs/operators';
import { ApiResponse, IBlog, IUser, IUserIdentity, SubjectType } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@fst/shared/util-env';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

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
     loggedUser: IUser | null = null


    constructor(private readonly http: HttpClient, private authService: AuthService) {}

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
    public create(title: string, subjectType: SubjectType, subjectId:string, content: string): Observable<IBlog>{
        console.log(`post ${this.endpoint}blog`);

        const owner= this.authService.getUserIdFromLocalStorage()
        
        // const today = new Date();
        // const dd: string | number = today.getDate();
        // const mm: string | number = today.getMonth() + 1;
        // const yyyy: number = today.getFullYear();

        // const formattedDay: string = dd < 10 ? `0${dd}` : `${dd}`;
        // const formattedMonth: string = mm < 10 ? `0${mm}` : `${mm}`;
        // const formattedDate = `${formattedDay}-${formattedMonth}-${yyyy}`;

        const datePosted = new Date().toLocaleDateString('nl-NL')
        console.log('Sending blog data:', {owner, title, subjectType, subjectId, content, datePosted});
        return this.http
            .post<ApiResponse<IBlog>>(this.endpoint+'blog', {
                owner, title, subjectType, subjectId, content, datePosted
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IBlog),
                catchError(this.handleError)
            )
    }

    //Put Item
    public update(_id:string | null, title: string | undefined, subjectType: SubjectType | undefined, subjectId: string | undefined, content: string | undefined): Observable<IBlog>{
        console.log(`put ${this.endpoint}blog${_id}`);
        return this.http
            .put<ApiResponse<IBlog>>(this.endpoint+'blog/'+_id, {
                title, subjectType, subjectId, content
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
