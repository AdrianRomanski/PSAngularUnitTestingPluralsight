// import {ComponentFixture, TestBed} from "@angular/core/testing";
// import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from "@angular/core";
// import {of} from "rxjs";
// import {HeroesComponent} from "./heroes.component";
// import {HeroService} from "../hero.service";
// import {Hero} from "../hero";
// import {By} from "@angular/platform-browser";
//
// describe('HeroComponent (shallow tests)', () => {
//     let  fixture: ComponentFixture<HeroesComponent>;
//     let mockHeroService;
//     let HEROES;
//
//     //@ts-ignore
//     @Component({
//         selector: 'app-hero',
//         template: '<div></div>',
//     })
//     export class FakeHeroComponent {
//         @Input() hero: Hero;
//     }
//
//     beforeEach(() => {
//         HEROES = [
//             {id: 1, name: 'SpiderDude1', strength: 8},
//             {id: 2, name: 'SpiderDude2', strength: 18},
//             {id: 3, name: 'SpiderDude3', strength: 28},
//         ]
//         mockHeroService = jasmine.createSpyObj(
//             ['getHeroes', 'addHero', 'deleteHero']
//         )
//         TestBed.configureTestingModule({
//             declarations: [
//                 HeroesComponent,
//                 FakeHeroComponent
//             ],
//             providers: [
//                 {provide: HeroService, useValue: mockHeroService}
//             ],
//             schemas: [NO_ERRORS_SCHEMA]
//         });
//         fixture = TestBed.createComponent(HeroesComponent);
//     });
//
//     it('should set heroes correctly from the service', () => {
//         mockHeroService.getHeroes.and.returnValue(of(HEROES));
//         fixture.detectChanges();
//         expect(fixture.componentInstance.heroes.length).toBe(3);
//     })
//
//     it('should create one li for each hero', () => {
//         mockHeroService.getHeroes().and.returnValue(HEROES);
//         fixture.detectChanges();
//
//         expect(fixture.debugElement
//             .queryAll(By.css('li')).length).toBe(3);
//     })
// })
