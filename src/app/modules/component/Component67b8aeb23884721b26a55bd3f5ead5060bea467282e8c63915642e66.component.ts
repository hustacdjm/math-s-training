import {AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import katex, { KatexOptions } from 'katex';
import { ChangeDetectorRef } from '@angular/core';
import * as math from 'mathjs';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector     : 'Component67b8aeb23884721b26a55bd3f5ead5060bea467282e8c63915642e66',
    standalone   : true,
    templateUrl  : './Component67b8aeb23884721b26a55bd3f5ead5060bea467282e8c63915642e66.component.html',
    encapsulation: ViewEncapsulation.None,
    imports:[
       CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,MatRadioModule, MatButtonModule
    ]
    
})
export class Component67b8aeb23884721b26a55bd3f5ead5060bea467282e8c63915642e66 implements OnInit
{

    @ViewChild('answerInput', { static: false }) answerInput!: ElementRef; // Use { static: false 


    @Input() data:any;
    /**
     * Constructor
     */
     constructor(
         public sanitizer:DomSanitizer,
         private cdr: ChangeDetectorRef
         ){
                      

     }

     ngOnInit(): void {

        this.total = this.data.component.content.maxProblems;
        console.log("total:");

     }    

    enterEventHandle() {
        console.log('Enter key pressed. Answer:', this.answer);
        this.submitAnswer();
        // Add your logic here
    }



     options: KatexOptions = { output: "mathml", throwOnError: false, displayMode: false }
     
     equation: string = null;
     equationMathML:string;

     num1String:string;
     num2String:string;
     equationSimplify:string;

     answer:string;

     history = [];
     historyMathML:any;
    
     index: number = 1;

     status:string;
     corrects:number = 0;
     total:number= 5;

     sampleMixFraction:string = katex.renderToString("1 \\frac{1}{2}", this.options);

     tryagain(){
        this.startTraining();
     }

     startTraining(){

        this.history=[];
        this.answer = null;
        
        this.equation =  this.generateEquationByConfig();
        this.equationMathML = katex.renderToString(
             this.equation,
             this.options);
           
        this.index=1;
        this.status = "intraining";
        this.cdr.detectChanges();

        if(this.answerInput){
            this.answerInput.nativeElement.focus(); // Focus on the input after the view initializes
        }        
        
     }

     submitAnswer(){

        //evlation by mathJS
        let answerSimplify = this.answer.replace("and", "+");
        console.log(this.equationSimplify);
        console.log("right answer:" + math.simplify(this.equationSimplify).toString()  )

        let compareSimplify = this.equationSimplify + ' - (' + answerSimplify + ')';

        let correct = math.simplify(compareSimplify).toString();       
        console.log(correct);
        if(correct === "0"){
            this.corrects++;
        }
        
        if(this.answer.includes("and")){
            this.answer = this.parseMixedFractionToLatex(this.answer);

        }

        this.history = [...this.history, 
            {
                expression: this.equation + ' = ' + this.answer,
                correct: correct==="0"?true:false
            }
        ];


        console.log(this.history);


        if(this.index < this.total){

            this.answer = null;
            this.equation =  this.generateEquationByConfig();
            this.equationMathML = katex.renderToString(
                 this.equation,
                 this.options);
            this.index++;
        }
        else{

            this.status = "completed";

           // Map history to historyMathML
            this.historyMathML = this.history.map(h => ({
                expression: katex.renderToString(h.expression, this.options),
                correct: h.correct
            }));
                    

        }

        this.cdr.detectChanges();

     }

     parseMixedFractionToLatex(input) {
        // Step 1: Split the string into whole number and fraction parts
        const parts = input.split(' and ');
        if (parts.length !== 2) {
            throw new Error("Invalid input format. Expected format: 'X and Y/Z'");
        }
    
        const wholeNumber = parts[0].trim(); // Extract the whole number
        const fraction = parts[1].trim(); // Extract the fraction
    
        // Step 2: Split the fraction into numerator and denominator
        const [numerator, denominator] = fraction.split('/');
        if (!numerator || !denominator) {
            throw new Error("Invalid fraction format. Expected format: 'Y/Z'");
        }
    
        // Step 3: Format in LaTeX
        return `${wholeNumber} \\frac{${numerator}}{${denominator}}`;
    }

     // Function to generate a random number based on the type and range
    generateNumber(numType, integerRange, fractionRange, decimalRange) {       

        console.log(numType);

        let num;
        switch (numType) {
            case 'Integer':
                const [intMin, intMax] = integerRange;
                num =  Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
                return {expression: num, mathJs: num}; // Random integer within the range
            case 'Decimal':
                const [decMin, decMax] = decimalRange;
                let fix =  Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                num = (Math.random() * (decMax - decMin) + decMin).toFixed( fix ); // Random decimal within the range
                return {expression: num, mathJs: num};
            case 'Fraction':
                const [fracMin, fracMax] = fractionRange;
                let denominator = Math.floor(Math.random() * (fracMax - fracMin + 1)) + fracMin;
                let numerator = Math.floor(Math.random() * (denominator - fracMin + 1)) + fracMin;  
                if(numerator == denominator ){
                    numerator=numerator-1;
                }              
                num = `\\frac{${numerator}}{${denominator}}`;
                return {expression: num, mathJs: `${numerator} / ${denominator}`};
            case 'MixedFraction':
                const [fracMinMF, fracMaxMF] = fractionRange;
                const denominatorMF = Math.floor(Math.random() * (fracMaxMF - fracMinMF + 1)) + fracMinMF;
                const numeratorMF = Math.floor(Math.random() * (denominatorMF - fracMinMF + 1)) + fracMinMF;                
                const wholeNumber = Math.floor(Math.random() * (fracMaxMF - fracMinMF + 1)) + fracMinMF;              
                num =  `${wholeNumber} \\frac{${numeratorMF}}{${denominatorMF}}`;
                return {expression: num, mathJs: `${wholeNumber} + ${numeratorMF} / ${denominatorMF}`};
            default:                
                return 0;
        }
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    stringToRange(rangeString) {
        // Split the string by comma and convert each part to a number
        console.log(rangeString);
        const rangeArray = rangeString.split(',').map(Number);
        return rangeArray;
    }

    stringToArray(arrayString) {
        // Split the string by comma and convert each part to a number
        return  arrayString.split(',').map(r=>r.trim());
    }

    generateEquationByConfig(){
        
        return this.generateEquation(

            this.stringToArray(this.data.component.content.opTypes),
            this.stringToArray(this.data.component.content.numTypes),
            this.data.component.content.opNumSame,
            this.stringToRange(this.data.component.content.integerRange),
            this.stringToRange(this.data.component.content.fractionNumberRange),
            this.stringToRange(this.data.component.content.decimalRange)

        );

    }

    generateDivisibleNumbers() {

        const [intMin, intMax] = this.stringToRange(this.data.component.content.integerRange);

        // Step 1: Generate a random num2 between 1 and 100
        const num2 = Math.floor(Math.random() * (intMax / 3 - intMin + 1)) + intMin;
    
        // Step 2: Calculate the maximum multiple of num2 within the range
        const maxMultiple = Math.floor(intMax / num2);
    
        // Step 3: Generate a random multiple for num1
        const k = Math.floor(Math.random() * maxMultiple) + 1;
        const num1 = num2 * k;
    
        // Return the numbers
        return { num1, num2 };
    }


    // Function to generate the equation in LaTeX format
    generateEquation(optTypes, numTypes, opNumSame, integerRange, fractionRange, decimalRange) {

        let optType = this.getRandomItem(optTypes);
        // Randomly select a number type and operation type
        let numType = this.getRandomItem(numTypes);        


        let num1;
        let num2;
        if(numType==='Integer' && optType==='Divide'){

            let dividNumbers=this.generateDivisibleNumbers();
            num1={
                expression: dividNumbers.num1,
                mathJs: dividNumbers.num1
            };
            num2={
                expression: dividNumbers.num2,
                mathJs: dividNumbers.num2
            };

        }
        else if(numType==='Decimal' && optType==='Divide'){

            let dividNumbers=this.generateDivisibleNumbers();
            let num1_dec= dividNumbers.num1/(Math.pow(10,(Math.floor(Math.random() * 3) + 1)));
            num1={
                expression:num1_dec,
                mathJs:num1_dec
            };
            let num2_dec= dividNumbers.num2/(Math.pow(10,(Math.floor(Math.random() * 3) + 1)));
            num2={
                expression:num2_dec,
                mathJs: num2_dec
            };

        }        
        else{
            
            num1 = this.generateNumber(numType, integerRange, fractionRange, decimalRange);

            if(!opNumSame){
                numType = this.getRandomItem(numTypes);
            }     
    
            num2 = this.generateNumber(numType, integerRange, fractionRange, decimalRange);
    
            console.log(num1);
            console.log(num2);
    
            if(!this.data.component.content.negativeEnable){
                
                let subResult =  math.simplify('(' + num1.mathJs +') - (' + num2.mathJs + ')').toString();       
                if(subResult.includes('-')){
                    //switch
                    let temp = {...num1};
                    num1 = {...num2};
                    num2 = temp;
                }
            }

        }

        if(optType==='Divide'){
            //num2 can not be zeor, if zeor, then switch
            let div_0_answer = math.simplify(num2.mathJs + "* 1").toString()
            if(div_0_answer==='0'){
                let temp = {...num1};
                num1 = {...num2};
                num2 = temp;
            }            
        }        
        console.log(num1);
        console.log(num2);      

        let operator;
        switch (optType) {
            case 'Add':
                operator = '+';
                this.equationSimplify = `(${num1.mathJs}) + (${num2.mathJs})`;
                break;
            case 'Sub':
                operator = '-';
                this.equationSimplify = `(${num1.mathJs}) - (${num2.mathJs})`;
                break;
            case 'Multiply':
                operator = '\\times';
                this.equationSimplify = `(${num1.mathJs}) * (${num2.mathJs})`;
                break;
            case 'Divide':
                operator = '\\div';
                this.equationSimplify = `(${num1.mathJs}) / (${num2.mathJs})`;
                break;
            default:
                operator = '+';
        }

        // Generate the equation in LaTeX format
        const equation = `${num1.expression} ${operator} ${num2.expression}`;
        
        return equation;
    }




}
