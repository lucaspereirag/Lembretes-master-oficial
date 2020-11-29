import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { LembreteListaComponent } from './lembrete-lista/lembrete-lista.component';
import { LembreteInserirComponent } from './lembrete-inserir/lembrete-inserir.component';

const routes: Routes = [
  { path: '', component: LembreteListaComponent },
  { path: 'criar', component: LembreteInserirComponent },
  { path: 'editar/:idLembrete', component: LembreteInserirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
