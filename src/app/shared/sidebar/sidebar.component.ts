import { Component, OnInit } from '@angular/core';
import { ROUTES } from 'src/app/common/menuItems';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    menuItems: any[] = ROUTES;
    constructor(private themeService: ThemeService) {}

    ngOnInit() {}

    onSwipe(event: Event) {
        event.preventDefault();
        this.themeService.setSwipeBar(false);
    }
}
