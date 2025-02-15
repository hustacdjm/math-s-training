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
  "name" : null,
  "description" : null,
  "version" : "3.0"
};
  
reactiveComponent = {
  "component": {
    "componentTemplateId": "67aebb903ec1e310a126d069",
    "templateDeployId": null,
    "content": {
      "title": "3rd Grade Training",
      "description": "<p><span style=\"color: rgb(64, 64, 64);\">The&nbsp;</span><strong style=\"color: rgb(64, 64, 64);\">3rd Math Training Objective</strong><span style=\"color: rgb(64, 64, 64);\">&nbsp;often focuses on&nbsp;</span><strong style=\"color: rgb(64, 64, 64);\">developing problem-solving skills and applying mathematical concepts to real-world situations</strong><span style=\"color: rgb(64, 64, 64);\">. This objective builds on foundational knowledge (e.g., arithmetic, algebra, geometry) and emphasizes critical thinking, logical reasoning, and the ability to use math in practical contexts.</span></p>",
      "numTypes": "Integer,Decimal",
      "opTypes": "Divide",
      "opNumSame": true,
      "maxProblems": 4,
      "integerRange": "1000,10000",
      "fractionNumberRange": "1,20",
      "decimalRange": "10,20",
      "negativeEnable": false
    },
    "ui": {},
    "scores": []
  },
  "runtime": {
    "data": {
      "index": null,
      "problems": null,
      "corrections": null
    }
  }
};



    async ngAfterContentInit() {
      
      this.StartTest();

    }

   
    async StartTest(){
      
        const componentModule = await import('../component/Component67b034793ec1e310a126d06b0b6fe413a0e64229a7c5ddbd27e694b2.component');
        const TemplateComponent = componentModule['Component67b034793ec1e310a126d06b0b6fe413a0e64229a7c5ddbd27e694b2'];

        this.testContainer.clear();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TemplateComponent);

        console.log('container:' + this.testContainer);
        const fmComponentRef  = this.testContainer!.createComponent(componentFactory);
        (fmComponentRef as any).instance.data = this.reactiveComponent;
        fmComponentRef.changeDetectorRef.markForCheck();

    }

}
