
import {Component} from '@angular/core';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html'
})

export class EditprofileComponent{
    val:number=1;
    get self(): EditprofileComponent { return this }; 
    value: Date;
    value1: Date;
    yearRange:string = '1940:2010';
}