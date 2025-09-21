import { RenderMode, ServerRoute } from '@angular/ssr';
import doctors from './data/doctors.json';
import { Doctor } from './types/doctor';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'appointment/:docId',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return (doctors as Doctor[]).map((doc) => ({ docId: doc._id }));
    },
  },
  {
    path: 'doctors/:speciality',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return (doctors as Doctor[]).map((doc) => ({
        speciality: doc.speciality.toLocaleLowerCase(),
      }));
    },
  },
];
