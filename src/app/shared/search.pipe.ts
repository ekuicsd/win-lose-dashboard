import { Pipe, PipeTransform } from '@angular/core';
import { Players } from '../models/players.model';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: Players[], search: string): any {
        console.log(search);
        if (search == '') {
            return value;
        }
        return value.filter(ele => {
            if (ele.Name.toLowerCase().includes(search.toLowerCase())) {
                return ele;
            }
        })
    }
}