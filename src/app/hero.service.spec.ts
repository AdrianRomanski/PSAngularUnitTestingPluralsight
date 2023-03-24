import {inject, TestBed} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;
    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        })

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        it('should call get with the correct url',
            () => {
            // call getHero()
            let hero = service.getHero(4).subscribe();
            // tes that the URL was correct

            let testRequest = httpTestingController.expectOne('api/heroes/4');

            testRequest.flush({id: 4, name: 'Super Dude', strength: 100})
            expect(testRequest.request.method).toBe('GET');
            httpTestingController.verify();
        })
    });
})
