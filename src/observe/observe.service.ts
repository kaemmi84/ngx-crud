import { HttpContextToken, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Optional, Inject, Injectable } from '@angular/core';
import { timer, Subject, Subscription } from 'rxjs';
import { Context, ObserveAfterEffect, ObserveBeforeEffect } from './observe.interface';
import { ObserveStatus } from './observe.type';
import { OBSERVE_EFFECT } from './observe.token';

@Injectable()
export class ObserveService
{
	protected defaultContext : Context =
	{
		method: null,
		lifetime: null
	};

	protected token : HttpContextToken<Context> = new HttpContextToken<Context>(() => this.defaultContext);
	protected status : Subject<ObserveStatus> = new Subject<ObserveStatus>();
	protected timer : Subscription = new Subscription();

	constructor(@Optional() @Inject(OBSERVE_EFFECT) protected observeEffect : ObserveBeforeEffect | ObserveAfterEffect)
	{
	}

	/**
	 * get the token of the context
	 *
	 * @since 6.0.0
	 *
	 * @return {HttpContextToken<Context>} token of the context
	 */

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	/**
	 * start to observe the request
	 *
	 * @since 8.0.0
	 *
	 * @return {this} instance of the service
	 */

	start() : this
	{
		this.status.next('STARTED');
		return this;
	}

	/**
	 * before hook for the effect service
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {HttpRequest<T>} instance of the http request
	 */

	before<T>(request : HttpRequest<T>) : HttpRequest<T>
	{
		if (this.observeEffect && 'before' in this.observeEffect)
		{
			return this.observeEffect.before(request);
		}
		return request;
	}

	/**
	 * after hook for the effect service
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpResponse<T> | HttpErrorResponse} response instance of the http response
	 *
	 * @return {this} instance of the service
	 */

	after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : this
	{
		if (this.observeEffect && 'after' in this.observeEffect)
		{
			this.observeEffect.after(request, response);
		}
		return this;
	}

	/**
	 * end to observe the request
	 *
	 * @since 5.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {this} instance of the service
	 */

	end<T>(request : HttpRequest<T>) : this
	{
		const context : Context = request.context.get(this.getToken());

		this.timer.unsubscribe();
		this.timer = context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.completeAll()) : new Subscription();
		return this;
	}

	/**
	 * complete to observe for enabled services
	 *
	 * @since 8.0.0
	 *
	 * @return {this} instance of the service
	 */

	completeAll() : this
	{
		this.status.next('COMPLETED');
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 8.0.0
	 *
	 * @return {Subject<ObserveStatus>} status of all requests
	 */

	observeAll() : Subject<ObserveStatus>
	{
		return this.status;
	}
}
