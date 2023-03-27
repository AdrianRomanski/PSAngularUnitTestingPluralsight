import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Directive, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {HeroComponent} from "../hero/hero.component";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;

    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }

}

describe('HeroComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
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
                HeroComponent,
                RouterLinkDirectiveStub
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

        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentsDEs.length).toEqual(3);
        expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual('SpiderDude1');
    })

    it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement
            .queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', {
                stopPropagation: () => {
                }
            });
        expect(fixture.componentInstance.delete)
            .toHaveBeenCalledWith(HEROES[0]);
    })

    it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement
            .queryAll(By.directive(HeroComponent));
        // let heroComponentInstance: HeroComponent = heroComponents[0].componentInstance;
        //
        // heroComponentInstance.delete.emit(undefined);

        heroComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete)
            .toHaveBeenCalledWith(HEROES[0]);
    })

    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
        const name = 'Mr. Ice';
        mockHeroService.addHero.and.returnValue(
            of({id: 5, name: name, strength: 15}));

        const inputElement = fixture.debugElement
            .query(By.css('input'))
            .nativeElement;

        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;

        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    })

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement
            .queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a'))
            .triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })
});
