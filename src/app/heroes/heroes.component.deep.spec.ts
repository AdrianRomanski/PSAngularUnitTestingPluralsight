import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {HeroComponent} from "../hero/hero.component";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('HeroComponent (deep tests)', () => {
    let  fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude1', strength: 8},
            {id: 2, name: 'SpiderDude2', strength: 18},
            {id: 3, name: 'SpiderDude3', strength: 28},
        ]
        mockHeroService = jasmine.createSpyObj(
            ['getHeroes', 'addHero', 'deleteHero']
        )
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
    });

    it('should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of([HEROES]));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentsDEs =fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentsDEs.length).toEqual(3);
        expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual('SpiderDude1');
    })
})
