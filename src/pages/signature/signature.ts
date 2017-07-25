import { Component, ViewChild } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SamplejobPage } from "../samplejob/samplejob";

@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
@ViewChild(SignaturePad) public signaturepad: SignaturePad ;
  constructor( public navParams: NavParams,public navCtrl:NavController) {
  }
public signatureImage:string;

private signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  canvasResize(){
    let canvas=document.querySelector('canvas');
    this.signaturepad.set('canvasWidth' ,canvas.offsetWidth);
     this.signaturepad.set('canvasHeight' ,canvas.offsetHeight);
  }

ngAfterViewInit(){
  console.log("Comes here!");
  this.signaturepad.clear();
  this.canvasResize();
}

drawComplete(){
  this.signatureImage=this.signaturepad.toDataURL();
  console.log(this.signatureImage);
  this.navCtrl.push(SamplejobPage,
  {signatureImage: this.signatureImage});
}

drawClear(){
  this.signaturepad.clear();
} 

drawCancel(){
   this.navCtrl.push(SamplejobPage,
  {signatureImage: ''});
}
}
