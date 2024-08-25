import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SortInfoModule } from '../shared/components/sort-info/sort-info.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortInfoModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [SharedModule],
  providers: []
})
export class LoginModule { }
