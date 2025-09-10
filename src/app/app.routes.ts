import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Doctors } from './pages/doctors/doctors';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      {
        path: 'doctors',
        component: Doctors,
      },
      {
        path: 'doctors/:speciality',
        component: Doctors,
      },
      {
        path: 'login',
        component: Login,
      },
    ],
  },
];
