import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {App} from './app/app';
import routeConfig from './app/routes';

bootstrapApplication(App, {
        providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));

