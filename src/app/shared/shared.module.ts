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
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JobsListCardsComponent } from './jobs-list-cards/jobs-list-cards.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        ReactiveFormsModule,
        NgSelectModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NavigationBarComponent,
        FilterJobsComponent,
        JobsDetailComponent,
        JobsListCardsComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NavigationBarComponent,
        FilterJobsComponent,
        JobsDetailComponent,
        JobsListCardsComponent,
    ],
})
export class SharedModule {}
