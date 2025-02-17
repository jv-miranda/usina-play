import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Section } from '../models/session';
import { FirebaseRequestsService } from './firebase-requests.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private firebaseRequestsService: FirebaseRequestsService) {}

  /**
   * Obtém a lista de sessões do Firestore, ordenadas pelo nome em ordem crescente.
   *
   * @returns Um Observable contendo um array de objetos do tipo Section.
   */
  getSessions(): Observable<Section[]> {
    return this.firebaseRequestsService.getCollection<Section>(
      environment.firebaseDatabasePaths.collections.sessions,
      (ref) => ref.orderBy('name', 'asc')
    );
  }
}
