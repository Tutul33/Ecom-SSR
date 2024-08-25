import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default.component'; 


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      // { path: '', redirectTo:'ECM/home', pathMatch: 'full' },
      // { path: 'home', redirectTo:'ECM/home', pathMatch: 'full' },
      // { path: 'food-menu', redirectTo:'ECM/food-menu', pathMatch: 'full' },
      // { path: 'cart', redirectTo:'ECM/cart', pathMatch: 'full' },
      // { path: 'customize', redirectTo:'ECM/customize', pathMatch: 'full' },
      // { path: 'checkout', redirectTo:'ECM/checkout', pathMatch: 'full' },
      // { path: 'address', redirectTo:'ECM/address', pathMatch: 'full' },
      // { path: 'success', redirectTo:'ECM/success', pathMatch: 'full' },
      // { path: 'orders', redirectTo:'ECM/orders', pathMatch: 'full' },
      // { path: 'loader', redirectTo:'ECM/loader', pathMatch: 'full' },
      // { path: 'profile', redirectTo:'ECM/profile', pathMatch: 'full' },
      // { path: 'edit-profile', redirectTo:'ECM/edit-profile', pathMatch: 'full' },
      {
        path: '', data: null,
        loadChildren: () =>
          import('./ecm/ecm.module').then((m) => m.EcmModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
