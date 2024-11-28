import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./passwordrecovery/passwordrecovery.module').then(m => m.PasswordrecoveryPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'main-page',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPagePageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./update-password/update-password.module').then(m => m.UpdatePasswordPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosPageModule)
  },
  {
    path: 'pagina-curso/:id',
    loadChildren: () => import('./pagina-curso/pagina-curso.module').then(m => m.PaginaCursoPageModule)
  },
  {
    path: 'main-estudiante',
    loadChildren: () => import('./main-estudiante/main-estudiante.module').then(m => m.MainEstudiantePageModule)
  },
  {
    path: 'pagina-qr/:id', // Ruta con parámetro 'id' para mostrar el QR
    loadChildren: () => import('./pagina-qr/pagina-qr.module').then(m => m.PaginaQrPageModule)
  },
  {
    path: 'curso-estudiante/:id',
    loadChildren: () => import('./curso-estudiante/curso-estudiante.module').then( m => m.CursoEstudiantePageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
