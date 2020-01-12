NGX CRUD
========

> CRUD services for Angular with effortless aborting and caching.

[![Build Status](https://img.shields.io/travis/redaxmedia/ngx-crud.svg)](https://travis-ci.org/redaxmedia/ngx-crud)
[![Mutation Status](https://badge.stryker-mutator.io/github.com/redaxmedia/ngx-crud/master)](https://github.com/redaxmedia/ngx-crud)
[![Coverage Status](https://coveralls.io/repos/github/redaxmedia/ngx-crud/badge.svg)](https://coveralls.io/github/redaxmedia/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)


Installation
------------

```
npm install ngx-crud
```


Usage
-----

Import the `CrudModule` and `HttpClientModule` inside your `AppModule`:

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CrudModule } from 'ngx-crud';

@NgModule(
{
	imports:
	[
		CrudModule,
		HttpClientModule
	]
})
export class AppModule
{
}
```
Extend the `ExampleService` from the `CrudService`:

```typescript
import { Injectable } from '@angular/core';
import { CrudService } from 'ngx-crud';
import { ExampleInterface } from './example.interface';

import { environment } from '@env';

@Injectable()
export class ExampleService extends CrudService<ExampleInterface>
{
	protected apiUrl : string = environment.apiUrl;
	protected endpoint : string = environment.routes.example;
}
```


API
===


HTTP Operations
---------------

Fire a `POST` request to create a single record:

```typescript
crudService->create(body : BodyInterface, options? : OptionInterface) : Observable<T>
```

Fire a `GET` request to read a single record:

```typescript
crudService->read(id : IdType, options? : OptionInterface) : Observable<T>
```

Fire a `GET` request to find multiple records:

```typescript
crudService->find(options? : OptionInterface) : Observable<T[]>
```

Fire a `PUT` request to completely update a single record:

```typescript
crudService->update(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
```

Fire a `PATCH` request to partially update a single record:

```typescript
crudService->patch(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
```

Fire a `DELETE` request to delete a single record:

```typescript
crudService->delete(id : IdType, options? : OptionInterface) : Observable<T>
```

Fire a non-standard request:

```typescript
crudService->request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
```


HTTP Aborting
-------------

Enable aborting for the service:

```typescript
crudService->enableAbort(method : MethodType = 'GET', lifetime : number = 2000) : this
```

Disable aborting for the service:

```typescript
crudService->disableAbort() : this
```

Abort all requests of the service:

```typescript
crudService->abort() : this
```

Abort a single request by its `urlWithParams` for enabled services:

```typescript
abortService->abort(urlWithParams : string) : this
```

Abort requests by their `baseUrl` for enabled services:

```typescript
abortService->abortMany(baseUrl : string) : this
```

Abort all request for enabled services:

```typescript
abortService->abortAll() : this
```


HTTP Caching
------------

Enable caching for the service:

```typescript
crudService->enableCache(method : MethodType = 'GET', lifetime : number = 2000) : this
```

Disable caching for the service:

```typescript
crudService->disableCache() : this
```

Flush all caches of the service:

```typescript
crudService->flush() : this
```

Flush a single cache by its `urlWithParams` for enabled services:

```typescript
cacheService->flush(urlWithParams : string) : this
```

Flush caches by their `baseUrl` for enabled services:

```typescript
cacheService->flushMany(baseUrl : string) : this
```

Flush all caches for enabled services:

```typescript
cacheService->flushAll() : this
```


Service Shorthands
------------------

Clear the service:

```typescript
crudService->clear()
```

Destroy the service:

```typescript
crudService->destroy()
```


Service Options
---------------

Get the API URL of the service:

```typescript
crudService->getApiUrl() : string
```

Set the API URL of the service:

```typescript
crudService->setApiUrl(apiUrl : string) : this
```

Get the endpoint of the service:

```typescript
crudServie->getEndpoint() : string
```

Set the endpoint of the service:

```typescript
crudService->setEndpoint(endpoint : string) : this
```


HTTP Options
------------

Get a single option of the service

```typescript
crudService->getOption<K extends keyof OptionInterface>(name : K) : OptionInterface[K]
```

Get all options of the service

```typescript
crudService->getOptions() : OptionInterface
```

Set a single option of the service

```typescript
crudService->setOption<K extends keyof OptionInterface>(name : K, value : OptionInterface[K]) : this
```

Set all options of the service

```typescript
crudService->setOptions(options : OptionInterface) : this
```

Clear a single header of the service

```typescript
crudService->clearOption(name : keyof OptionInterface) : this
```

Clear all headers of the service

```typescript
crudService->clearOptions() : this
```


HTTP Headers
------------

Get a single header of the service

```typescript
crudService->getHeader(name : string) : string
```

Get all headers of the service

```typescript
crudService->getHeaders() : HttpHeaders
```

Get values for a single header of the service

```typescript
crudService->getHeaderArray(name : string) : string[]
```

Set a single header of the service

```typescript
crudService->setHeader(name : string, value : string) : this
```

Set all headers of the service

```typescript
crudService->setHeaders(headers : HttpHeaders) : this
```

Set values for a single header of the service

```typescript
crudService->setHeaderArray(name : string, valueArray : string[]) : this
```

Append a single header to the service

```typescript
crudService->appendHeader(name : string, value : string) : this
```

Append values to a single header of the service

```typescript
crudService->appendHeaderArray(name : string, valueArray : string[]) : this
```

Clear a single header of the service

```typescript
crudService->clearHeader(name : string) : this
```

Clear all headers of the service

```typescript
crudService->clearHeaders() : this
```


HTTP Params
-----------

Get a single param of the service:

```typescript
crudService->getParam(name : string) : string
```

Get all params of the service

```typescript
crudService->getParams() : HttpParams
```

Get values for a single param of the service

```typescript
crudService->getParamArray(name : string) : string[]
```

Set a single param of the service

```typescript
crudService->setParam(name : string, value : string) : this
```

Set all params of the service

```typescript
crudService->setParams(params : HttpParams) : this
```

Set values for a single param of the service

```typescript
crudService->setParamArray(name : string, valueArray : string[]) : this
```

Append a single param to the service

```typescript
crudService->appendParam(name : string, value : string) : this
```

Append values to a single param of the service

```typescript
crudService->appendParamArray(name : string, valueArray : string) : this
```

Clear a single param of the service

```typescript
crudService->clearParam(name : string) : this
```

Clear all params of the service

```typescript
crudService->clearParams() : this
```
