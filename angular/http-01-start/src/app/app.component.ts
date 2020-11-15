import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private postService: PostService
    ) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
        this.isFetching = false;
      }
    );

    this.postService.errorOccur.subscribe(
      error => {
        this.error = error;
      }
    );
  }

  onCreatePost(postData: Post) {
    this.postService.storePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
        this.isFetching = false;
      }
    );
  }

  onClearPosts() {
    this.postService.clearPosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }

  onDismissError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
