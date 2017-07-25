import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SignaturePage } from "../signature/signature";
import { UnsuccessfuljobPage } from "../unsuccessfuljob/unsuccessfuljob";
import { SuccessfuljobPage } from "../successfuljob/successfuljob";
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Badge } from '@ionic-native/badge';
/**
 * Generated class for the SamplejobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-samplejob',
  templateUrl: 'samplejob.html',
})
export class SamplejobPage {

  public photos: any;
  public base64Image: string;
  public signatureImage: string;
  barcodeOptions: BarcodeScannerOptions;
  barResults: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private alertCtrl: AlertController, public modalController: ModalController,
    public toastCtrl: ToastController, private call: CallNumber, private smsVar: SMS,
    private barcodeScanner: BarcodeScanner, private badge: Badge) {

    this.signatureImage = navParams.get('signatureImage');

  }

  callNumber() {
    this.call.callNumber('96369079', true);
  }

  async scanBarcode() {
    this.barResults = await this.barcodeScanner.scan();
  }

  sendSMS() {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    }
    this.smsVar.send('416123456', 'Hello Mr.Kwan, I will reach your place in 5 mins time.', options)
      .then(() => {
        //alert("success");
      }, () => {
        alert("failed");
      });
  }

  presentToast() {

    if ( this.signatureImage == null || this.signatureImage == '')
  {
    let alert = this.alertCtrl.create({
        title: 'Required Signature!',
        subTitle: 'Please, get customer Signature!',
        buttons: ['OK']
      });
      alert.present();
  }
else if (this.badgeNumber >= 2) {

    let toast = this.toastCtrl.create({
      message: 'Delivery Successful',
      duration: 3000
    });
    toast.present();
    this.navCtrl.push(SuccessfuljobPage);

    }


    else {
      let alert = this.alertCtrl.create({
        title: 'Required Photos!',
        subTitle: 'Please, take 3 sample photo proof to proceed signature page!',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  openSignatureModel() {

    setTimeout(() => {
      let modal = this.modalController.create(SignaturePage);
      modal.present();
    }, 200);
  }

  //ngOnInit() {
  //  this.photos = [];
  // }

  badgeNumber: number;

  async setBadges() {
    try {
      let badges = await this.badge.set(0);
      console.log(badges);
      this.badgeNumber = badges;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getBadges() {
    try {
      let badgeAmount = await this.badge.get();
      console.log(badgeAmount);
      this.badgeNumber = badgeAmount;
    }
    catch (e) {
      console.error(e);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NojobsPage');
    this.setBadges();
  }

  async clearBadges() {
    try {
      let badge = await this.badge.clear();
      console.log(badge);
    }
    catch (e) {
      console.error(e);
    }
  }

  async increaseBadges() {
    try {
      let hasPermission = await this.badge.hasPermission();
      if (hasPermission) {
        let badge = await this.badge.increase(1);
        console.log(badge);
        this.badgeNumber = badge;
      }
      else {
        let permission = await this.badge.registerPermission();
        console.log(permission);
        let badgeAmount = await this.badge.get();
        console.log(badgeAmount);
      }

    }
    catch (e) {
      console.error(e);
    }
  }

  async decreaseBadges() {
    try {
      let hasPermission = await this.badge.hasPermission();
      if (hasPermission) {
        let badge = await this.badge.decrease(1);
        console.log(badge);
        this.badgeNumber = badge;
      }
      else {
        let permission = await this.badge.registerPermission();
        console.log(permission);
        let badgeAmount = await this.badge.get();
        console.log(badgeAmount);
      }

    }
    catch (e) {
      console.error(e);
    }
  }

  async requestPermission() {
    try {
      let hasPermission = await this.badge.hasPermission();
      console.log(hasPermission);
      if (!hasPermission) {
        let permission = await this.badge.registerPermission();
        console.log(permission);
        this.setBadges();
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
      this.increaseBadges();

    }, (err) => {
      // Handle error
    });
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this picture?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.photos.splice(index, 1);
            this.decreaseBadges();
          }
        }
      ]
    });
    confirm.present();

  }

  unsuccessful() {
    let confirm = this.alertCtrl.create({
      title: 'Unsuccessful delivery?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.showCheckbox();
            //this.navCtrl.push(UnsuccessfuljobPage);
          }
        }
      ]
    });
    confirm.present();

  }

  rejected() {
    let confirm = this.alertCtrl.create({
      title: 'Rejected delivery?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.showCheckbox();
            //this.navCtrl.push(UnsuccessfuljobPage);
          }
        }
      ]
    });
    confirm.present();

  }



  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Reason for unsuccessful?');

    alert.addInput({
      type: 'checkbox',
      label: 'Wrong Item',
      value: 'value1'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Wrong Quantity',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Damaged Items',
      value: 'value3'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.navCtrl.push(UnsuccessfuljobPage);
        //this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }


}
