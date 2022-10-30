import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterJobsComponent } from './filter-jobs/filter-jobs.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule, NgSelectModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavigationBarComponent,
    FilterJobsComponent,
  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavigationBarComponent, FilterJobsComponent],
})
export class ComponentsModule {}
