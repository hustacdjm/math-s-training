import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, RouterLink, MatIconModule,
        MatIconModule,  CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatRadioModule],
})
export class LandingHomeComponent implements AfterContentInit
{

    /**
     * Constructor
     */
    constructor(private componentFactoryResolver: ComponentFactoryResolver)
    {



    }
  

    @ViewChild('test', {read:ViewContainerRef}) testContainer!: ViewContainerRef;
   

    template={
  "name" : "Math S-Training",
  "description" : "math training is to basis problem on add, sub, multiply, divid of integer, decimal, franction and mixed. ",
  "version" : "1.0"
};
  
    reactiveComponent={
  "component" : {
    "componentTemplateId" : "67aebb903ec1e310a126d069",
    "templateDeployId" : null,
    "content" : {
      "title" : "3rd Grade Training",
      "numTypes" : "Integer",
      "opTypes" : "Add",
      "maxProblems" : 40,
      "Integer range" : "10,100",
      "fractionNumberRange" : "1,20"
    },
    "ui" : { },
    "scores" : [ ]
  },
  "runtime" : {
    "data" : {
      "index" : null,
      "problems" : null,
      "corrections" : null
    }
  }
};



    async ngAfterContentInit() {
      
      this.StartTest();

    }

   
    async StartTest(){
      
        const componentModule = await import('../component/Componentb07967ec20154397ad750642f9d8ea30.component');
        const TemplateComponent = componentModule['Componentb07967ec20154397ad750642f9d8ea30'];

        this.testContainer.clear();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TemplateComponent);

        console.log('container:' + this.testContainer);
        const fmComponentRef  = this.testContainer!.createComponent(componentFactory);
        (fmComponentRef as any).instance.data = this.reactiveComponent;
        fmComponentRef.changeDetectorRef.markForCheck();

    }

}
