import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Directive, Input} from "@angular/core";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRoute ={
            snapshot: {paramMap: {get: () => { return '3'}}}
        };

        mockHeroService = jasmine.createSpyObj(
            ['getHero', 'updateHero']);

        mockLocation = jasmine.createSpyObj(['back'])

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation}
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'Super Dude', strength: 100}));
    });

    it('should render hero name in h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent)
            .toContain('SUPER DUDE Details');

    })

    it('should call updateHero when save is called', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        // tick(250);
        flush();
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

})
