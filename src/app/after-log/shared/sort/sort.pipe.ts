import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
	transform(items: any, key: string, key2: string): Array<string> {

        if(key === undefined || key == ''){
            return items;
        }

        var sortBy = key;   // string or column name to sort(name or date)
        var sortOrder = key2;   // asc or desc order        

        if (items !== undefined) {
        items.sort((a: any, b: any) => {

            if(sortBy === 'videoDate' ){

                let right    = Number(new Date(a[sortBy]));
                let left   = Number(new Date(b[sortBy]));

                return (sortOrder === "asc") ? right - left : left - right;
            }

            else if(sortBy === 'videoName'){
        		if(sortOrder === "asc"){
					return (Number(a[sortBy].match(/(\d+)/g)[0]) - Number(b[sortBy].match(/(\d+)/g)[0]));
				}
				else {
					return (Number(b[sortBy].match(/(\d+)/g)[0]) - Number(a[sortBy].match(/(\d+)/g)[0]));
				}
            }

        });
        }

        return items;

	}

}

