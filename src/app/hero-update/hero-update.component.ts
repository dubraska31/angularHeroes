import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-update',
  templateUrl: './hero-update.component.html',
  styleUrls: ['./hero-update.component.css']
})
export class HeroUpdateComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  updateHero(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
