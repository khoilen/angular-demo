import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  constructor(private title: Title) {
    this.title.setTitle('Home - Doctor Booking App');
  }
}
