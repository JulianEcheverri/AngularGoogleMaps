import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder

    ) {
      this.formGroup = formBuilder.group({
        'titulo': data.titulo,
        'desc': data.desc
      });
    }

  ngOnInit(): void {
  }

  guardarCambios(){
    // se cierra el dialog mandandole la info al componente padre
    // La info es recibida en el metodo dialogRef.afterClosed(), llamado en el evento que dispara el dialog 
    this.dialogRef.close(this.formGroup.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
