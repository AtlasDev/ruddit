import { Inject, Injectable } from '@angular/core';
import { promisify } from 'bluebird';
import { Server as hapiServer } from 'hapi';

import * as Good from 'good';
import * as Inert from 'inert';
import * as Nes from 'nes';
import * as Path from 'path';

import { Endpoints } from '../endpoints/endpoint';
import { Notify } from './notify';

@Injectable()
export class Server {
  private server: hapiServer = new hapiServer({
		connections: {
			routes: {
				files: {
					relativeTo: Path.join(__dirname, '../public'),
				},
			},
		},
	});

  constructor(
    @Inject('endpoints') endpoints: any[],
		private notify: Notify,
  ) {
    endpoints.forEach((endpoint) => Endpoints.register(endpoint));
  }

  public async start(): Promise<void> {
    this.server.connection({
      port: 3000,
    });

    this.server.register(Nes);
		this.server.register(Inert);
    this.server.register({
      register: Good,
      options: {
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*',
            }],
          }, {
            module: 'good-console',
          }, 'stdout'],
        },
      },
    });

		this.server.route({
			method: 'GET',
			path: '/{param*}',
			handler: {
				directory: {
					path: '.',
					redirectToSlash: true,
					index: true,
				},
			},
		});

    this.server.route(Endpoints.getAll());
    this.notify.on('update', (msg) => this.server.broadcast(msg));

    this.server.start(() => Promise.resolve());
  }
}
