import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Doctors } from './pages/doctors/doctors';
import { Login } from './pages/login/login';
import { MyProfile } from './pages/my-profile/my-profile';
import { Appointment } from './pages/appointment/appointment';
import { MyAppointments } from './pages/my-appointments/my-appointments';
import { UserAuthGuard } from './services/auth/user-auth.guard';

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
      {
        path: 'my-profile',
        component: MyProfile,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'appointment/:docId',
        component: Appointment,
      },
      {
        path: 'my-appointments',
        component: MyAppointments,
        canActivate: [UserAuthGuard],
      },
    ],
  },
];
