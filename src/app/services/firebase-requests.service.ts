import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRequestsService {
  constructor(private afs: AngularFirestore, private injector: Injector) {}

  /**
   * Recupera uma coleção do Firestore como um Observable do tipo T[].
   *
   * @param collectionName - O nome da coleção no Firestore.
   * @param queryFn - Função de consulta opcional para filtrar ou ordenar a coleção.
   * @returns Um Observable que emite um array do tipo T.
   *
   */
  public getCollection<T>(
    collectionName: string,
    queryFn?: QueryFn
  ): Observable<T[]> {
    return runInInjectionContext(this.injector, () =>
      this.afs
        .collection<T>(collectionName, queryFn)
        .valueChanges({ idField: 'id' })
    );
  }
}
