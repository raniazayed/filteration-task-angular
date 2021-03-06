import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './@Core/storage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Andalusia-task';

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  
    if (this.storageService.AppLang) {
      this.translateService.use(this.storageService.AppLang);
    } else {
      this.storageService.AppLang = 'en';
      console.log(this.storageService.AppLang);
      this.translateService.use('en');
    }
  }
}
