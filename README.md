NGX CRUD
========

> CRUD services for Angular with effortless aborting and caching.

[![Build Status](https://img.shields.io/travis/redaxmedia/ngx-crud.svg)](https://travis-ci.org/redaxmedia/ngx-crud)
[![Mutation Status](https://badge.stryker-mutator.io/github.com/redaxmedia/ngx-crud/master)](https://github.com/redaxmedia/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)


Installation
------------

```
npm install ngx-crud
```


Usage
-----

Import the `CrudModule` and `HttpClientModule` to `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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

Extend `ExampleService` from `CrudService`:

```typescript
import { Injectable } from '@angular/core';
import { CrudService } from 'ngx-crud';
import { Observable } from 'rxjs';
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


CRUD Service
------------

Overview of `CRUD` methods:

| Operation | HTTP   | Method  | Parameter                                                      | Return                |
|-----------|--------|---------|----------------------------------------------------------------|-----------------------|
| Create    | POST   | create  | `body : any, options? : OptionInterface`                       | `Observable<T>`       |
| Read      | GET    | read    | `id : number / string, options? : OptionInterface`             | `Observable<T>`       |
| Find      | GET    | find    | `options? : OptionInterface`                                   | `Observable<T[]>`     |
| Update    | PUT    | update  | `id : number / string, body : any, options? : OptionInterface` | `Observable<T>`       |
| Patch     | PATCH  | patch   | `id : number / string, body : any, options? : OptionInterface` | `Observable<T>`       |
| Delete    | DELETE | delete  | `id : number / string, options? : OptionInterface`             | `Observable<T>`       |
| Request   | ANY    | request | `method : MethodType, options? : OptionWithBodyInterface`      | `Observable<T / T[]>` |


Common Service
--------------

Overview of `get` methods:

| Method         | Parameter       | Return               |
|----------------|-----------------|----------------------|
| getApiUrl      |                 | `string`             |
| getEndpoint    |                 | `string`             |
| getOptions     |                 | `OptionInterface`    |
| getOption      | `name : K`      | `OptionInterface[K]` |
| getHeaders     |                 | `HttpHeaders`        |
| getHeaderArray | `name : string` | `string[]`           |
| getHeader      | `name : string` | `string`             |
| getParams      |                 | `HttpParams`         |
| getParamArray  | `name : string` | `string[]`           |
| getParam       | `name : string` | `string`             |

Overview of `set` methods:

| Method         | Parameter                             | Return |
|----------------|---------------------------------------|--------|
| setApiUrl      | `apiUrl : string`                     | `this` |
| setEndpoint    | `endpoint : string`                   | `this` |
| setOptions     | `options : OptionInterface`           | `this` |
| setOption      | `name : K, value: OptionInterface[K]` | `this` |
| setHeaders     | `headers : HttpHeaders`               | `this` |
| setHeaderArray | `name : string, valueArray: string[]` | `this` |
| setHeader      | `name : string, value: string`        | `this` |
| setParams      | `params : HttpParams`                 | `this` |
| setParamArray  | `name : string, valueArray: string[]` | `this` |
| setParam       | `name : string, value: string`        | `this` |

Overview of `append` methods:

| Method       | Parameter                      | Return |
|--------------|--------------------------------|--------|
| appendHeader | `name : string, value: string` | `this` |
| appendParam  | `name : string, value: string` | `this` |

Overview of `clear` methods:

| Method       | Parameter       | Return |
|--------------|-----------------|--------|
| clear        |                 | `this` |
| clearOptions |                 | `this` |
| clearOption  | `name : K`      | `this` |
| clearHeaders |                 | `this` |
| clearHeader  | `name : string` | `this` |
| clearParams  |                 | `this` |
| clearParam   | `name : string` | `this` |

Overview of `control` methods:

| Method       | Parameter                                | Return |
|--------------|------------------------------------------|--------|
| init         |                                          | `this` |
| abort        |                                          | `this` |
| flush        |                                          | `this` |
| destroy      |                                          | `this` |
| enableAbort  | `method : MethodType, lifetime : number` | `this` |
| disableAbort |                                          | `this` |
| enableCache  | `method : MethodType, lifetime : number` | `this` |
| disableCache |                                          | `this` |
