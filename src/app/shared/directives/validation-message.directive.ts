import { AfterViewInit, Directive, Input } from "@angular/core";
import { ValidatingObjectFormat } from "src/app/app-shared/models/javascriptVariables";

@Directive({
  selector: "[validationMessage]",
})
export class ValidationMessageDirective implements AfterViewInit {
  @Input() validationMessage?: any;
  constructor() {}

  ngAfterViewInit() {
  }
}
