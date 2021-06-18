import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from '../../Interfaces/tarjeta.interface';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tajeta-credito',
  templateUrl: './tajeta-credito.component.html',
  styleUrls: ['./tajeta-credito.component.css']
})
export class TajetaCreditoComponent implements OnInit {

  listTarjetas: Tarjeta[]  = [];
  form: FormGroup;
  accion = 'agregar';
  id : number | undefined ;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta:['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.min(5)]],
      cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
   }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getlistTarjetas().subscribe(data => {
      this.listTarjetas = data;
    }, error => {
      console.log(error);
    });
  }

  guardarTarjeta(){
    const tarjeta: any = {
      titular: this.form.get("titular")?.value,
      numeroTarjeta: this.form.get("numeroTarjeta")?.value,
      fechaExpiracion: this.form.get("fechaExpiracion")?.value,
      cvv: this.form.get("cvv")?.value
    }

    if(this.id == undefined){
      //Agregamos nueva tarjeta
      //this.listTarjetas.push(tarjeta);
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('La tarjeta fue registrada con exito', 'Tarjeta registrada');
        this.form.reset();
        this.obtenerTarjetas();
      },error => {
        this.toastr.error("Opss... Ocurio un error", "Error");
        console.error(error);      
      });
    }
    else{
      tarjeta.id = this.id;
      //editamos tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'agregar';
        this.id = undefined;
        this.toastr.info("La tarjeta fue actualizada con exito", "Tarjeta Actualizada");
        this.obtenerTarjetas();
      },error => {
        this.toastr.error("Opss... Ocurio un error", "Error");
        console.error(error);  
      })
    }
    
  }

  eliminarTarjeta(index : number){
    //this.listTarjetas.splice(index, 1);
    this._tarjetaService.deleteTarjeta(index).subscribe(data => {
      this.toastr.error("La tarjeta fue eliminada con exito", "Tarjeta eliminada");
      this.obtenerTarjetas();
    },error=>{
      console.error(error);      
    }
    );
  }

  editarTarjeta(tarjeta: Tarjeta){
    this.accion = 'editar';
    this.id= tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta : tarjeta.numeroTarjeta,
      fechaExpiracion : tarjeta.fechaExpiracion,
      cvv : tarjeta.cvv
    });
    
  }
}
