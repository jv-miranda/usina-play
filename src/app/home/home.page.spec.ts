import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Section } from '../models/session';
import { SectionsService } from '../services/sections.service';
import { HomePage } from './home.page';

describe('Página Inicial (HomePage)', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let sectionsServiceMock: jasmine.SpyObj<SectionsService>;

  beforeEach(async () => {
    sectionsServiceMock = jasmine.createSpyObj('SectionsService', [
      'getSessions',
    ]);

    const mockSections: Section[] = [
      { id: '1', name: 'Treino A', items: [], new: true },
      { id: '2', name: 'Treino B', items: [], new: false },
    ];

    sectionsServiceMock.getSessions.and.returnValue(of(mockSections));

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: SectionsService, useValue: sectionsServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar getSessions ao iniciar', () => {
    expect(sectionsServiceMock.getSessions).toHaveBeenCalled();
  });

  it('deve popular sections com os dados do serviço', (done) => {
    component.sections.subscribe((sections) => {
      expect(sections.length).toBe(2);
      expect(sections[0].name).toBe('Treino A');
      expect(sections[1].name).toBe('Treino B');
      done();
    });
  });
});
