import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css'],
  imports: [],
})
export class NotFoundComponent implements OnInit {
  //injections
  router = inject(Router);
  location = inject(Location);

  constructor() {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
