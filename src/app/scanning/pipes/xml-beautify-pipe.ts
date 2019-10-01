import * as prettify from 'vkbeautify';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xmlPrettify' })
export class XMLBeautifyPipe implements PipeTransform {
  transform(value: string): string {
    let retVal: string = value;
    const xmlStart = value.indexOf('<');
    if (xmlStart > -1) {
      const start = value.substr(0, xmlStart) + '\r\n';
      const xml = value.substr(xmlStart, value.length - xmlStart);
      const prettyXml = prettify.xml(xml);
      retVal = start.concat(prettyXml);
    }
    return retVal;
  }
}
