import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

    transform(items: any, filter: any) {
	 	if (filter && Array.isArray(items)) {
		    let minDate = filter;;

		    return items.filter(item => {
		    	return item.videoDate >= minDate;
		    });
		}
		else {
  			return items;
		}
	}
}