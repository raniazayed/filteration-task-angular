import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentActive = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkURL();
  }

  private checkURL() {
    this.setActiveTab(this.router.url);

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.setActiveTab(e.urlAfterRedirects);
      }
    });
  }

  private setActiveTab(URL: string) {
    if (URL === '/layout/search-employee') {
      this.currentActive = 0;
    } else {
      this.currentActive = 1;
    }
  }
}
