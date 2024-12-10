import {Pipe, PipeTransform} from '@angular/core';
import { revenueModel } from '../components/revenue-chart/revenue-chart.model';

@Pipe({
  name: 'phonePipe',
  standalone: true
})

export class PhonePipe implements PipeTransform {
  transform(value: any): any {
    const result = value.toString().replace(revenueModel, " ")
    return result;
  }
}