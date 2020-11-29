import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';

@Component({
  selector: 'app-lembrete-inserir',
  templateUrl: './lembrete-inserir.component.html',
  styleUrls: ['./lembrete-inserir.component.css'],
})
export class LembreteInserirComponent implements OnInit {
  private modo: string = 'criar';
  private idLembrete: string;
  public lembrete: Lembrete;
  public estaCarregando: boolean = false;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null, {
        validators: [Validators.required],
      }),
      descricao: new FormControl(null, {}),
      datareal: new FormControl(null, {
        validators: [Validators.required],
      }),
      datacad: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLembrete')) {
        this.modo = 'editar';
        this.idLembrete = paramMap.get('idLembrete');
        this.estaCarregando = true;
        this.lembreteService
          .getLembrete(this.idLembrete)
          .subscribe((dadosCli) => {
            this.estaCarregando = false;
            this.lembrete = {
              id: dadosCli._id,
              titulo: dadosCli.titulo,
              descricao: dadosCli.descricao,
              datareal: dadosCli.datareal,
              datacad: dadosCli.datacad,
            };
            this.form.setValue({
              titulo: this.lembrete.titulo,
              descricao: this.lembrete.descricao,
              datareal: this.lembrete.datareal,
              datacad: this.lembrete.datacad,
            });
          });
      } else {
        this.modo = 'criar';
        this.idLembrete = null;
      }
    });
  }

  constructor(
    public lembreteService: LembreteService,
    public route: ActivatedRoute
  ) {}

  onSalvarLembrete() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === 'criar') {
      this.lembreteService.adicionarLembrete(
        this.form.value.titulo,
        this.form.value.descricao,
        this.form.value.datareal,
        this.form.value.datacad
      );
    } else {
      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        this.form.value.titulo,
        this.form.value.descricao,
        this.form.value.datareal,
        this.form.value.datacad
      );
    }
    this.form.reset();
  }
}
