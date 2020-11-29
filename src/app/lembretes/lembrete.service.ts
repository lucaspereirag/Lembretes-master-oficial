import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lembrete } from './lembrete.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LembreteService {
  private lembretes: Lembrete[] = [];

  private listaLembretesAtualizada = new Subject<Lembrete[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getLembretes(): void {
    this.httpClient
      .get<{ mensagem: string; lembretes: any }>(
        'http://localhost:3000/api/lembretes'
      )
      .pipe(
        map((dados) => {
          return dados.lembretes.map((lembrete) => {
            return {
              id: lembrete._id,
              titulo: lembrete.titulo,
              descricao: lembrete.descricao,
              datareal: lembrete.datareal,
              datacad: lembrete.datacad,
            };
          });
        })
      )
      .subscribe((lembretes) => {
        this.lembretes = lembretes;
        this.listaLembretesAtualizada.next([...this.lembretes]);
      });
  }

  adicionarLembrete(
    titulo: string,
    descricao: string,
    datareal: string,
    datacad: string
  ) {
    const lembrete: Lembrete = {
      id: null,
      titulo: titulo,
      descricao: descricao,
      datareal: datareal,
      datacad: datacad,
    };

    this.httpClient
      .post<{ mensagem: string; id: string }>(
        'http://localhost:3000/api/lembretes',
        lembrete
      )
      .subscribe((dados) => {
        lembrete.id = dados.id;
        this.lembretes.push(lembrete);
        this.listaLembretesAtualizada.next([...this.lembretes]);
        this.router.navigate(['/']);
      });
  }

  removerLembrete(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/lembretes/${id}`)
      .subscribe(() => {
        this.lembretes = this.lembretes.filter((cli) => {
          return cli.id !== id;
        });
        this.listaLembretesAtualizada.next([...this.lembretes]);
      });
  }

  getListaLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }

  getLembrete(idLembrete: string) {
    //return { ...this.lembretes.find((cli) => cli.id === idLembrete) };
    return this.httpClient.get<{
      _id: string;
      titulo: string;
      descricao: string;
      datareal: string;
      datacad: string;
    }>(`http://localhost:3000/api/lembretes/${idLembrete}`);
  }

  atualizarLembrete(
    id: string,
    titulo: string,
    descricao: string,
    datareal: string,
    datacad: string
  ) {
    const lembrete: Lembrete = { id, titulo, descricao, datareal, datacad };
    this.httpClient
      .put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
      .subscribe((res) => {
        const copia = [...this.lembretes];
        const indice = copia.findIndex((cli) => cli.id === lembrete.id);
        copia[indice] = lembrete;
        this.lembretes = copia;
        this.listaLembretesAtualizada.next([...this.lembretes]);
        this.router.navigate(['/']);
      });
  }
}
