import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/@Core/storage-service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  locale: string;

  currentDate = new Date();

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.locale = this.translateService.currentLang;

    this.onLangChange();
  }

  private onLangChange(): void {
    this.translateService.onLangChange.subscribe(langObj => {
      this.locale = langObj.lang;
      this.storageService.AppLang = langObj.lang;

      this.changeLayoutDirection();
    });
  }

  private changeLayoutDirection(): void {
    if (this.locale === 'ar') {
      document.getElementsByTagName('body')[0].className = 'ar rtl';
    } else {
      document.getElementsByTagName('body')[0].className = 'en';
    }
  }

  changeLang(lang): void {
    this.locale = lang;
    this.storageService.AppLang = this.locale;
    console.log(this.locale);
    this.translateService.use(lang);

    // if (this.locale === 'ar') {
    //   this.translateService.use('en');
    // } else {
    //   this.translateService.use('ar');
    // }
  }
}
