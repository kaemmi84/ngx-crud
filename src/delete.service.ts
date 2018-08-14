import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class DeleteService<T> extends CommonService
{
	delete(id : string, options? : any) : Observable<HttpEvent<T>>
	{
		return this.http.delete<T>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].filter(value => value).join('/'), options ? options : this.options);
	}
}
