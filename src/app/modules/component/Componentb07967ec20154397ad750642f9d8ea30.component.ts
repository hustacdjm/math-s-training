import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector     : 'Componentb07967ec20154397ad750642f9d8ea30',
    standalone   : true,
    templateUrl  : './Componentb07967ec20154397ad750642f9d8ea30.component.html',
    encapsulation: ViewEncapsulation.None,
    imports:[
       CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,MatRadioModule
    ]
    
})
export class Componentb07967ec20154397ad750642f9d8ea30
{

    @Input() data:any;
    /**
     * Constructor
     */
     constructor(public sanitizer:DomSanitizer){}

}
