import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { slideInAnimation } from '../../common/animations/router-animations';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
    animations: [slideInAnimation],
})
export class AuthLayoutComponent implements OnInit {
    constructor(
        private themeService: ThemeService,
        private renderer: Renderer2,
        private contexts: ChildrenOutletContexts
    ) {}

    ngOnInit(): void {
        this.themeService.theme.subscribe({
            next: (res) => {
                if (res) {
                    this.renderer.removeClass(document.body, 'white-content');
                } else {
                    this.renderer.addClass(document.body, 'white-content');
                }
            },
        });
    }

    getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
}
