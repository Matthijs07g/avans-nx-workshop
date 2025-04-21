import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CircuitService } from '../../circuit/circuit.service';
import { TeamService } from '../../team/team.service';
import { DriverService } from '../../driver/driver.service';

@Component({
  selector: 'avans-nx-workshop-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: IBlog[] | null = null;
  subscription: Subscription | undefined = undefined;
  subjectNames: Map<string, string> = new Map();

  constructor(
    private blogService: BlogService,
    public authService: AuthService,
    private circuitService: CircuitService,
    private teamService: TeamService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.subscription = this.blogService.list().subscribe((results) => {
      this.blogs = results;
      this.loadSubjectNames();
    });
  }

  loadSubjectNames(): void {
    this.blogs?.forEach(blog => {
      switch(blog.subjectType) {
        case 'circuit':
          this.circuitService.read(blog.subjectId).subscribe(
            circuit => this.subjectNames.set(blog._id, circuit.name)
          );
          break;
        case 'team':
          this.teamService.read(blog.subjectId).subscribe(
            team => this.subjectNames.set(blog._id, team.name)
          );
          break;
        case 'driver':
          this.driverService.read(blog.subjectId).subscribe(
            driver => this.subjectNames.set(blog._id, `${driver.firstName} ${driver.lastName}`)
          );
          break;
      }
    });
  }

  getSubjectName(blog: IBlog): string {
    return this.subjectNames.get(blog._id) || 'Loading...';
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}