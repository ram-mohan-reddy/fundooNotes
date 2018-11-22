import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  data;
  routeParams;
  constructor( private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.data;
    this.routeParams = this.activatedRoute.snapshot.queryParams;
  }

}
