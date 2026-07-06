import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Reader paths
  {
    path: '',
    loadComponent: () => import('./features/reader/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'novel/:slug',
    loadComponent: () => import('./features/reader/detail/detail.component').then(m => m.DetailComponent)
  },
  {
    path: 'novel/:slug/oku/:chapterNumber',
    loadComponent: () => import('./features/reader/reader/reader.component').then(m => m.ReaderComponent)
  },
  
  // Admin paths
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin/novel/:slug/chapters',
    loadComponent: () => import('./features/admin/chapter-manage/chapter-manage.component').then(m => m.ChapterManageComponent),
    canActivate: [authGuard]
  },
  
  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
