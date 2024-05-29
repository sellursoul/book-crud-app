import { Routes } from '@angular/router';
import { AppRoutes } from './app-routes.enum';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppRoutes.BOOKS },
  {
    path: AppRoutes.BOOKS,
    loadChildren: () =>
      import('./pages/books/books.routes').then((m) => m.BOOKS_ROUTES),
  },
  { path: '**', pathMatch: 'full', redirectTo: AppRoutes.BOOKS },
];
