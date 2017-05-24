import { RouteAdditionalConfigurationOptions } from 'hapi';

interface IEndpoint extends IEndpointMeta {
	controller: ClassDecorator;
}

export interface IEndpointMeta {
	method: 'GET' | 'POST' | 'DELETE';
	handler: string;
	path: string;
	config?: RouteAdditionalConfigurationOptions;
}

export class Endpoints {
	private static registery: IEndpoint[] = [ ];

	public static register(controller: ClassDecorator): void {
		const meta: IEndpointMeta = Reflect.getMetadata('meta', controller.constructor);
		this.registery.push({
			controller,
			...meta,
		});
	}

	public static getAll(): any[] {
		const endpointList = [];
		for (const meta of this.registery) {
			endpointList.push({
				config: meta.config || null,
				handler: (req, res) => meta.controller[meta.handler].call(meta.controller, req, res),
				method: meta.method,
				path: meta.path,
			});
		}
		return endpointList;
	}
}

export function Endpoint(endpoint: IEndpointMeta) {
	return (target: any) => {
		Reflect.defineMetadata('meta', endpoint, target);
		return target;
  };
}
