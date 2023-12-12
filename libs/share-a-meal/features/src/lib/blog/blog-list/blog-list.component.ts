import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: IBlog[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private blogService: BlogService, public authService: AuthService) {}

  ngOnInit(): void {
      this.subscription = this.blogService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.blogs = results;
        });
    }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
