import { Component, Input, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  @Input() hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.hero = new Hero();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  saveHero(): void {
    this.heroService.saveHero(this.hero).subscribe(hero => { this.heroes.push(hero); });

    this.hero.name = '';
    this.hero.surname = ''
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}