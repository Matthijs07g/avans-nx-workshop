import { Component } from '@angular/core';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent {
  blog: IBlog | null = null;
  subscription: Subscription | undefined = undefined;
  id: string | null = null;
  
  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService, public authService: AuthService){}
  
  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.subscription = this.blogService.read(this.id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.blog = results;
  
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  
  del() : void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.blogService.delete(this.id).subscribe((results) => {
      console.log(`result: ${results}`);
      this.router.navigate(['blog'])
    })
  }
}
