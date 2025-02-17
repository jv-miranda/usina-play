import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Section } from '../models/session';
import { FirebaseRequestsService } from './firebase-requests.service';
import { SectionsService } from './sections.service';

describe('Serviço de Sessões (SectionsService)', () => {
  let service: SectionsService;
  let firebaseRequestsServiceMock: jasmine.SpyObj<FirebaseRequestsService>;

  beforeEach(() => {
    firebaseRequestsServiceMock = jasmine.createSpyObj(
      'FirebaseRequestsService',
      ['getCollection']
    );

    TestBed.configureTestingModule({
      providers: [
        SectionsService,
        {
          provide: FirebaseRequestsService,
          useValue: firebaseRequestsServiceMock,
        },
      ],
    });

    service = TestBed.inject(SectionsService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar getCollection ao buscar sessões', () => {
    const mockSections: Section[] = [
      { id: '1', name: 'Treino A', items: [], new: true },
      { id: '2', name: 'Treino B', items: [], new: false },
    ];

    firebaseRequestsServiceMock.getCollection.and.returnValue(of(mockSections));

    service.getSessions().subscribe((sections) => {
      expect(sections.length).toBe(2);
      expect(sections[0].name).toBe('Treino A');
      expect(sections[1].name).toBe('Treino B');
    });

    expect(firebaseRequestsServiceMock.getCollection).toHaveBeenCalledWith(
      jasmine.any(String),
      jasmine.any(Function)
    );
  });
});
