import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'htmlEntity'
})
export class HtmlEntityPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
