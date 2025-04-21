import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBlog, ICircuit, IDriver, ITeam, SubjectType } from '@avans-nx-workshop/shared/api';
import { BlogService } from '../blog.service';
import { CircuitService } from '../../circuit/circuit.service';
import { TeamService } from '../../team/team.service';
import { DriverService } from '../../driver/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnDestroy, OnInit {
  blog: IBlog | null = null;
  subscription: Subscription | undefined = undefined;
  _id: string | null = null;
  
  // For new blog
  title = '';
  subjectType: SubjectType = 'circuit';
  subjectId = '';
  content = '';

  // Lists for selection
  circuits: ICircuit[] = [];
  teams: ITeam[] = [];
  drivers: IDriver[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private circuitService: CircuitService,
    private teamService: TeamService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');
    
    if(this._id) {
      this.subscription = this.blogService.read(this._id).subscribe((results) => {
        this.blog = results;
        this.loadSubjects();
      });
    } else {
      this.loadSubjects();
    }
  }

  loadSubjects(): void {
    this.circuitService.list().subscribe(circuits => this.circuits = circuits || []);
    this.teamService.list().subscribe(teams => this.teams = teams || []);
    this.driverService.list().subscribe(drivers => this.drivers = drivers || []);
  }

  onSubjectTypeChange(): void {
    // Reset subject selection when type changes
    if (this.blog) {
      this.blog.subjectId = '';
    } else {
      this.subjectId = '';
    }
  }

  onSubmit(): void {
    if(this._id) {
      this.blogService.update(
        this._id,
        this.blog?.title,
        this.blog?.subjectType,
        this.blog?.subjectId,
        this.blog?.content
      ).subscribe(() => {
        this.router.navigate(['/blog/' + this._id]);
      });
    } else {
      this.blogService.create(
        this.title,
        this.subjectType,
        this.subjectId,
        this.content
      ).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}