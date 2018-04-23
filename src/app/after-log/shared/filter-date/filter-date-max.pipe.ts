import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  	name: 'filterDateMax'
})
export class FilterDateMaxPipe implements PipeTransform {

  	transform(items: any, filter: any) {
	 	if (filter && Array.isArray(items)) {
		    let maxDate = filter;;

		    return items.filter(item => {
		    	return item.videoDate <= maxDate;
		    });
		}
		else {
  			return items;
		}
	}

}