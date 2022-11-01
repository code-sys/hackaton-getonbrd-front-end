import { Component, HostListener } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private themeService: ThemeService) {}

    //FOR INSTALL PWA BUTTON
    @HostListener('window:beforeinstallprompt', ['$event'])
    onBeforeInstallPrompt(e) {
        e.preventDefault();
        this.themeService.promptEvent = e;
    }
}
