import { Component }       from '@angular/core';
import {HeroService} from './shared/hero/hero.service';
import { HeroesComponent } from './heroes.component';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <a [routerLink]="['/heroes']">Heroes</a>
    <router-outlet></router-outlet>
  `,

  providers:  [HeroService],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/heroes',        component: HeroesComponent},
  // {path: '/hero/:id',      component: HeroDetailComponent}
])
export class AppComponent {
  title = 'Tour of Heroes';
}
