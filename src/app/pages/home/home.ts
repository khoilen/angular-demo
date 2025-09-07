import { Component } from '@angular/core';
import { Banner } from '../../components/banner/banner';
import { SpecialtyMenu } from '../../components/specialty-menu/specialty-menu';
import { Header } from '../../components/header/header';
import { TopDoctors } from '../../components/top-doctors/top-doctors';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [Banner, SpecialtyMenu, Header, TopDoctors],
  templateUrl: './home.html',
})
export class Home {
  constructor(private title: Title) {
    this.title.setTitle('Home - Doctor Booking App');
  }
}
