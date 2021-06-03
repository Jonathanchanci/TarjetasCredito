import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from '../../Interfaces/tarjeta.interface';

@Component({
  selector: 'app-tajeta-credito',
  templateUrl: './tajeta-credito.component.html',
  styleUrls: ['./tajeta-credito.component.css']
})
export class TajetaCreditoComponent implements OnInit {

  listTarjetas: Tarjeta[]  = [
    {titular: "Juan Perez", nombreTarjeta: "343434343" , fechaExpiracion: "11/22"},
    {titular: "Michael Jackson", nombreTarjeta: "2323232323" , fechaExpiracion: "12/23"}
  ];
  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular:['', Validators.required],
      nombreTarjeta:['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.min(5)]],
      cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
   }

  ngOnInit(): void {
  }

  agregarTarjeta(){
    const tarjeta: any = {
      titular: this.form.get("titular")?.value,
      nombreTarjeta: this.form.get("nombreTarjeta")?.value,
      fechaExpiracion: this.form.get("fechaExpiracion")?.value,
      cvv: this.form.get("cvv")?.value
    }
    this.listTarjetas.push(tarjeta);
    this.toastr.success('La tarjeta fue registrada con exito', 'Tarjeta registrada');
    this.form.reset();
  }

  eliminarTarjeta(index : number){
    this.listTarjetas.splice(index, 1);
    this.toastr.error("La tarjeta fue eliminada con exito", "Tarjeta eliminada");
  }
}
