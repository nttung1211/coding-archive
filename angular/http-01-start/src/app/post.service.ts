import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {

  // if we have multiple components interested in an error we can use Subject
  errorOccur = new Subject<String>();

  constructor(
    private http: HttpClient
  ) { }

  storePost(postData: Post) {
    this.http
      .post<{ name: string }>(
        'https://myfirstproject-47bf0.firebaseio.com/posts.json', // when we add the 'posts.json' endpoint Firebase will create an folder named 'posts' to store our data if if does not exist (.json is just Firebase's rule ). The HttpClient will convert our js object to json data to send since normally we would have to send json data instead.
        postData,
        //we want the full response:
        {
          observe: 'response' // 'body' is default
        }
      )
      .subscribe(
        responseData => { // if we don't need to do anything in the subscribe() related to the component we use this service we can subcribe here since without subcribing http will send the request
        console.log(responseData);
        },
        error => {
          this.errorOccur.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://myfirstproject-47bf0.firebaseio.com/posts.json',
        // if we want to send header:
        {
          headers: new HttpHeaders({ 'Custom-header': 'hello' }),
          params: new HttpParams().set('print', 'pretty')
          //https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466364#questions
        }
      )
      .pipe(
        map(responseData => {
          const posts: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) { // so we will not access key from prototype
              posts.push({ id: key, ...responseData[key] })
            }
          }
          return posts;
        }),
        catchError(error => {
          // do somthing such as sending the error to a analytic server
          return throwError(error); // then wrap it back into an observable to pass to the subcribe method
          // https://blog.angular-university.io/rxjs-error-handling/
        })
        //? this is optional and we dont know the reason to use this yet
      )
  }

  clearPosts() {
    return this.http
      .delete(
        'https://myfirstproject-47bf0.firebaseio.com/posts.json',
        {
          observe: 'events',
          responseType: 'text' // ('json' is default) change the type of the body of the response
        }
        )
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log('request was sent');
          }
          if (event.type === HttpEventType.Response) {
            console.log('response has come');
          }
        })
        // here we do not have to return an observable since tap will not affect to the normal work, it just allow us do something we want with the value of response (here is 'event')
      );
  }
}