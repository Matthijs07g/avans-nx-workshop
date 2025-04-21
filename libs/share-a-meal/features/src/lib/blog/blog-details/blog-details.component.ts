import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { BlogService } from '../blog.service';
import { CircuitService } from '../../circuit/circuit.service';
import { TeamService } from '../../team/team.service';
import { DriverService } from '../../driver/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnDestroy, OnInit {
  blog: IBlog | null = null;
  subscription: Subscription | undefined = undefined;
  id: string | null = null;
  subjectName: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private circuitService: CircuitService,
    private teamService: TeamService,
    private driverService: DriverService,
    public authService: AuthService
  ){}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.blogService.read(this.id).subscribe((results) => {
      this.blog = results;
      this.loadSubjectName();
    });
  }

  loadSubjectName(): void {
    if (!this.blog) return;

    switch(this.blog.subjectType) {
      case 'circuit':
        this.circuitService.read(this.blog.subjectId).subscribe(
          circuit => this.subjectName = circuit.name
        );
        break;
      case 'team':
        this.teamService.read(this.blog.subjectId).subscribe(
          team => this.subjectName = team.name
        );
        break;
      case 'driver':
        this.driverService.read(this.blog.subjectId).subscribe(
          driver => this.subjectName = `${driver.firstName} ${driver.lastName}`
        );
        break;
    }
  }

  del(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.blogService.delete(this.id).subscribe(() => {
      this.router.navigate(['blog'])
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}