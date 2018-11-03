import { ActionAlias1 } from './Delegates/ActionAliases';

export class XMLHttpRequestHelper {
	private static readonly _okCode: number = 200;
	private static readonly _badRequestCode: number = 400;
	public static request<TRequest, TResponse = string>(
		method: 'GET' | 'POST',
		url: string,
		content?: TRequest,
		successCallback?: ActionAlias1<TResponse | string>,
		failureCallback?: ActionAlias1<TResponse | string>,
		errorCallback?: ActionAlias1<ProgressEvent>
	): void {
		XMLHttpRequestHelper.requestBase(
			method,
			url,
			content,
			(response: string): void => {
				if (successCallback !== undefined) {
					try {
						successCallback(JSON.parse(response) as TResponse);
					} catch (error) {
						successCallback(response);
					}
				}
			},
			failureCallback,
			errorCallback
		);
	}

	private static requestBase<TRequest>(
		method: 'GET' | 'POST',
		url: string,
		content?: TRequest,
		successCallback?: ActionAlias1<string>,
		failureCallback?: ActionAlias1<string>,
		errorCallback?: ActionAlias1<ProgressEvent>
	): void {
		const request: XMLHttpRequest = new XMLHttpRequest();

		request.open(method, url, true);
		// tslint:disable-next-line:only-arrow-functions
		request.onload = function(): void {
			if (this.status >= XMLHttpRequestHelper._okCode && this.status < XMLHttpRequestHelper._badRequestCode) {
				if (successCallback !== undefined) {
					successCallback(this.response as string);
				}
			} else if (failureCallback !== undefined) {
				failureCallback(this.response as string);
			}
		};

		// tslint:disable-next-line:only-arrow-functions
		request.onerror = function(progressEvent: ProgressEvent): void {
			if (errorCallback !== undefined) {
				errorCallback(progressEvent);
			}
		};

		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		if (method === 'POST') {
			request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		}

		request.send(JSON.stringify(content));
	}
}
