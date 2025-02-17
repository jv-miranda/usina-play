import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { FirebaseRequestsService } from './firebase-requests.service';

describe('FirebaseRequestsService', () => {
  let service: FirebaseRequestsService;
  let firestoreMock: any;
  let injectorMock: Injector;

  beforeEach(() => {
    firestoreMock = {
      collection: jasmine.createSpy().and.returnValue({
        valueChanges: jasmine.createSpy().and.returnValue(of([])),
      }),
    };

    injectorMock = jasmine.createSpyObj('Injector', ['get']);

    TestBed.configureTestingModule({
      providers: [
        FirebaseRequestsService,
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: Injector, useValue: injectorMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    service = TestBed.inject(FirebaseRequestsService);
  });

  it('deve recuperar uma coleção do Firestore', () => {
    service.getCollection('testCollection').subscribe((data) => {
      expect(data).toEqual([]);
    });

    expect(firestoreMock.collection).toHaveBeenCalledWith(
      jasmine.any(String),
      undefined
    );
  });
});
