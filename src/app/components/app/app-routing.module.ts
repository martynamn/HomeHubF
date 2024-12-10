import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { authorities: [], isRootPath: false },
      },
      {
        path: 'property',
        loadChildren: () => import('../../modules/property/property.module').then(m => m.PropertyModule),
        data: { authorities: [], isRootPath: false },
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/profile/profile.module').then(m => m.ProfileModule),
        data: { authorities: [], isRootPath: false },
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

