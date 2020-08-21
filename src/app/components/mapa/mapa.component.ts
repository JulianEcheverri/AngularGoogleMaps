import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  marcadores: Marcador[] = [];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento) {
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this._snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this._snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  // Funcion que dispara el dialog (model) de material
  // Para implementar este dialog, es necesario crear un componente que va a recibir la informacion
  // Para poder utilizar el componente externo, o cuando se esta inyectando el componente externo de manera dinamica, debe especificarse en entryComponent, en el app.module
  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

        marcador.titulo = result.titulo;
        marcador.desc = result.desc;

        this.guardarStorage();

        this._snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
    });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

}
