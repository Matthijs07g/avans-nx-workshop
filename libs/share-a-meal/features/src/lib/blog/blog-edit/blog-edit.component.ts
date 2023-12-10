import { Component } from '@angular/core';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriverService } from '../../driver/driver.service';
import { TeamService } from '../../team/team.service';
import { CircuitService } from '../../circuit/circuit.service';

@Component({
  selector: 'avans-nx-workshop-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent {
  
  blog: IBlog | null = null;
  subscription: Subscription | undefined = undefined;
  _id: string | null = null;
  title = '';
  subject= '';
  content = '';
  

  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService,){}

  ngOnInit(): void {
    
    this._id = this.route.snapshot.paramMap.get('id');
    console.log(this._id)
    if(this._id != null){
      console.log(this._id)
      this.subscription = this.blogService.read(this._id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.blog = results;
      });
    }
  }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

  onSubmit(): void {
    this._id = this.route.snapshot.paramMap.get('id');
    if(this._id == null){
        this.blogService.create(this.title, this.subject, this.content).subscribe((results) =>{
          console.log(`result: ${results}`);
          this.blog = results;
          this.router.navigate(['/blog']);
        })
    }else if(this._id !=null){
      this.blogService.update(this._id, this.blog?.title, this.blog?.subject, this.blog?.content).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.router.navigate(['/blog/'+this._id]);
      })
      
    }
}
}
