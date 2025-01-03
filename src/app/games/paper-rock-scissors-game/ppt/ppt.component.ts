import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../classes/jugador';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JuegoPiedraPapelTijera } from '../../../classes/juego-piedra-papel-tijera';
import { LocalStorage } from '../../../classes/helpers/local-storage';
import { DateTimeHelper } from '../../../classes/helpers/date-time';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../../../components/modal-preguntas/modal-preguntas.component';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('animacion', [
      state('estado1', style({ opacity: 1 })),
      state('estado2', style({ opacity: 0.5 })),
      transition('estado1 <=> estado2', animate('300ms ease-in-out')),
    ]),
  ]
})
export class PptComponent implements OnInit {
  public readonly pathsPPT: string[] = [
    './assets/imagenes/piedra2.jpg',
    './assets/imagenes/papel2.jpg',
    './assets/imagenes/tijera2.jpg',
    './assets/imagenes/piedra.jpg',
    './assets/imagenes/papel.jpg',
    './assets/imagenes/tijera.jpg',
  ];

  public pathContrincante: string = this.pathsPPT[0];
  public pathUsuario: string = this.pathsPPT[3];
  public tiempoAnimacion: number = 6;
  public seleccionContrincante: string = '';
  public seleccionJugador: string = '';
  public seleccionadoPorJugador: string = '';
  public jugador: Jugador;
  public estadoAnimJugada: string = 'estado1';
  public valorSeleccionado: string = 'piedra';
  public imageBackground: string = '';
  public mensajes: string = '';
  public juegoTerminado: boolean = false;
  public seleccionoOpcion: boolean = false;
  public esEmpate: boolean = false;
  public deshabilitar: boolean = false;
  public toastMessage: string = '';
  public toastType: string = 'text-bg-success';

  private audio = new Audio();
  private intervalId: any;
  private nuevoJuego: JuegoPiedraPapelTijera;

  constructor(private modalService: NgbModal) {
    this.jugador = this.inicializarJugador();
    this.nuevoJuego = this.inicializarJuego();
  }

  ngOnInit(): void {}

  private inicializarJugador(): Jugador {
    //@ts-ignore
    // if(localStorage.getItem("usuarioLogueado")!=null){
    //   //@ts-ignore
      
    // } 
    const usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    // const usuarioLocalStorage = LocalStorage.obtenerUsuarioLogueado();

    if (!usuarioLocalStorage) {
      throw new Error('No se encontró un usuario logueado en el LocalStorage.');
    }

    return new Jugador(
      usuarioLocalStorage.nombre,
      usuarioLocalStorage.mail,
      usuarioLocalStorage.clave,
      usuarioLocalStorage.sexo,
      'Piedra Papel o Tijera',
      usuarioLocalStorage.puntosTotalesAcum,
      usuarioLocalStorage.fechaActualizacion
    );
  }

  private inicializarJuego(): JuegoPiedraPapelTijera {
    const juego = new JuegoPiedraPapelTijera();
    juego.jugador = this.jugador.mail;
    juego.nombre = 'Piedra Papel o Tijera';
    return juego;
  }

  public seleccionJugadaJugador(jugada: string): void {
    const jugadaMap: Record<string, number> = {
      piedra: 3,
      papel: 4,
      tijera: 5,
    };

    this.seleccionJugador = this.pathsPPT[jugadaMap[jugada]];
    this.seleccionadoPorJugador = jugada;
    this.deseleccionarOtrosBotones(['piedra', 'papel', 'tijera'].filter((j) => j !== jugada));
    this.marcarBotonSeleccionado(jugada);
    this.seleccionoOpcion = true;
  }

  public mostrarAyuda(): void {
    this.openModal(
      ['1) Haga click en una imagen (Seleccione su Jugada)', '2) Click en Comenzar'],
      'OBJETIVO: El juego terminará cuando se le acaben las 3 vidas o gane 3 puntos.',
      './assets/imagenes/ppt-help.jpg'
    );
  }

  private openModal(reglas: string[], mensaje: string, urlImg: string): void {
    const modalRef = this.modalService.open(ModalPreguntasComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.listaReglas = reglas;
    modalRef.componentInstance.imgAyuda = urlImg;
  }

  private deseleccionarOtrosBotones(botones: string[]): void {
    botones.forEach((boton) => {
      const btnElement = document.getElementById(boton);
      if (btnElement) btnElement.className = 'btnJ';
    });
  }

  private marcarBotonSeleccionado(boton: string): void {
    const btnElement = document.getElementById(boton);
    if (btnElement) btnElement.className = 'btnSeleccionado';
  }

  public comenzar(): void {
    if (!this.seleccionoOpcion) {
      this.showToast('Selecciona una opción', 'warning');
      return;
    }

    this.deshabilitar = true;
    this.intervalId = setInterval(() => {
      this.tiempoAnimacion--;
      this.estadoAnimJugada =
        this.estadoAnimJugada === 'estado1' ? 'estado2' : 'estado1';

      if (this.tiempoAnimacion === 0) {
        clearInterval(this.intervalId);
        this.estadoAnimJugada = 'estado1';
        this.seleccionJugadaContrincante();
        this.pathUsuario = this.seleccionJugador;
        this.verificarEstadoDeLaJugada();
        this.resetEstadoPostRonda();
      }
    }, 550);
  }

  private seleccionJugadaContrincante(): void {
    const randomNum = Math.floor(Math.random() * 3);
    this.seleccionContrincante = ['piedra', 'papel', 'tijera'][randomNum];
    this.pathContrincante = this.pathsPPT[randomNum];
  }

  private verificarEstadoDeLaJugada(): void {
    const esGanadaLaRonda = this.ganaLaRonda();

    if (esGanadaLaRonda && !this.esEmpate) {
      this.jugador.puntos++;
      this.showToast('¡Suertudo!', 'success');
    } else if (!esGanadaLaRonda && !this.esEmpate) {
      this.jugador.vidas--;
      this.showToast('¡Esta ronda es mía!', 'error');
    } else if (this.esEmpate) {
      this.showToast('¡Empate!', 'warning');
    }

    if (this.esJuegoTerminado()) {
      this.terminarJuego(esGanadaLaRonda);
    }
  }

  private resetEstadoPostRonda(): void {
    this.tiempoAnimacion = 6;
    this.deshabilitar = false;
    this.seleccionadoPorJugador = '';
  }

  private ganaLaRonda(): boolean {
    const reglas: Record<string, string> = {
      piedra: 'tijera',
      papel: 'piedra',
      tijera: 'papel',
    };

    if (this.seleccionadoPorJugador === this.seleccionContrincante) {
      this.esEmpate = true;
      return false;
    }

    return reglas[this.seleccionadoPorJugador] === this.seleccionContrincante;
  }

  private esJuegoTerminado(): boolean {
    return this.jugador.vidas === 0 || this.jugador.puntos === 3;
  }

  private terminarJuego(ganado: boolean): void {
    this.juegoTerminado = true;
    this.nuevoJuego.gano = ganado;
    //@ts-ignore
    LocalStorage.actualizarUsuario(this.jugador);
    this.nuevoJuego.actualizarDatosJuegos();

    this.showToast(
      ganado ? '¡Bien lo tuyo!' : '¡Mejor la próxima!',
      ganado ? 'success' : 'error'
    );
  }

  public reiniciar(): void {
    this.juegoTerminado = false;
    this.jugador.vidas = 3;
    this.jugador.puntos = 0;
  }

  public showToast(message: string, type: 'success' | 'error' | 'warning'): void {
    this.toastMessage = message;
    this.toastType =
      type === 'success'
        ? 'text-bg-success'
        : type === 'error'
        ? 'text-bg-danger'
        : 'text-bg-warning';

    const toastElement = document.getElementById('myToast');
    if (toastElement) {
      toastElement.setAttribute('class', this.toastType);
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
