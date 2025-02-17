import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../models/session';
import { SectionsService } from '../services/sections.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  sections!: Observable<Section[]>;

  constructor(private sectionsService: SectionsService) {}

  /**
   * Método de inicialização do componente.
   * Obtém a lista de sessões através do serviço SectionsService.
   */
  ngOnInit() {
    this.sections = this.sectionsService.getSessions();
  }
}
