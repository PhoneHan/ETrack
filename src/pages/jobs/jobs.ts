import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SamplejobPage } from '../samplejob/samplejob';

/**
 * Generated class for the JobsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobsPage');
  }

    goSampleJob(){
    this.navCtrl.push(SamplejobPage);
  }

}
