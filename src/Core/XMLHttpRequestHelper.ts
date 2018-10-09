import { ActionAlias1 } from './Delegates/ActionAliases';

export class XMLHttpRequestHelper {
	public static request<TRequest, TResponse = string>(
		method: 'GET' | 'POST',
		url: string,
		content?: TRequest,
		callback?: ActionAlias1<TResponse | string>,
		errorCallback?: ActionAlias1<ProgressEvent>
	): void {
		XMLHttpRequestHelper.requestBase(
			method,
			url,
			content,
			(response: string): void => {
				if (callback !== undefined) {
					try {
						callback(JSON.parse(response) as TResponse);
					} catch (error) {
						callback(response);
					}
				}
			},
			errorCallback
		);
	}

	private static requestBase<TRequest>(
		method: 'GET' | 'POST',
		url: string,
		content?: TRequest,
		callback?: ActionAlias1<string>,
		errorCallback?: ActionAlias1<ProgressEvent>
	): void {
		const request: XMLHttpRequest = new XMLHttpRequest();

		request.open(method, url, true);
		// tslint:disable-next-line:only-arrow-functions
		request.onload = function(): void {
			if (this.status >= 200 && this.status < 400) {
				callback && callback(this.response as string);
			} else {
				// We reached our target server, but it returned an error
			}
		};

		// tslint:disable-next-line:only-arrow-functions
		request.onerror = function(progressEvent: ProgressEvent): void {
			errorCallback && errorCallback(progressEvent);
		};

		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		if (method === 'POST') {
			request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		}

		request.send(JSON.stringify(content));
	}
}
