import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageListPage } from './message-list';
// import { SignaturePage } from '../signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
	declarations: [
		MessageListPage
	],
	imports: [
		SignaturePadModule,
		IonicPageModule.forChild(MessageListPage)
	],
	exports: [
		MessageListPage
	],
	entryComponents: [
		
		MessageListPage
	  ],
})

export class MessageListPageModule { }
