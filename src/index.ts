import 'reflect-metadata';
import 'rxjs/symbol/observable';

import { ReflectiveInjector } from '@angular/core';

import { endpoints } from './endpoints';
import { Database } from './lib/database';
import { Notify } from './lib/notify';
import { Server } from './lib/server';

const injector = ReflectiveInjector.resolveAndCreate([
  Database,
	...endpoints,
	Notify,
  Server,
]);

injector.get(Server).start();

process.on('unhandledRejection', (err) => {
  console.error(err);
});
