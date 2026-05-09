import { t as __commonJSMin } from "../_runtime.mjs";
import { t as PostalMime } from "./postal-mime.mjs";
import { t as require_base64 } from "./stablelib__base64.mjs";
import { t as require_sha256 } from "./fast-sha256.mjs";
//#region node_modules/svix/dist/models/applicationIn.js
var require_applicationIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApplicationInSerializer = void 0;
	exports.ApplicationInSerializer = {
		_fromJsonObject(object) {
			return {
				metadata: object["metadata"],
				name: object["name"],
				rateLimit: object["rateLimit"],
				throttleRate: object["throttleRate"],
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			return {
				metadata: self.metadata,
				name: self.name,
				rateLimit: self.rateLimit,
				throttleRate: self.throttleRate,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/applicationOut.js
var require_applicationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApplicationOutSerializer = void 0;
	exports.ApplicationOutSerializer = {
		_fromJsonObject(object) {
			return {
				createdAt: new Date(object["createdAt"]),
				id: object["id"],
				metadata: object["metadata"],
				name: object["name"],
				rateLimit: object["rateLimit"],
				throttleRate: object["throttleRate"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				createdAt: self.createdAt,
				id: self.id,
				metadata: self.metadata,
				name: self.name,
				rateLimit: self.rateLimit,
				throttleRate: self.throttleRate,
				uid: self.uid,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/applicationPatch.js
var require_applicationPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApplicationPatchSerializer = void 0;
	exports.ApplicationPatchSerializer = {
		_fromJsonObject(object) {
			return {
				metadata: object["metadata"],
				name: object["name"],
				rateLimit: object["rateLimit"],
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			return {
				metadata: self.metadata,
				name: self.name,
				rateLimit: self.rateLimit,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseApplicationOut.js
var require_listResponseApplicationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseApplicationOutSerializer = void 0;
	var applicationOut_1 = require_applicationOut();
	exports.ListResponseApplicationOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => applicationOut_1.ApplicationOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => applicationOut_1.ApplicationOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApiException = void 0;
	var ApiException = class extends Error {
		constructor(code, body, headers) {
			super(`HTTP-Code: ${code}\nHeaders: ${JSON.stringify(headers)}`);
			this.code = code;
			this.body = body;
			this.headers = {};
			headers.forEach((value, name) => {
				this.headers[name] = value;
			});
		}
	};
	exports.ApiException = ApiException;
}));
//#endregion
//#region node_modules/svix/dist/request.js
var require_request = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SvixRequest = exports.HttpMethod = exports.LIB_VERSION = void 0;
	var util_1 = require_util();
	exports.LIB_VERSION = "1.92.2";
	var USER_AGENT = `svix-libs/${exports.LIB_VERSION}/javascript`;
	(function(HttpMethod) {
		HttpMethod["GET"] = "GET";
		HttpMethod["HEAD"] = "HEAD";
		HttpMethod["POST"] = "POST";
		HttpMethod["PUT"] = "PUT";
		HttpMethod["DELETE"] = "DELETE";
		HttpMethod["CONNECT"] = "CONNECT";
		HttpMethod["OPTIONS"] = "OPTIONS";
		HttpMethod["TRACE"] = "TRACE";
		HttpMethod["PATCH"] = "PATCH";
	})(exports.HttpMethod || (exports.HttpMethod = {}));
	var SvixRequest = class {
		constructor(method, path) {
			this.method = method;
			this.path = path;
			this.queryParams = {};
			this.headerParams = {};
		}
		setPathParam(name, value) {
			const newPath = this.path.replace(`{${name}}`, encodeURIComponent(value));
			if (this.path === newPath) throw new Error(`path parameter ${name} not found`);
			this.path = newPath;
		}
		setQueryParams(params) {
			for (const [name, value] of Object.entries(params)) this.setQueryParam(name, value);
		}
		setQueryParam(name, value) {
			if (value === void 0 || value === null) return;
			if (typeof value === "string") this.queryParams[name] = value;
			else if (typeof value === "boolean" || typeof value === "number") this.queryParams[name] = value.toString();
			else if (value instanceof Date) this.queryParams[name] = value.toISOString();
			else if (Array.isArray(value)) {
				if (value.length > 0) this.queryParams[name] = value.join(",");
			} else throw new Error(`query parameter ${name} has unsupported type`);
		}
		setHeaderParam(name, value) {
			if (value === void 0) return;
			this.headerParams[name] = value;
		}
		setBody(value) {
			this.body = JSON.stringify(value);
		}
		send(ctx, parseResponseBody) {
			return __awaiter(this, void 0, void 0, function* () {
				const response = yield this.sendInner(ctx);
				if (response.status === 204) return null;
				const responseBody = yield response.text();
				return parseResponseBody(JSON.parse(responseBody));
			});
		}
		sendNoResponseBody(ctx) {
			return __awaiter(this, void 0, void 0, function* () {
				yield this.sendInner(ctx);
			});
		}
		sendInner(ctx) {
			var _a, _b;
			return __awaiter(this, void 0, void 0, function* () {
				const url = new URL(ctx.baseUrl + this.path);
				for (const [name, value] of Object.entries(this.queryParams)) url.searchParams.set(name, value);
				if (this.headerParams["idempotency-key"] === void 0 && this.method.toUpperCase() === "POST") this.headerParams["idempotency-key"] = `auto_${crypto.randomUUID()}`;
				const randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
				if (this.body != null) this.headerParams["content-type"] = "application/json";
				const isCredentialsSupported = "credentials" in Request.prototype;
				return filterResponseForErrors(yield sendWithRetry(url, {
					method: this.method.toString(),
					body: this.body,
					headers: Object.assign({
						accept: "application/json, */*;q=0.8",
						authorization: `Bearer ${ctx.token}`,
						"user-agent": USER_AGENT,
						"svix-req-id": randomId.toString()
					}, this.headerParams),
					credentials: isCredentialsSupported ? "same-origin" : void 0,
					signal: ctx.timeout !== void 0 ? AbortSignal.timeout(ctx.timeout) : void 0
				}, ctx.retryScheduleInMs, (_a = ctx.retryScheduleInMs) === null || _a === void 0 ? void 0 : _a[0], ((_b = ctx.retryScheduleInMs) === null || _b === void 0 ? void 0 : _b.length) || ctx.numRetries, ctx.fetch));
			});
		}
	};
	exports.SvixRequest = SvixRequest;
	function filterResponseForErrors(response) {
		return __awaiter(this, void 0, void 0, function* () {
			if (response.status < 300) return response;
			const responseBody = yield response.text();
			if (response.status === 422) throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
			if (response.status >= 400 && response.status <= 499) throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
			throw new util_1.ApiException(response.status, responseBody, response.headers);
		});
	}
	function sendWithRetry(url, init, retryScheduleInMs, nextInterval = 50, triesLeft = 2, fetchImpl = fetch, retryCount = 1) {
		return __awaiter(this, void 0, void 0, function* () {
			const sleep = (interval) => new Promise((resolve) => setTimeout(resolve, interval));
			try {
				const response = yield fetchImpl(url, init);
				if (triesLeft <= 0 || response.status < 500) return response;
			} catch (e) {
				if (triesLeft <= 0) throw e;
			}
			yield sleep(nextInterval);
			init.headers["svix-retry-count"] = retryCount.toString();
			nextInterval = (retryScheduleInMs === null || retryScheduleInMs === void 0 ? void 0 : retryScheduleInMs[retryCount]) || nextInterval * 2;
			return yield sendWithRetry(url, init, retryScheduleInMs, nextInterval, --triesLeft, fetchImpl, ++retryCount);
		});
	}
}));
//#endregion
//#region node_modules/svix/dist/api/application.js
var require_application = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Application = void 0;
	var applicationIn_1 = require_applicationIn();
	var applicationOut_1 = require_applicationOut();
	var applicationPatch_1 = require_applicationPatch();
	var listResponseApplicationOut_1 = require_listResponseApplicationOut();
	var request_1 = require_request();
	var Application = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app");
			request.setQueryParams({
				exclude_apps_with_no_endpoints: options === null || options === void 0 ? void 0 : options.excludeAppsWithNoEndpoints,
				exclude_apps_with_disabled_endpoints: options === null || options === void 0 ? void 0 : options.excludeAppsWithDisabledEndpoints,
				exclude_apps_with_svix_play_endpoints: options === null || options === void 0 ? void 0 : options.excludeAppsWithSvixPlayEndpoints,
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseApplicationOut_1.ListResponseApplicationOutSerializer._fromJsonObject);
		}
		create(applicationIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
			return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
		}
		getOrCreate(applicationIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
			request.setQueryParam("get_if_exists", true);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
			return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
		}
		get(appId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}");
			request.setPathParam("app_id", appId);
			return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
		}
		update(appId, applicationIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}");
			request.setPathParam("app_id", appId);
			request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
			return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
		}
		delete(appId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}");
			request.setPathParam("app_id", appId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(appId, applicationPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}");
			request.setPathParam("app_id", appId);
			request.setBody(applicationPatch_1.ApplicationPatchSerializer._toJsonObject(applicationPatch));
			return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
		}
	};
	exports.Application = Application;
}));
//#endregion
//#region node_modules/svix/dist/models/apiTokenOut.js
var require_apiTokenOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApiTokenOutSerializer = void 0;
	exports.ApiTokenOutSerializer = {
		_fromJsonObject(object) {
			return {
				createdAt: new Date(object["createdAt"]),
				expiresAt: object["expiresAt"] ? new Date(object["expiresAt"]) : null,
				id: object["id"],
				name: object["name"],
				scopes: object["scopes"],
				token: object["token"]
			};
		},
		_toJsonObject(self) {
			return {
				createdAt: self.createdAt,
				expiresAt: self.expiresAt,
				id: self.id,
				name: self.name,
				scopes: self.scopes,
				token: self.token
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/appPortalCapability.js
var require_appPortalCapability = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppPortalCapabilitySerializer = exports.AppPortalCapability = void 0;
	(function(AppPortalCapability) {
		AppPortalCapability["ViewBase"] = "ViewBase";
		AppPortalCapability["ViewEndpointSecret"] = "ViewEndpointSecret";
		AppPortalCapability["ManageEndpointSecret"] = "ManageEndpointSecret";
		AppPortalCapability["ManageTransformations"] = "ManageTransformations";
		AppPortalCapability["CreateAttempts"] = "CreateAttempts";
		AppPortalCapability["ManageEndpoint"] = "ManageEndpoint";
	})(exports.AppPortalCapability || (exports.AppPortalCapability = {}));
	exports.AppPortalCapabilitySerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/appPortalAccessIn.js
var require_appPortalAccessIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppPortalAccessInSerializer = void 0;
	var appPortalCapability_1 = require_appPortalCapability();
	var applicationIn_1 = require_applicationIn();
	exports.AppPortalAccessInSerializer = {
		_fromJsonObject(object) {
			var _a;
			return {
				application: object["application"] != null ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"]) : void 0,
				capabilities: (_a = object["capabilities"]) === null || _a === void 0 ? void 0 : _a.map((item) => appPortalCapability_1.AppPortalCapabilitySerializer._fromJsonObject(item)),
				expiry: object["expiry"],
				featureFlags: object["featureFlags"],
				readOnly: object["readOnly"],
				sessionId: object["sessionId"]
			};
		},
		_toJsonObject(self) {
			var _a;
			return {
				application: self.application != null ? applicationIn_1.ApplicationInSerializer._toJsonObject(self.application) : void 0,
				capabilities: (_a = self.capabilities) === null || _a === void 0 ? void 0 : _a.map((item) => appPortalCapability_1.AppPortalCapabilitySerializer._toJsonObject(item)),
				expiry: self.expiry,
				featureFlags: self.featureFlags,
				readOnly: self.readOnly,
				sessionId: self.sessionId
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/appPortalAccessOut.js
var require_appPortalAccessOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppPortalAccessOutSerializer = void 0;
	exports.AppPortalAccessOutSerializer = {
		_fromJsonObject(object) {
			return {
				token: object["token"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				token: self.token,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/applicationTokenExpireIn.js
var require_applicationTokenExpireIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApplicationTokenExpireInSerializer = void 0;
	exports.ApplicationTokenExpireInSerializer = {
		_fromJsonObject(object) {
			return {
				expiry: object["expiry"],
				sessionIds: object["sessionIds"]
			};
		},
		_toJsonObject(self) {
			return {
				expiry: self.expiry,
				sessionIds: self.sessionIds
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/rotatePollerTokenIn.js
var require_rotatePollerTokenIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RotatePollerTokenInSerializer = void 0;
	exports.RotatePollerTokenInSerializer = {
		_fromJsonObject(object) {
			return {
				expiry: object["expiry"],
				oldTokenExpiry: object["oldTokenExpiry"]
			};
		},
		_toJsonObject(self) {
			return {
				expiry: self.expiry,
				oldTokenExpiry: self.oldTokenExpiry
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamPortalAccessIn.js
var require_streamPortalAccessIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamPortalAccessInSerializer = void 0;
	exports.StreamPortalAccessInSerializer = {
		_fromJsonObject(object) {
			return {
				expiry: object["expiry"],
				featureFlags: object["featureFlags"],
				sessionId: object["sessionId"]
			};
		},
		_toJsonObject(self) {
			return {
				expiry: self.expiry,
				featureFlags: self.featureFlags,
				sessionId: self.sessionId
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamTokenExpireIn.js
var require_streamTokenExpireIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamTokenExpireInSerializer = void 0;
	exports.StreamTokenExpireInSerializer = {
		_fromJsonObject(object) {
			return {
				expiry: object["expiry"],
				sessionIds: object["sessionIds"]
			};
		},
		_toJsonObject(self) {
			return {
				expiry: self.expiry,
				sessionIds: self.sessionIds
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/dashboardAccessOut.js
var require_dashboardAccessOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DashboardAccessOutSerializer = void 0;
	exports.DashboardAccessOutSerializer = {
		_fromJsonObject(object) {
			return {
				token: object["token"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				token: self.token,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/authentication.js
var require_authentication = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Authentication = void 0;
	var apiTokenOut_1 = require_apiTokenOut();
	var appPortalAccessIn_1 = require_appPortalAccessIn();
	var appPortalAccessOut_1 = require_appPortalAccessOut();
	var applicationTokenExpireIn_1 = require_applicationTokenExpireIn();
	var rotatePollerTokenIn_1 = require_rotatePollerTokenIn();
	var streamPortalAccessIn_1 = require_streamPortalAccessIn();
	var streamTokenExpireIn_1 = require_streamTokenExpireIn();
	var dashboardAccessOut_1 = require_dashboardAccessOut();
	var request_1 = require_request();
	var Authentication = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		appPortalAccess(appId, appPortalAccessIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app-portal-access/{app_id}");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(appPortalAccessIn_1.AppPortalAccessInSerializer._toJsonObject(appPortalAccessIn));
			return request.send(this.requestCtx, appPortalAccessOut_1.AppPortalAccessOutSerializer._fromJsonObject);
		}
		expireAll(appId, applicationTokenExpireIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app/{app_id}/expire-all");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(applicationTokenExpireIn_1.ApplicationTokenExpireInSerializer._toJsonObject(applicationTokenExpireIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		dashboardAccess(appId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/dashboard-access/{app_id}");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
		}
		logout(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/logout");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.sendNoResponseBody(this.requestCtx);
		}
		streamLogout(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/stream-logout");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.sendNoResponseBody(this.requestCtx);
		}
		streamPortalAccess(streamId, streamPortalAccessIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/stream-portal-access/{stream_id}");
			request.setPathParam("stream_id", streamId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(streamPortalAccessIn_1.StreamPortalAccessInSerializer._toJsonObject(streamPortalAccessIn));
			return request.send(this.requestCtx, appPortalAccessOut_1.AppPortalAccessOutSerializer._fromJsonObject);
		}
		streamExpireAll(streamId, streamTokenExpireIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/stream/{stream_id}/expire-all");
			request.setPathParam("stream_id", streamId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(streamTokenExpireIn_1.StreamTokenExpireInSerializer._toJsonObject(streamTokenExpireIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		getStreamPollerToken(streamId, sinkId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/auth/stream/{stream_id}/sink/{sink_id}/poller/token");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			return request.send(this.requestCtx, apiTokenOut_1.ApiTokenOutSerializer._fromJsonObject);
		}
		rotateStreamPollerToken(streamId, sinkId, rotatePollerTokenIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/stream/{stream_id}/sink/{sink_id}/poller/token/rotate");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(rotatePollerTokenIn_1.RotatePollerTokenInSerializer._toJsonObject(rotatePollerTokenIn));
			return request.send(this.requestCtx, apiTokenOut_1.ApiTokenOutSerializer._fromJsonObject);
		}
	};
	exports.Authentication = Authentication;
}));
//#endregion
//#region node_modules/svix/dist/models/backgroundTaskStatus.js
var require_backgroundTaskStatus = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BackgroundTaskStatusSerializer = exports.BackgroundTaskStatus = void 0;
	(function(BackgroundTaskStatus) {
		BackgroundTaskStatus["Running"] = "running";
		BackgroundTaskStatus["Finished"] = "finished";
		BackgroundTaskStatus["Failed"] = "failed";
	})(exports.BackgroundTaskStatus || (exports.BackgroundTaskStatus = {}));
	exports.BackgroundTaskStatusSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/backgroundTaskType.js
var require_backgroundTaskType = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BackgroundTaskTypeSerializer = exports.BackgroundTaskType = void 0;
	(function(BackgroundTaskType) {
		BackgroundTaskType["EndpointReplay"] = "endpoint.replay";
		BackgroundTaskType["EndpointRecover"] = "endpoint.recover";
		BackgroundTaskType["ApplicationStats"] = "application.stats";
		BackgroundTaskType["MessageBroadcast"] = "message.broadcast";
		BackgroundTaskType["SdkGenerate"] = "sdk.generate";
		BackgroundTaskType["EventTypeAggregate"] = "event-type.aggregate";
		BackgroundTaskType["ApplicationPurgeContent"] = "application.purge_content";
		BackgroundTaskType["EndpointBulkReplay"] = "endpoint.bulk-replay";
	})(exports.BackgroundTaskType || (exports.BackgroundTaskType = {}));
	exports.BackgroundTaskTypeSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/backgroundTaskOut.js
var require_backgroundTaskOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BackgroundTaskOutSerializer = void 0;
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	var backgroundTaskType_1 = require_backgroundTaskType();
	exports.BackgroundTaskOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"],
				id: object["id"],
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data,
				id: self.id,
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseBackgroundTaskOut.js
var require_listResponseBackgroundTaskOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseBackgroundTaskOutSerializer = void 0;
	var backgroundTaskOut_1 = require_backgroundTaskOut();
	exports.ListResponseBackgroundTaskOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/backgroundTask.js
var require_backgroundTask = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BackgroundTask = void 0;
	var backgroundTaskOut_1 = require_backgroundTaskOut();
	var listResponseBackgroundTaskOut_1 = require_listResponseBackgroundTaskOut();
	var request_1 = require_request();
	var BackgroundTask = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task");
			request.setQueryParams({
				status: options === null || options === void 0 ? void 0 : options.status,
				task: options === null || options === void 0 ? void 0 : options.task,
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseBackgroundTaskOut_1.ListResponseBackgroundTaskOutSerializer._fromJsonObject);
		}
		listByEndpoint(options) {
			return this.list(options);
		}
		get(taskId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task/{task_id}");
			request.setPathParam("task_id", taskId);
			return request.send(this.requestCtx, backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject);
		}
	};
	exports.BackgroundTask = BackgroundTask;
}));
//#endregion
//#region node_modules/svix/dist/models/connectorKind.js
var require_connectorKind = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConnectorKindSerializer = exports.ConnectorKind = void 0;
	(function(ConnectorKind) {
		ConnectorKind["Custom"] = "Custom";
		ConnectorKind["AgenticCommerceProtocol"] = "AgenticCommerceProtocol";
		ConnectorKind["CloseCrm"] = "CloseCRM";
		ConnectorKind["CustomerIo"] = "CustomerIO";
		ConnectorKind["Discord"] = "Discord";
		ConnectorKind["Hubspot"] = "Hubspot";
		ConnectorKind["Inngest"] = "Inngest";
		ConnectorKind["Loops"] = "Loops";
		ConnectorKind["Otel"] = "Otel";
		ConnectorKind["Resend"] = "Resend";
		ConnectorKind["Salesforce"] = "Salesforce";
		ConnectorKind["Segment"] = "Segment";
		ConnectorKind["Sendgrid"] = "Sendgrid";
		ConnectorKind["Slack"] = "Slack";
		ConnectorKind["Teams"] = "Teams";
		ConnectorKind["TriggerDev"] = "TriggerDev";
		ConnectorKind["Windmill"] = "Windmill";
		ConnectorKind["Zapier"] = "Zapier";
	})(exports.ConnectorKind || (exports.ConnectorKind = {}));
	exports.ConnectorKindSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/connectorProduct.js
var require_connectorProduct = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConnectorProductSerializer = exports.ConnectorProduct = void 0;
	(function(ConnectorProduct) {
		ConnectorProduct["Dispatch"] = "Dispatch";
		ConnectorProduct["Stream"] = "Stream";
	})(exports.ConnectorProduct || (exports.ConnectorProduct = {}));
	exports.ConnectorProductSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/connectorIn.js
var require_connectorIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConnectorInSerializer = void 0;
	var connectorKind_1 = require_connectorKind();
	var connectorProduct_1 = require_connectorProduct();
	exports.ConnectorInSerializer = {
		_fromJsonObject(object) {
			return {
				allowedEventTypes: object["allowedEventTypes"],
				description: object["description"],
				featureFlags: object["featureFlags"],
				instructions: object["instructions"],
				kind: object["kind"] != null ? connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]) : void 0,
				logo: object["logo"],
				name: object["name"],
				productType: object["productType"] != null ? connectorProduct_1.ConnectorProductSerializer._fromJsonObject(object["productType"]) : void 0,
				transformation: object["transformation"],
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			return {
				allowedEventTypes: self.allowedEventTypes,
				description: self.description,
				featureFlags: self.featureFlags,
				instructions: self.instructions,
				kind: self.kind != null ? connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind) : void 0,
				logo: self.logo,
				name: self.name,
				productType: self.productType != null ? connectorProduct_1.ConnectorProductSerializer._toJsonObject(self.productType) : void 0,
				transformation: self.transformation,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/connectorOut.js
var require_connectorOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConnectorOutSerializer = void 0;
	var connectorKind_1 = require_connectorKind();
	var connectorProduct_1 = require_connectorProduct();
	exports.ConnectorOutSerializer = {
		_fromJsonObject(object) {
			return {
				allowedEventTypes: object["allowedEventTypes"],
				createdAt: new Date(object["createdAt"]),
				description: object["description"],
				featureFlags: object["featureFlags"],
				id: object["id"],
				instructions: object["instructions"],
				kind: connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]),
				logo: object["logo"],
				name: object["name"],
				orgId: object["orgId"],
				productType: connectorProduct_1.ConnectorProductSerializer._fromJsonObject(object["productType"]),
				transformation: object["transformation"],
				transformationUpdatedAt: new Date(object["transformationUpdatedAt"]),
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				allowedEventTypes: self.allowedEventTypes,
				createdAt: self.createdAt,
				description: self.description,
				featureFlags: self.featureFlags,
				id: self.id,
				instructions: self.instructions,
				kind: connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind),
				logo: self.logo,
				name: self.name,
				orgId: self.orgId,
				productType: connectorProduct_1.ConnectorProductSerializer._toJsonObject(self.productType),
				transformation: self.transformation,
				transformationUpdatedAt: self.transformationUpdatedAt,
				uid: self.uid,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/connectorPatch.js
var require_connectorPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConnectorPatchSerializer = void 0;
	var connectorKind_1 = require_connectorKind();
	exports.ConnectorPatchSerializer = {
		_fromJsonObject(object) {
			return {
				allowedEventTypes: object["allowedEventTypes"],
				description: object["description"],
				featureFlags: object["featureFlags"],
				instructions: object["instructions"],
				kind: object["kind"] != null ? connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]) : void 0,
				logo: object["logo"],
				name: object["name"],
				transformation: object["transformation"]
			};
		},
		_toJsonObject(self) {
			return {
				allowedEventTypes: self.allowedEventTypes,
				description: self.description,
				featureFlags: self.featureFlags,
				instructions: self.instructions,
				kind: self.kind != null ? connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind) : void 0,
				logo: self.logo,
				name: self.name,
				transformation: self.transformation
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/connectorUpdate.js
var require_connectorUpdate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ConnectorUpdateSerializer = void 0;
	var connectorKind_1 = require_connectorKind();
	exports.ConnectorUpdateSerializer = {
		_fromJsonObject(object) {
			return {
				allowedEventTypes: object["allowedEventTypes"],
				description: object["description"],
				featureFlags: object["featureFlags"],
				instructions: object["instructions"],
				kind: object["kind"] != null ? connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]) : void 0,
				logo: object["logo"],
				name: object["name"],
				transformation: object["transformation"]
			};
		},
		_toJsonObject(self) {
			return {
				allowedEventTypes: self.allowedEventTypes,
				description: self.description,
				featureFlags: self.featureFlags,
				instructions: self.instructions,
				kind: self.kind != null ? connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind) : void 0,
				logo: self.logo,
				name: self.name,
				transformation: self.transformation
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseConnectorOut.js
var require_listResponseConnectorOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseConnectorOutSerializer = void 0;
	var connectorOut_1 = require_connectorOut();
	exports.ListResponseConnectorOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => connectorOut_1.ConnectorOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => connectorOut_1.ConnectorOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/connector.js
var require_connector = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Connector = void 0;
	var connectorIn_1 = require_connectorIn();
	var connectorOut_1 = require_connectorOut();
	var connectorPatch_1 = require_connectorPatch();
	var connectorUpdate_1 = require_connectorUpdate();
	var listResponseConnectorOut_1 = require_listResponseConnectorOut();
	var request_1 = require_request();
	var Connector = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/connector");
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order,
				product_type: options === null || options === void 0 ? void 0 : options.productType
			});
			return request.send(this.requestCtx, listResponseConnectorOut_1.ListResponseConnectorOutSerializer._fromJsonObject);
		}
		create(connectorIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/connector");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(connectorIn_1.ConnectorInSerializer._toJsonObject(connectorIn));
			return request.send(this.requestCtx, connectorOut_1.ConnectorOutSerializer._fromJsonObject);
		}
		get(connectorId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/connector/{connector_id}");
			request.setPathParam("connector_id", connectorId);
			return request.send(this.requestCtx, connectorOut_1.ConnectorOutSerializer._fromJsonObject);
		}
		update(connectorId, connectorUpdate) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/connector/{connector_id}");
			request.setPathParam("connector_id", connectorId);
			request.setBody(connectorUpdate_1.ConnectorUpdateSerializer._toJsonObject(connectorUpdate));
			return request.send(this.requestCtx, connectorOut_1.ConnectorOutSerializer._fromJsonObject);
		}
		delete(connectorId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/connector/{connector_id}");
			request.setPathParam("connector_id", connectorId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(connectorId, connectorPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/connector/{connector_id}");
			request.setPathParam("connector_id", connectorId);
			request.setBody(connectorPatch_1.ConnectorPatchSerializer._toJsonObject(connectorPatch));
			return request.send(this.requestCtx, connectorOut_1.ConnectorOutSerializer._fromJsonObject);
		}
	};
	exports.Connector = Connector;
}));
//#endregion
//#region node_modules/svix/dist/models/messageStatus.js
var require_messageStatus = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageStatusSerializer = exports.MessageStatus = void 0;
	(function(MessageStatus) {
		MessageStatus[MessageStatus["Success"] = 0] = "Success";
		MessageStatus[MessageStatus["Pending"] = 1] = "Pending";
		MessageStatus[MessageStatus["Fail"] = 2] = "Fail";
		MessageStatus[MessageStatus["Sending"] = 3] = "Sending";
	})(exports.MessageStatus || (exports.MessageStatus = {}));
	exports.MessageStatusSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/statusCodeClass.js
var require_statusCodeClass = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StatusCodeClassSerializer = exports.StatusCodeClass = void 0;
	(function(StatusCodeClass) {
		StatusCodeClass[StatusCodeClass["CodeNone"] = 0] = "CodeNone";
		StatusCodeClass[StatusCodeClass["Code1xx"] = 100] = "Code1xx";
		StatusCodeClass[StatusCodeClass["Code2xx"] = 200] = "Code2xx";
		StatusCodeClass[StatusCodeClass["Code3xx"] = 300] = "Code3xx";
		StatusCodeClass[StatusCodeClass["Code4xx"] = 400] = "Code4xx";
		StatusCodeClass[StatusCodeClass["Code5xx"] = 500] = "Code5xx";
	})(exports.StatusCodeClass || (exports.StatusCodeClass = {}));
	exports.StatusCodeClassSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/bulkReplayIn.js
var require_bulkReplayIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BulkReplayInSerializer = void 0;
	var messageStatus_1 = require_messageStatus();
	var statusCodeClass_1 = require_statusCodeClass();
	exports.BulkReplayInSerializer = {
		_fromJsonObject(object) {
			return {
				channel: object["channel"],
				eventTypes: object["eventTypes"],
				since: new Date(object["since"]),
				status: object["status"] != null ? messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]) : void 0,
				statusCodeClass: object["statusCodeClass"] != null ? statusCodeClass_1.StatusCodeClassSerializer._fromJsonObject(object["statusCodeClass"]) : void 0,
				tag: object["tag"],
				until: object["until"] ? new Date(object["until"]) : null
			};
		},
		_toJsonObject(self) {
			return {
				channel: self.channel,
				eventTypes: self.eventTypes,
				since: self.since,
				status: self.status != null ? messageStatus_1.MessageStatusSerializer._toJsonObject(self.status) : void 0,
				statusCodeClass: self.statusCodeClass != null ? statusCodeClass_1.StatusCodeClassSerializer._toJsonObject(self.statusCodeClass) : void 0,
				tag: self.tag,
				until: self.until
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointHeadersIn.js
var require_endpointHeadersIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointHeadersInSerializer = void 0;
	exports.EndpointHeadersInSerializer = {
		_fromJsonObject(object) {
			return { headers: object["headers"] };
		},
		_toJsonObject(self) {
			return { headers: self.headers };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointHeadersOut.js
var require_endpointHeadersOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointHeadersOutSerializer = void 0;
	exports.EndpointHeadersOutSerializer = {
		_fromJsonObject(object) {
			return {
				headers: object["headers"],
				sensitive: object["sensitive"]
			};
		},
		_toJsonObject(self) {
			return {
				headers: self.headers,
				sensitive: self.sensitive
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointHeadersPatchIn.js
var require_endpointHeadersPatchIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointHeadersPatchInSerializer = void 0;
	exports.EndpointHeadersPatchInSerializer = {
		_fromJsonObject(object) {
			return {
				deleteHeaders: object["deleteHeaders"],
				headers: object["headers"]
			};
		},
		_toJsonObject(self) {
			return {
				deleteHeaders: self.deleteHeaders,
				headers: self.headers
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointIn.js
var require_endpointIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointInSerializer = void 0;
	exports.EndpointInSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				headers: object["headers"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				secret: object["secret"],
				throttleRate: object["throttleRate"],
				uid: object["uid"],
				url: object["url"],
				version: object["version"]
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				headers: self.headers,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				secret: self.secret,
				throttleRate: self.throttleRate,
				uid: self.uid,
				url: self.url,
				version: self.version
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointOut.js
var require_endpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointOutSerializer = void 0;
	exports.EndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				createdAt: new Date(object["createdAt"]),
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				id: object["id"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				throttleRate: object["throttleRate"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"]),
				url: object["url"],
				version: object["version"]
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				createdAt: self.createdAt,
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				id: self.id,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				throttleRate: self.throttleRate,
				uid: self.uid,
				updatedAt: self.updatedAt,
				url: self.url,
				version: self.version
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointPatch.js
var require_endpointPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointPatchSerializer = void 0;
	exports.EndpointPatchSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				secret: object["secret"],
				throttleRate: object["throttleRate"],
				uid: object["uid"],
				url: object["url"],
				version: object["version"]
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				secret: self.secret,
				throttleRate: self.throttleRate,
				uid: self.uid,
				url: self.url,
				version: self.version
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointSecretOut.js
var require_endpointSecretOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointSecretOutSerializer = void 0;
	exports.EndpointSecretOutSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointSecretRotateIn.js
var require_endpointSecretRotateIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointSecretRotateInSerializer = void 0;
	exports.EndpointSecretRotateInSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointStats.js
var require_endpointStats = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointStatsSerializer = void 0;
	exports.EndpointStatsSerializer = {
		_fromJsonObject(object) {
			return {
				fail: object["fail"],
				pending: object["pending"],
				sending: object["sending"],
				success: object["success"]
			};
		},
		_toJsonObject(self) {
			return {
				fail: self.fail,
				pending: self.pending,
				sending: self.sending,
				success: self.success
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointTransformationIn.js
var require_endpointTransformationIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointTransformationInSerializer = void 0;
	exports.EndpointTransformationInSerializer = {
		_fromJsonObject(object) {
			return {
				code: object["code"],
				enabled: object["enabled"]
			};
		},
		_toJsonObject(self) {
			return {
				code: self.code,
				enabled: self.enabled
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointTransformationOut.js
var require_endpointTransformationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointTransformationOutSerializer = void 0;
	exports.EndpointTransformationOutSerializer = {
		_fromJsonObject(object) {
			return {
				code: object["code"],
				enabled: object["enabled"],
				updatedAt: object["updatedAt"] ? new Date(object["updatedAt"]) : null
			};
		},
		_toJsonObject(self) {
			return {
				code: self.code,
				enabled: self.enabled,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointTransformationPatch.js
var require_endpointTransformationPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointTransformationPatchSerializer = void 0;
	exports.EndpointTransformationPatchSerializer = {
		_fromJsonObject(object) {
			return {
				code: object["code"],
				enabled: object["enabled"]
			};
		},
		_toJsonObject(self) {
			return {
				code: self.code,
				enabled: self.enabled
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointUpdate.js
var require_endpointUpdate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointUpdateSerializer = void 0;
	exports.EndpointUpdateSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				throttleRate: object["throttleRate"],
				uid: object["uid"],
				url: object["url"],
				version: object["version"]
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				throttleRate: self.throttleRate,
				uid: self.uid,
				url: self.url,
				version: self.version
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventExampleIn.js
var require_eventExampleIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventExampleInSerializer = void 0;
	exports.EventExampleInSerializer = {
		_fromJsonObject(object) {
			return {
				eventType: object["eventType"],
				exampleIndex: object["exampleIndex"]
			};
		},
		_toJsonObject(self) {
			return {
				eventType: self.eventType,
				exampleIndex: self.exampleIndex
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseEndpointOut.js
var require_listResponseEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseEndpointOutSerializer = void 0;
	var endpointOut_1 = require_endpointOut();
	exports.ListResponseEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => endpointOut_1.EndpointOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => endpointOut_1.EndpointOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messageOut.js
var require_messageOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageOutSerializer = void 0;
	exports.MessageOutSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				deliverAt: object["deliverAt"] ? new Date(object["deliverAt"]) : null,
				eventId: object["eventId"],
				eventType: object["eventType"],
				id: object["id"],
				payload: object["payload"],
				tags: object["tags"],
				timestamp: new Date(object["timestamp"])
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				deliverAt: self.deliverAt,
				eventId: self.eventId,
				eventType: self.eventType,
				id: self.id,
				payload: self.payload,
				tags: self.tags,
				timestamp: self.timestamp
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/recoverIn.js
var require_recoverIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RecoverInSerializer = void 0;
	exports.RecoverInSerializer = {
		_fromJsonObject(object) {
			return {
				since: new Date(object["since"]),
				until: object["until"] ? new Date(object["until"]) : null
			};
		},
		_toJsonObject(self) {
			return {
				since: self.since,
				until: self.until
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/recoverOut.js
var require_recoverOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RecoverOutSerializer = void 0;
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	var backgroundTaskType_1 = require_backgroundTaskType();
	exports.RecoverOutSerializer = {
		_fromJsonObject(object) {
			return {
				id: object["id"],
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				id: self.id,
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/replayIn.js
var require_replayIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReplayInSerializer = void 0;
	exports.ReplayInSerializer = {
		_fromJsonObject(object) {
			return {
				since: new Date(object["since"]),
				until: object["until"] ? new Date(object["until"]) : null
			};
		},
		_toJsonObject(self) {
			return {
				since: self.since,
				until: self.until
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/replayOut.js
var require_replayOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReplayOutSerializer = void 0;
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	var backgroundTaskType_1 = require_backgroundTaskType();
	exports.ReplayOutSerializer = {
		_fromJsonObject(object) {
			return {
				id: object["id"],
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				id: self.id,
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/endpoint.js
var require_endpoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Endpoint = void 0;
	var bulkReplayIn_1 = require_bulkReplayIn();
	var endpointHeadersIn_1 = require_endpointHeadersIn();
	var endpointHeadersOut_1 = require_endpointHeadersOut();
	var endpointHeadersPatchIn_1 = require_endpointHeadersPatchIn();
	var endpointIn_1 = require_endpointIn();
	var endpointOut_1 = require_endpointOut();
	var endpointPatch_1 = require_endpointPatch();
	var endpointSecretOut_1 = require_endpointSecretOut();
	var endpointSecretRotateIn_1 = require_endpointSecretRotateIn();
	var endpointStats_1 = require_endpointStats();
	var endpointTransformationIn_1 = require_endpointTransformationIn();
	var endpointTransformationOut_1 = require_endpointTransformationOut();
	var endpointTransformationPatch_1 = require_endpointTransformationPatch();
	var endpointUpdate_1 = require_endpointUpdate();
	var eventExampleIn_1 = require_eventExampleIn();
	var listResponseEndpointOut_1 = require_listResponseEndpointOut();
	var messageOut_1 = require_messageOut();
	var recoverIn_1 = require_recoverIn();
	var recoverOut_1 = require_recoverOut();
	var replayIn_1 = require_replayIn();
	var replayOut_1 = require_replayOut();
	var request_1 = require_request();
	var Endpoint = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(appId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint");
			request.setPathParam("app_id", appId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseEndpointOut_1.ListResponseEndpointOutSerializer._fromJsonObject);
		}
		create(appId, endpointIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(endpointIn_1.EndpointInSerializer._toJsonObject(endpointIn));
			return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
		}
		get(appId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
		}
		update(appId, endpointId, endpointUpdate) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(endpointUpdate_1.EndpointUpdateSerializer._toJsonObject(endpointUpdate));
			return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
		}
		delete(appId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(appId, endpointId, endpointPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(endpointPatch_1.EndpointPatchSerializer._toJsonObject(endpointPatch));
			return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
		}
		bulkReplay(appId, endpointId, bulkReplayIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/bulk-replay");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(bulkReplayIn_1.BulkReplayInSerializer._toJsonObject(bulkReplayIn));
			return request.send(this.requestCtx, replayOut_1.ReplayOutSerializer._fromJsonObject);
		}
		getHeaders(appId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, endpointHeadersOut_1.EndpointHeadersOutSerializer._fromJsonObject);
		}
		updateHeaders(appId, endpointId, endpointHeadersIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(endpointHeadersIn_1.EndpointHeadersInSerializer._toJsonObject(endpointHeadersIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		headersUpdate(appId, endpointId, endpointHeadersIn) {
			return this.updateHeaders(appId, endpointId, endpointHeadersIn);
		}
		patchHeaders(appId, endpointId, endpointHeadersPatchIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(endpointHeadersPatchIn_1.EndpointHeadersPatchInSerializer._toJsonObject(endpointHeadersPatchIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		headersPatch(appId, endpointId, endpointHeadersPatchIn) {
			return this.patchHeaders(appId, endpointId, endpointHeadersPatchIn);
		}
		recover(appId, endpointId, recoverIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/recover");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(recoverIn_1.RecoverInSerializer._toJsonObject(recoverIn));
			return request.send(this.requestCtx, recoverOut_1.RecoverOutSerializer._fromJsonObject);
		}
		replayMissing(appId, endpointId, replayIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/replay-missing");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(replayIn_1.ReplayInSerializer._toJsonObject(replayIn));
			return request.send(this.requestCtx, replayOut_1.ReplayOutSerializer._fromJsonObject);
		}
		getSecret(appId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, endpointSecretOut_1.EndpointSecretOutSerializer._fromJsonObject);
		}
		rotateSecret(appId, endpointId, endpointSecretRotateIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/rotate");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(endpointSecretRotateIn_1.EndpointSecretRotateInSerializer._toJsonObject(endpointSecretRotateIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		sendExample(appId, endpointId, eventExampleIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/send-example");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(eventExampleIn_1.EventExampleInSerializer._toJsonObject(eventExampleIn));
			return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
		}
		getStats(appId, endpointId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/stats");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setQueryParams({
				since: options === null || options === void 0 ? void 0 : options.since,
				until: options === null || options === void 0 ? void 0 : options.until
			});
			return request.send(this.requestCtx, endpointStats_1.EndpointStatsSerializer._fromJsonObject);
		}
		transformationGet(appId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, endpointTransformationOut_1.EndpointTransformationOutSerializer._fromJsonObject);
		}
		patchTransformation(appId, endpointId, endpointTransformationPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(endpointTransformationPatch_1.EndpointTransformationPatchSerializer._toJsonObject(endpointTransformationPatch));
			return request.sendNoResponseBody(this.requestCtx);
		}
		transformationPartialUpdate(appId, endpointId, endpointTransformationIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(endpointTransformationIn_1.EndpointTransformationInSerializer._toJsonObject(endpointTransformationIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
	};
	exports.Endpoint = Endpoint;
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeIn.js
var require_eventTypeIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeInSerializer = void 0;
	exports.EventTypeInSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlag: object["featureFlag"],
				featureFlags: object["featureFlags"],
				groupName: object["groupName"],
				name: object["name"],
				schemas: object["schemas"]
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				deprecated: self.deprecated,
				description: self.description,
				featureFlag: self.featureFlag,
				featureFlags: self.featureFlags,
				groupName: self.groupName,
				name: self.name,
				schemas: self.schemas
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/environmentIn.js
var require_environmentIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EnvironmentInSerializer = void 0;
	var connectorIn_1 = require_connectorIn();
	var eventTypeIn_1 = require_eventTypeIn();
	exports.EnvironmentInSerializer = {
		_fromJsonObject(object) {
			var _a, _b;
			return {
				connectors: (_a = object["connectors"]) === null || _a === void 0 ? void 0 : _a.map((item) => connectorIn_1.ConnectorInSerializer._fromJsonObject(item)),
				eventTypes: (_b = object["eventTypes"]) === null || _b === void 0 ? void 0 : _b.map((item) => eventTypeIn_1.EventTypeInSerializer._fromJsonObject(item)),
				settings: object["settings"]
			};
		},
		_toJsonObject(self) {
			var _a, _b;
			return {
				connectors: (_a = self.connectors) === null || _a === void 0 ? void 0 : _a.map((item) => connectorIn_1.ConnectorInSerializer._toJsonObject(item)),
				eventTypes: (_b = self.eventTypes) === null || _b === void 0 ? void 0 : _b.map((item) => eventTypeIn_1.EventTypeInSerializer._toJsonObject(item)),
				settings: self.settings
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeOut.js
var require_eventTypeOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeOutSerializer = void 0;
	exports.EventTypeOutSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				createdAt: new Date(object["createdAt"]),
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlag: object["featureFlag"],
				featureFlags: object["featureFlags"],
				groupName: object["groupName"],
				name: object["name"],
				schemas: object["schemas"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				createdAt: self.createdAt,
				deprecated: self.deprecated,
				description: self.description,
				featureFlag: self.featureFlag,
				featureFlags: self.featureFlags,
				groupName: self.groupName,
				name: self.name,
				schemas: self.schemas,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/environmentOut.js
var require_environmentOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EnvironmentOutSerializer = void 0;
	var connectorOut_1 = require_connectorOut();
	var eventTypeOut_1 = require_eventTypeOut();
	exports.EnvironmentOutSerializer = {
		_fromJsonObject(object) {
			return {
				connectors: object["connectors"].map((item) => connectorOut_1.ConnectorOutSerializer._fromJsonObject(item)),
				createdAt: new Date(object["createdAt"]),
				eventTypes: object["eventTypes"].map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
				settings: object["settings"],
				version: object["version"]
			};
		},
		_toJsonObject(self) {
			return {
				connectors: self.connectors.map((item) => connectorOut_1.ConnectorOutSerializer._toJsonObject(item)),
				createdAt: self.createdAt,
				eventTypes: self.eventTypes.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
				settings: self.settings,
				version: self.version
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/environment.js
var require_environment = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Environment = void 0;
	var environmentIn_1 = require_environmentIn();
	var environmentOut_1 = require_environmentOut();
	var request_1 = require_request();
	var Environment = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		export(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/environment/export");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.send(this.requestCtx, environmentOut_1.EnvironmentOutSerializer._fromJsonObject);
		}
		import(environmentIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/environment/import");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(environmentIn_1.EnvironmentInSerializer._toJsonObject(environmentIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
	};
	exports.Environment = Environment;
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeImportOpenApiIn.js
var require_eventTypeImportOpenApiIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeImportOpenApiInSerializer = void 0;
	exports.EventTypeImportOpenApiInSerializer = {
		_fromJsonObject(object) {
			return {
				dryRun: object["dryRun"],
				replaceAll: object["replaceAll"],
				spec: object["spec"],
				specRaw: object["specRaw"]
			};
		},
		_toJsonObject(self) {
			return {
				dryRun: self.dryRun,
				replaceAll: self.replaceAll,
				spec: self.spec,
				specRaw: self.specRaw
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeFromOpenApi.js
var require_eventTypeFromOpenApi = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeFromOpenApiSerializer = void 0;
	exports.EventTypeFromOpenApiSerializer = {
		_fromJsonObject(object) {
			return {
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlag: object["featureFlag"],
				featureFlags: object["featureFlags"],
				groupName: object["groupName"],
				name: object["name"],
				schemas: object["schemas"]
			};
		},
		_toJsonObject(self) {
			return {
				deprecated: self.deprecated,
				description: self.description,
				featureFlag: self.featureFlag,
				featureFlags: self.featureFlags,
				groupName: self.groupName,
				name: self.name,
				schemas: self.schemas
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeImportOpenApiOutData.js
var require_eventTypeImportOpenApiOutData = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeImportOpenApiOutDataSerializer = void 0;
	var eventTypeFromOpenApi_1 = require_eventTypeFromOpenApi();
	exports.EventTypeImportOpenApiOutDataSerializer = {
		_fromJsonObject(object) {
			var _a;
			return {
				modified: object["modified"],
				toModify: (_a = object["to_modify"]) === null || _a === void 0 ? void 0 : _a.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._fromJsonObject(item))
			};
		},
		_toJsonObject(self) {
			var _a;
			return {
				modified: self.modified,
				to_modify: (_a = self.toModify) === null || _a === void 0 ? void 0 : _a.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._toJsonObject(item))
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeImportOpenApiOut.js
var require_eventTypeImportOpenApiOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeImportOpenApiOutSerializer = void 0;
	var eventTypeImportOpenApiOutData_1 = require_eventTypeImportOpenApiOutData();
	exports.EventTypeImportOpenApiOutSerializer = {
		_fromJsonObject(object) {
			return { data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._fromJsonObject(object["data"]) };
		},
		_toJsonObject(self) {
			return { data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._toJsonObject(self.data) };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypePatch.js
var require_eventTypePatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypePatchSerializer = void 0;
	exports.EventTypePatchSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlag: object["featureFlag"],
				featureFlags: object["featureFlags"],
				groupName: object["groupName"],
				schemas: object["schemas"]
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				deprecated: self.deprecated,
				description: self.description,
				featureFlag: self.featureFlag,
				featureFlags: self.featureFlags,
				groupName: self.groupName,
				schemas: self.schemas
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventTypeUpdate.js
var require_eventTypeUpdate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventTypeUpdateSerializer = void 0;
	exports.EventTypeUpdateSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlag: object["featureFlag"],
				featureFlags: object["featureFlags"],
				groupName: object["groupName"],
				schemas: object["schemas"]
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				deprecated: self.deprecated,
				description: self.description,
				featureFlag: self.featureFlag,
				featureFlags: self.featureFlags,
				groupName: self.groupName,
				schemas: self.schemas
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseEventTypeOut.js
var require_listResponseEventTypeOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseEventTypeOutSerializer = void 0;
	var eventTypeOut_1 = require_eventTypeOut();
	exports.ListResponseEventTypeOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/eventType.js
var require_eventType = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventType = void 0;
	var eventTypeImportOpenApiIn_1 = require_eventTypeImportOpenApiIn();
	var eventTypeImportOpenApiOut_1 = require_eventTypeImportOpenApiOut();
	var eventTypeIn_1 = require_eventTypeIn();
	var eventTypeOut_1 = require_eventTypeOut();
	var eventTypePatch_1 = require_eventTypePatch();
	var eventTypeUpdate_1 = require_eventTypeUpdate();
	var listResponseEventTypeOut_1 = require_listResponseEventTypeOut();
	var request_1 = require_request();
	var EventType = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type");
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order,
				include_archived: options === null || options === void 0 ? void 0 : options.includeArchived,
				with_content: options === null || options === void 0 ? void 0 : options.withContent
			});
			return request.send(this.requestCtx, listResponseEventTypeOut_1.ListResponseEventTypeOutSerializer._fromJsonObject);
		}
		create(eventTypeIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(eventTypeIn_1.EventTypeInSerializer._toJsonObject(eventTypeIn));
			return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
		}
		importOpenapi(eventTypeImportOpenApiIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type/import/openapi");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(eventTypeImportOpenApiIn_1.EventTypeImportOpenApiInSerializer._toJsonObject(eventTypeImportOpenApiIn));
			return request.send(this.requestCtx, eventTypeImportOpenApiOut_1.EventTypeImportOpenApiOutSerializer._fromJsonObject);
		}
		get(eventTypeName) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type/{event_type_name}");
			request.setPathParam("event_type_name", eventTypeName);
			return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
		}
		update(eventTypeName, eventTypeUpdate) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/event-type/{event_type_name}");
			request.setPathParam("event_type_name", eventTypeName);
			request.setBody(eventTypeUpdate_1.EventTypeUpdateSerializer._toJsonObject(eventTypeUpdate));
			return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
		}
		delete(eventTypeName, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/event-type/{event_type_name}");
			request.setPathParam("event_type_name", eventTypeName);
			request.setQueryParams({ expunge: options === null || options === void 0 ? void 0 : options.expunge });
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(eventTypeName, eventTypePatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/event-type/{event_type_name}");
			request.setPathParam("event_type_name", eventTypeName);
			request.setBody(eventTypePatch_1.EventTypePatchSerializer._toJsonObject(eventTypePatch));
			return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
		}
	};
	exports.EventType = EventType;
}));
//#endregion
//#region node_modules/svix/dist/api/health.js
var require_health = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Health = void 0;
	var request_1 = require_request();
	var Health = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		get() {
			return new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/health").sendNoResponseBody(this.requestCtx);
		}
	};
	exports.Health = Health;
}));
//#endregion
//#region node_modules/svix/dist/models/ingestSourceConsumerPortalAccessIn.js
var require_ingestSourceConsumerPortalAccessIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestSourceConsumerPortalAccessInSerializer = void 0;
	exports.IngestSourceConsumerPortalAccessInSerializer = {
		_fromJsonObject(object) {
			return {
				expiry: object["expiry"],
				readOnly: object["readOnly"]
			};
		},
		_toJsonObject(self) {
			return {
				expiry: self.expiry,
				readOnly: self.readOnly
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointHeadersIn.js
var require_ingestEndpointHeadersIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointHeadersInSerializer = void 0;
	exports.IngestEndpointHeadersInSerializer = {
		_fromJsonObject(object) {
			return { headers: object["headers"] };
		},
		_toJsonObject(self) {
			return { headers: self.headers };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointHeadersOut.js
var require_ingestEndpointHeadersOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointHeadersOutSerializer = void 0;
	exports.IngestEndpointHeadersOutSerializer = {
		_fromJsonObject(object) {
			return {
				headers: object["headers"],
				sensitive: object["sensitive"]
			};
		},
		_toJsonObject(self) {
			return {
				headers: self.headers,
				sensitive: self.sensitive
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointIn.js
var require_ingestEndpointIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointInSerializer = void 0;
	exports.IngestEndpointInSerializer = {
		_fromJsonObject(object) {
			return {
				description: object["description"],
				disabled: object["disabled"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				secret: object["secret"],
				uid: object["uid"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				description: self.description,
				disabled: self.disabled,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				secret: self.secret,
				uid: self.uid,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointOut.js
var require_ingestEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointOutSerializer = void 0;
	exports.IngestEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				createdAt: new Date(object["createdAt"]),
				description: object["description"],
				disabled: object["disabled"],
				id: object["id"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"]),
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				createdAt: self.createdAt,
				description: self.description,
				disabled: self.disabled,
				id: self.id,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				uid: self.uid,
				updatedAt: self.updatedAt,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointSecretIn.js
var require_ingestEndpointSecretIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointSecretInSerializer = void 0;
	exports.IngestEndpointSecretInSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointSecretOut.js
var require_ingestEndpointSecretOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointSecretOutSerializer = void 0;
	exports.IngestEndpointSecretOutSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointTransformationOut.js
var require_ingestEndpointTransformationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointTransformationOutSerializer = void 0;
	exports.IngestEndpointTransformationOutSerializer = {
		_fromJsonObject(object) {
			return {
				code: object["code"],
				enabled: object["enabled"]
			};
		},
		_toJsonObject(self) {
			return {
				code: self.code,
				enabled: self.enabled
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointTransformationPatch.js
var require_ingestEndpointTransformationPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointTransformationPatchSerializer = void 0;
	exports.IngestEndpointTransformationPatchSerializer = {
		_fromJsonObject(object) {
			return {
				code: object["code"],
				enabled: object["enabled"]
			};
		},
		_toJsonObject(self) {
			return {
				code: self.code,
				enabled: self.enabled
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestEndpointUpdate.js
var require_ingestEndpointUpdate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpointUpdateSerializer = void 0;
	exports.IngestEndpointUpdateSerializer = {
		_fromJsonObject(object) {
			return {
				description: object["description"],
				disabled: object["disabled"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				uid: object["uid"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				description: self.description,
				disabled: self.disabled,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				uid: self.uid,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseIngestEndpointOut.js
var require_listResponseIngestEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseIngestEndpointOutSerializer = void 0;
	var ingestEndpointOut_1 = require_ingestEndpointOut();
	exports.ListResponseIngestEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/ingestEndpoint.js
var require_ingestEndpoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestEndpoint = void 0;
	var ingestEndpointHeadersIn_1 = require_ingestEndpointHeadersIn();
	var ingestEndpointHeadersOut_1 = require_ingestEndpointHeadersOut();
	var ingestEndpointIn_1 = require_ingestEndpointIn();
	var ingestEndpointOut_1 = require_ingestEndpointOut();
	var ingestEndpointSecretIn_1 = require_ingestEndpointSecretIn();
	var ingestEndpointSecretOut_1 = require_ingestEndpointSecretOut();
	var ingestEndpointTransformationOut_1 = require_ingestEndpointTransformationOut();
	var ingestEndpointTransformationPatch_1 = require_ingestEndpointTransformationPatch();
	var ingestEndpointUpdate_1 = require_ingestEndpointUpdate();
	var listResponseIngestEndpointOut_1 = require_listResponseIngestEndpointOut();
	var request_1 = require_request();
	var IngestEndpoint = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(sourceId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint");
			request.setPathParam("source_id", sourceId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseIngestEndpointOut_1.ListResponseIngestEndpointOutSerializer._fromJsonObject);
		}
		create(sourceId, ingestEndpointIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint");
			request.setPathParam("source_id", sourceId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(ingestEndpointIn_1.IngestEndpointInSerializer._toJsonObject(ingestEndpointIn));
			return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
		}
		get(sourceId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
		}
		update(sourceId, endpointId, ingestEndpointUpdate) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(ingestEndpointUpdate_1.IngestEndpointUpdateSerializer._toJsonObject(ingestEndpointUpdate));
			return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
		}
		delete(sourceId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		getHeaders(sourceId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, ingestEndpointHeadersOut_1.IngestEndpointHeadersOutSerializer._fromJsonObject);
		}
		updateHeaders(sourceId, endpointId, ingestEndpointHeadersIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(ingestEndpointHeadersIn_1.IngestEndpointHeadersInSerializer._toJsonObject(ingestEndpointHeadersIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		getSecret(sourceId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, ingestEndpointSecretOut_1.IngestEndpointSecretOutSerializer._fromJsonObject);
		}
		rotateSecret(sourceId, endpointId, ingestEndpointSecretIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret/rotate");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(ingestEndpointSecretIn_1.IngestEndpointSecretInSerializer._toJsonObject(ingestEndpointSecretIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		getTransformation(sourceId, endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/transformation");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, ingestEndpointTransformationOut_1.IngestEndpointTransformationOutSerializer._fromJsonObject);
		}
		setTransformation(sourceId, endpointId, ingestEndpointTransformationPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/transformation");
			request.setPathParam("source_id", sourceId);
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(ingestEndpointTransformationPatch_1.IngestEndpointTransformationPatchSerializer._toJsonObject(ingestEndpointTransformationPatch));
			return request.sendNoResponseBody(this.requestCtx);
		}
	};
	exports.IngestEndpoint = IngestEndpoint;
}));
//#endregion
//#region node_modules/svix/dist/models/adobeSignConfig.js
var require_adobeSignConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AdobeSignConfigSerializer = void 0;
	exports.AdobeSignConfigSerializer = {
		_fromJsonObject(object) {
			return { clientId: object["clientId"] };
		},
		_toJsonObject(self) {
			return { clientId: self.clientId };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/airwallexConfig.js
var require_airwallexConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AirwallexConfigSerializer = void 0;
	exports.AirwallexConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/checkbookConfig.js
var require_checkbookConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CheckbookConfigSerializer = void 0;
	exports.CheckbookConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/cronConfig.js
var require_cronConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CronConfigSerializer = void 0;
	exports.CronConfigSerializer = {
		_fromJsonObject(object) {
			return {
				contentType: object["contentType"],
				payload: object["payload"],
				schedule: object["schedule"]
			};
		},
		_toJsonObject(self) {
			return {
				contentType: self.contentType,
				payload: self.payload,
				schedule: self.schedule
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/docusignConfig.js
var require_docusignConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DocusignConfigSerializer = void 0;
	exports.DocusignConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/easypostConfig.js
var require_easypostConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EasypostConfigSerializer = void 0;
	exports.EasypostConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/githubConfig.js
var require_githubConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GithubConfigSerializer = void 0;
	exports.GithubConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/hubspotConfig.js
var require_hubspotConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HubspotConfigSerializer = void 0;
	exports.HubspotConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/metaConfig.js
var require_metaConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MetaConfigSerializer = void 0;
	exports.MetaConfigSerializer = {
		_fromJsonObject(object) {
			return {
				secret: object["secret"],
				verifyToken: object["verifyToken"]
			};
		},
		_toJsonObject(self) {
			return {
				secret: self.secret,
				verifyToken: self.verifyToken
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/orumIoConfig.js
var require_orumIoConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OrumIoConfigSerializer = void 0;
	exports.OrumIoConfigSerializer = {
		_fromJsonObject(object) {
			return { publicKey: object["publicKey"] };
		},
		_toJsonObject(self) {
			return { publicKey: self.publicKey };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/pandaDocConfig.js
var require_pandaDocConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PandaDocConfigSerializer = void 0;
	exports.PandaDocConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/portIoConfig.js
var require_portIoConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortIoConfigSerializer = void 0;
	exports.PortIoConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/rutterConfig.js
var require_rutterConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RutterConfigSerializer = void 0;
	exports.RutterConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/segmentConfig.js
var require_segmentConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SegmentConfigSerializer = void 0;
	exports.SegmentConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/shopifyConfig.js
var require_shopifyConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ShopifyConfigSerializer = void 0;
	exports.ShopifyConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/slackConfig.js
var require_slackConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SlackConfigSerializer = void 0;
	exports.SlackConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/stripeConfig.js
var require_stripeConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StripeConfigSerializer = void 0;
	exports.StripeConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/svixConfig.js
var require_svixConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SvixConfigSerializer = void 0;
	exports.SvixConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/telnyxConfig.js
var require_telnyxConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TelnyxConfigSerializer = void 0;
	exports.TelnyxConfigSerializer = {
		_fromJsonObject(object) {
			return { publicKey: object["publicKey"] };
		},
		_toJsonObject(self) {
			return { publicKey: self.publicKey };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/vapiConfig.js
var require_vapiConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VapiConfigSerializer = void 0;
	exports.VapiConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/veriffConfig.js
var require_veriffConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VeriffConfigSerializer = void 0;
	exports.VeriffConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/zoomConfig.js
var require_zoomConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZoomConfigSerializer = void 0;
	exports.ZoomConfigSerializer = {
		_fromJsonObject(object) {
			return { secret: object["secret"] };
		},
		_toJsonObject(self) {
			return { secret: self.secret };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestSourceIn.js
var require_ingestSourceIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestSourceInSerializer = void 0;
	var adobeSignConfig_1 = require_adobeSignConfig();
	var airwallexConfig_1 = require_airwallexConfig();
	var checkbookConfig_1 = require_checkbookConfig();
	var cronConfig_1 = require_cronConfig();
	var docusignConfig_1 = require_docusignConfig();
	var easypostConfig_1 = require_easypostConfig();
	var githubConfig_1 = require_githubConfig();
	var hubspotConfig_1 = require_hubspotConfig();
	var metaConfig_1 = require_metaConfig();
	var orumIoConfig_1 = require_orumIoConfig();
	var pandaDocConfig_1 = require_pandaDocConfig();
	var portIoConfig_1 = require_portIoConfig();
	var rutterConfig_1 = require_rutterConfig();
	var segmentConfig_1 = require_segmentConfig();
	var shopifyConfig_1 = require_shopifyConfig();
	var slackConfig_1 = require_slackConfig();
	var stripeConfig_1 = require_stripeConfig();
	var svixConfig_1 = require_svixConfig();
	var telnyxConfig_1 = require_telnyxConfig();
	var vapiConfig_1 = require_vapiConfig();
	var veriffConfig_1 = require_veriffConfig();
	var zoomConfig_1 = require_zoomConfig();
	exports.IngestSourceInSerializer = {
		_fromJsonObject(object) {
			const type = object["type"];
			function getConfig(type) {
				switch (type) {
					case "generic-webhook": return {};
					case "cron": return cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
					case "adobe-sign": return adobeSignConfig_1.AdobeSignConfigSerializer._fromJsonObject(object["config"]);
					case "beehiiv": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "brex": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "checkbook": return checkbookConfig_1.CheckbookConfigSerializer._fromJsonObject(object["config"]);
					case "clerk": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "docusign": return docusignConfig_1.DocusignConfigSerializer._fromJsonObject(object["config"]);
					case "easypost": return easypostConfig_1.EasypostConfigSerializer._fromJsonObject(object["config"]);
					case "github": return githubConfig_1.GithubConfigSerializer._fromJsonObject(object["config"]);
					case "guesty": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "hubspot": return hubspotConfig_1.HubspotConfigSerializer._fromJsonObject(object["config"]);
					case "incident-io": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "lithic": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "meta": return metaConfig_1.MetaConfigSerializer._fromJsonObject(object["config"]);
					case "nash": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "orum-io": return orumIoConfig_1.OrumIoConfigSerializer._fromJsonObject(object["config"]);
					case "panda-doc": return pandaDocConfig_1.PandaDocConfigSerializer._fromJsonObject(object["config"]);
					case "port-io": return portIoConfig_1.PortIoConfigSerializer._fromJsonObject(object["config"]);
					case "pleo": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "psi-fi": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "replicate": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "resend": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "rutter": return rutterConfig_1.RutterConfigSerializer._fromJsonObject(object["config"]);
					case "safebase": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "sardine": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "segment": return segmentConfig_1.SegmentConfigSerializer._fromJsonObject(object["config"]);
					case "shopify": return shopifyConfig_1.ShopifyConfigSerializer._fromJsonObject(object["config"]);
					case "slack": return slackConfig_1.SlackConfigSerializer._fromJsonObject(object["config"]);
					case "stripe": return stripeConfig_1.StripeConfigSerializer._fromJsonObject(object["config"]);
					case "stych": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "svix": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "zoom": return zoomConfig_1.ZoomConfigSerializer._fromJsonObject(object["config"]);
					case "telnyx": return telnyxConfig_1.TelnyxConfigSerializer._fromJsonObject(object["config"]);
					case "vapi": return vapiConfig_1.VapiConfigSerializer._fromJsonObject(object["config"]);
					case "open-ai": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "render": return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
					case "veriff": return veriffConfig_1.VeriffConfigSerializer._fromJsonObject(object["config"]);
					case "airwallex": return airwallexConfig_1.AirwallexConfigSerializer._fromJsonObject(object["config"]);
					default: throw new Error(`Unexpected type: ${type}`);
				}
			}
			return {
				type,
				config: getConfig(type),
				metadata: object["metadata"],
				name: object["name"],
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			let config;
			switch (self.type) {
				case "generic-webhook":
					config = {};
					break;
				case "cron":
					config = cronConfig_1.CronConfigSerializer._toJsonObject(self.config);
					break;
				case "adobe-sign":
					config = adobeSignConfig_1.AdobeSignConfigSerializer._toJsonObject(self.config);
					break;
				case "beehiiv":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "brex":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "checkbook":
					config = checkbookConfig_1.CheckbookConfigSerializer._toJsonObject(self.config);
					break;
				case "clerk":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "docusign":
					config = docusignConfig_1.DocusignConfigSerializer._toJsonObject(self.config);
					break;
				case "easypost":
					config = easypostConfig_1.EasypostConfigSerializer._toJsonObject(self.config);
					break;
				case "github":
					config = githubConfig_1.GithubConfigSerializer._toJsonObject(self.config);
					break;
				case "guesty":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "hubspot":
					config = hubspotConfig_1.HubspotConfigSerializer._toJsonObject(self.config);
					break;
				case "incident-io":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "lithic":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "meta":
					config = metaConfig_1.MetaConfigSerializer._toJsonObject(self.config);
					break;
				case "nash":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "orum-io":
					config = orumIoConfig_1.OrumIoConfigSerializer._toJsonObject(self.config);
					break;
				case "panda-doc":
					config = pandaDocConfig_1.PandaDocConfigSerializer._toJsonObject(self.config);
					break;
				case "port-io":
					config = portIoConfig_1.PortIoConfigSerializer._toJsonObject(self.config);
					break;
				case "pleo":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "psi-fi":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "replicate":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "resend":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "rutter":
					config = rutterConfig_1.RutterConfigSerializer._toJsonObject(self.config);
					break;
				case "safebase":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "sardine":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "segment":
					config = segmentConfig_1.SegmentConfigSerializer._toJsonObject(self.config);
					break;
				case "shopify":
					config = shopifyConfig_1.ShopifyConfigSerializer._toJsonObject(self.config);
					break;
				case "slack":
					config = slackConfig_1.SlackConfigSerializer._toJsonObject(self.config);
					break;
				case "stripe":
					config = stripeConfig_1.StripeConfigSerializer._toJsonObject(self.config);
					break;
				case "stych":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "svix":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "zoom":
					config = zoomConfig_1.ZoomConfigSerializer._toJsonObject(self.config);
					break;
				case "telnyx":
					config = telnyxConfig_1.TelnyxConfigSerializer._toJsonObject(self.config);
					break;
				case "vapi":
					config = vapiConfig_1.VapiConfigSerializer._toJsonObject(self.config);
					break;
				case "open-ai":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "render":
					config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
					break;
				case "veriff":
					config = veriffConfig_1.VeriffConfigSerializer._toJsonObject(self.config);
					break;
				case "airwallex":
					config = airwallexConfig_1.AirwallexConfigSerializer._toJsonObject(self.config);
					break;
			}
			return {
				type: self.type,
				config,
				metadata: self.metadata,
				name: self.name,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/adobeSignConfigOut.js
var require_adobeSignConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AdobeSignConfigOutSerializer = void 0;
	exports.AdobeSignConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/airwallexConfigOut.js
var require_airwallexConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AirwallexConfigOutSerializer = void 0;
	exports.AirwallexConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/checkbookConfigOut.js
var require_checkbookConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CheckbookConfigOutSerializer = void 0;
	exports.CheckbookConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/docusignConfigOut.js
var require_docusignConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DocusignConfigOutSerializer = void 0;
	exports.DocusignConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/easypostConfigOut.js
var require_easypostConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EasypostConfigOutSerializer = void 0;
	exports.EasypostConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/githubConfigOut.js
var require_githubConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GithubConfigOutSerializer = void 0;
	exports.GithubConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/hubspotConfigOut.js
var require_hubspotConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HubspotConfigOutSerializer = void 0;
	exports.HubspotConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/metaConfigOut.js
var require_metaConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MetaConfigOutSerializer = void 0;
	exports.MetaConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/orumIoConfigOut.js
var require_orumIoConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OrumIoConfigOutSerializer = void 0;
	exports.OrumIoConfigOutSerializer = {
		_fromJsonObject(object) {
			return { publicKey: object["publicKey"] };
		},
		_toJsonObject(self) {
			return { publicKey: self.publicKey };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/pandaDocConfigOut.js
var require_pandaDocConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PandaDocConfigOutSerializer = void 0;
	exports.PandaDocConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/portIoConfigOut.js
var require_portIoConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortIoConfigOutSerializer = void 0;
	exports.PortIoConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/rutterConfigOut.js
var require_rutterConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RutterConfigOutSerializer = void 0;
	exports.RutterConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/segmentConfigOut.js
var require_segmentConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SegmentConfigOutSerializer = void 0;
	exports.SegmentConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/shopifyConfigOut.js
var require_shopifyConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ShopifyConfigOutSerializer = void 0;
	exports.ShopifyConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/slackConfigOut.js
var require_slackConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SlackConfigOutSerializer = void 0;
	exports.SlackConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/stripeConfigOut.js
var require_stripeConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StripeConfigOutSerializer = void 0;
	exports.StripeConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/svixConfigOut.js
var require_svixConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SvixConfigOutSerializer = void 0;
	exports.SvixConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/telnyxConfigOut.js
var require_telnyxConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TelnyxConfigOutSerializer = void 0;
	exports.TelnyxConfigOutSerializer = {
		_fromJsonObject(object) {
			return { publicKey: object["publicKey"] };
		},
		_toJsonObject(self) {
			return { publicKey: self.publicKey };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/vapiConfigOut.js
var require_vapiConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VapiConfigOutSerializer = void 0;
	exports.VapiConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/veriffConfigOut.js
var require_veriffConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VeriffConfigOutSerializer = void 0;
	exports.VeriffConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/zoomConfigOut.js
var require_zoomConfigOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZoomConfigOutSerializer = void 0;
	exports.ZoomConfigOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ingestSourceOut.js
var require_ingestSourceOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestSourceOutSerializer = void 0;
	var adobeSignConfigOut_1 = require_adobeSignConfigOut();
	var airwallexConfigOut_1 = require_airwallexConfigOut();
	var checkbookConfigOut_1 = require_checkbookConfigOut();
	var cronConfig_1 = require_cronConfig();
	var docusignConfigOut_1 = require_docusignConfigOut();
	var easypostConfigOut_1 = require_easypostConfigOut();
	var githubConfigOut_1 = require_githubConfigOut();
	var hubspotConfigOut_1 = require_hubspotConfigOut();
	var metaConfigOut_1 = require_metaConfigOut();
	var orumIoConfigOut_1 = require_orumIoConfigOut();
	var pandaDocConfigOut_1 = require_pandaDocConfigOut();
	var portIoConfigOut_1 = require_portIoConfigOut();
	var rutterConfigOut_1 = require_rutterConfigOut();
	var segmentConfigOut_1 = require_segmentConfigOut();
	var shopifyConfigOut_1 = require_shopifyConfigOut();
	var slackConfigOut_1 = require_slackConfigOut();
	var stripeConfigOut_1 = require_stripeConfigOut();
	var svixConfigOut_1 = require_svixConfigOut();
	var telnyxConfigOut_1 = require_telnyxConfigOut();
	var vapiConfigOut_1 = require_vapiConfigOut();
	var veriffConfigOut_1 = require_veriffConfigOut();
	var zoomConfigOut_1 = require_zoomConfigOut();
	exports.IngestSourceOutSerializer = {
		_fromJsonObject(object) {
			const type = object["type"];
			function getConfig(type) {
				switch (type) {
					case "generic-webhook": return {};
					case "cron": return cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
					case "adobe-sign": return adobeSignConfigOut_1.AdobeSignConfigOutSerializer._fromJsonObject(object["config"]);
					case "beehiiv": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "brex": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "checkbook": return checkbookConfigOut_1.CheckbookConfigOutSerializer._fromJsonObject(object["config"]);
					case "clerk": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "docusign": return docusignConfigOut_1.DocusignConfigOutSerializer._fromJsonObject(object["config"]);
					case "easypost": return easypostConfigOut_1.EasypostConfigOutSerializer._fromJsonObject(object["config"]);
					case "github": return githubConfigOut_1.GithubConfigOutSerializer._fromJsonObject(object["config"]);
					case "guesty": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "hubspot": return hubspotConfigOut_1.HubspotConfigOutSerializer._fromJsonObject(object["config"]);
					case "incident-io": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "lithic": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "meta": return metaConfigOut_1.MetaConfigOutSerializer._fromJsonObject(object["config"]);
					case "nash": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "orum-io": return orumIoConfigOut_1.OrumIoConfigOutSerializer._fromJsonObject(object["config"]);
					case "panda-doc": return pandaDocConfigOut_1.PandaDocConfigOutSerializer._fromJsonObject(object["config"]);
					case "port-io": return portIoConfigOut_1.PortIoConfigOutSerializer._fromJsonObject(object["config"]);
					case "psi-fi": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "pleo": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "replicate": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "resend": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "rutter": return rutterConfigOut_1.RutterConfigOutSerializer._fromJsonObject(object["config"]);
					case "safebase": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "sardine": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "segment": return segmentConfigOut_1.SegmentConfigOutSerializer._fromJsonObject(object["config"]);
					case "shopify": return shopifyConfigOut_1.ShopifyConfigOutSerializer._fromJsonObject(object["config"]);
					case "slack": return slackConfigOut_1.SlackConfigOutSerializer._fromJsonObject(object["config"]);
					case "stripe": return stripeConfigOut_1.StripeConfigOutSerializer._fromJsonObject(object["config"]);
					case "stych": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "svix": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "zoom": return zoomConfigOut_1.ZoomConfigOutSerializer._fromJsonObject(object["config"]);
					case "telnyx": return telnyxConfigOut_1.TelnyxConfigOutSerializer._fromJsonObject(object["config"]);
					case "vapi": return vapiConfigOut_1.VapiConfigOutSerializer._fromJsonObject(object["config"]);
					case "open-ai": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "render": return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
					case "veriff": return veriffConfigOut_1.VeriffConfigOutSerializer._fromJsonObject(object["config"]);
					case "airwallex": return airwallexConfigOut_1.AirwallexConfigOutSerializer._fromJsonObject(object["config"]);
					default: throw new Error(`Unexpected type: ${type}`);
				}
			}
			return {
				type,
				config: getConfig(type),
				createdAt: new Date(object["createdAt"]),
				id: object["id"],
				ingestUrl: object["ingestUrl"],
				metadata: object["metadata"],
				name: object["name"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			let config;
			switch (self.type) {
				case "generic-webhook":
					config = {};
					break;
				case "cron":
					config = cronConfig_1.CronConfigSerializer._toJsonObject(self.config);
					break;
				case "adobe-sign":
					config = adobeSignConfigOut_1.AdobeSignConfigOutSerializer._toJsonObject(self.config);
					break;
				case "beehiiv":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "brex":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "checkbook":
					config = checkbookConfigOut_1.CheckbookConfigOutSerializer._toJsonObject(self.config);
					break;
				case "clerk":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "docusign":
					config = docusignConfigOut_1.DocusignConfigOutSerializer._toJsonObject(self.config);
					break;
				case "easypost":
					config = easypostConfigOut_1.EasypostConfigOutSerializer._toJsonObject(self.config);
					break;
				case "github":
					config = githubConfigOut_1.GithubConfigOutSerializer._toJsonObject(self.config);
					break;
				case "guesty":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "hubspot":
					config = hubspotConfigOut_1.HubspotConfigOutSerializer._toJsonObject(self.config);
					break;
				case "incident-io":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "lithic":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "meta":
					config = metaConfigOut_1.MetaConfigOutSerializer._toJsonObject(self.config);
					break;
				case "nash":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "orum-io":
					config = orumIoConfigOut_1.OrumIoConfigOutSerializer._toJsonObject(self.config);
					break;
				case "panda-doc":
					config = pandaDocConfigOut_1.PandaDocConfigOutSerializer._toJsonObject(self.config);
					break;
				case "port-io":
					config = portIoConfigOut_1.PortIoConfigOutSerializer._toJsonObject(self.config);
					break;
				case "psi-fi":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "pleo":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "replicate":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "resend":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "rutter":
					config = rutterConfigOut_1.RutterConfigOutSerializer._toJsonObject(self.config);
					break;
				case "safebase":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "sardine":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "segment":
					config = segmentConfigOut_1.SegmentConfigOutSerializer._toJsonObject(self.config);
					break;
				case "shopify":
					config = shopifyConfigOut_1.ShopifyConfigOutSerializer._toJsonObject(self.config);
					break;
				case "slack":
					config = slackConfigOut_1.SlackConfigOutSerializer._toJsonObject(self.config);
					break;
				case "stripe":
					config = stripeConfigOut_1.StripeConfigOutSerializer._toJsonObject(self.config);
					break;
				case "stych":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "svix":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "zoom":
					config = zoomConfigOut_1.ZoomConfigOutSerializer._toJsonObject(self.config);
					break;
				case "telnyx":
					config = telnyxConfigOut_1.TelnyxConfigOutSerializer._toJsonObject(self.config);
					break;
				case "vapi":
					config = vapiConfigOut_1.VapiConfigOutSerializer._toJsonObject(self.config);
					break;
				case "open-ai":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "render":
					config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
					break;
				case "veriff":
					config = veriffConfigOut_1.VeriffConfigOutSerializer._toJsonObject(self.config);
					break;
				case "airwallex":
					config = airwallexConfigOut_1.AirwallexConfigOutSerializer._toJsonObject(self.config);
					break;
			}
			return {
				type: self.type,
				config,
				createdAt: self.createdAt,
				id: self.id,
				ingestUrl: self.ingestUrl,
				metadata: self.metadata,
				name: self.name,
				uid: self.uid,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseIngestSourceOut.js
var require_listResponseIngestSourceOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseIngestSourceOutSerializer = void 0;
	var ingestSourceOut_1 = require_ingestSourceOut();
	exports.ListResponseIngestSourceOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => ingestSourceOut_1.IngestSourceOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/rotateTokenOut.js
var require_rotateTokenOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RotateTokenOutSerializer = void 0;
	exports.RotateTokenOutSerializer = {
		_fromJsonObject(object) {
			return { ingestUrl: object["ingestUrl"] };
		},
		_toJsonObject(self) {
			return { ingestUrl: self.ingestUrl };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/ingestSource.js
var require_ingestSource = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IngestSource = void 0;
	var ingestSourceIn_1 = require_ingestSourceIn();
	var ingestSourceOut_1 = require_ingestSourceOut();
	var listResponseIngestSourceOut_1 = require_listResponseIngestSourceOut();
	var rotateTokenOut_1 = require_rotateTokenOut();
	var request_1 = require_request();
	var IngestSource = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source");
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseIngestSourceOut_1.ListResponseIngestSourceOutSerializer._fromJsonObject);
		}
		create(ingestSourceIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
			return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
		}
		get(sourceId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}");
			request.setPathParam("source_id", sourceId);
			return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
		}
		update(sourceId, ingestSourceIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}");
			request.setPathParam("source_id", sourceId);
			request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
			return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
		}
		delete(sourceId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}");
			request.setPathParam("source_id", sourceId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		rotateToken(sourceId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/token/rotate");
			request.setPathParam("source_id", sourceId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.send(this.requestCtx, rotateTokenOut_1.RotateTokenOutSerializer._fromJsonObject);
		}
	};
	exports.IngestSource = IngestSource;
}));
//#endregion
//#region node_modules/svix/dist/api/ingest.js
var require_ingest = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Ingest = void 0;
	var dashboardAccessOut_1 = require_dashboardAccessOut();
	var ingestSourceConsumerPortalAccessIn_1 = require_ingestSourceConsumerPortalAccessIn();
	var ingestEndpoint_1 = require_ingestEndpoint();
	var ingestSource_1 = require_ingestSource();
	var request_1 = require_request();
	var Ingest = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		get endpoint() {
			return new ingestEndpoint_1.IngestEndpoint(this.requestCtx);
		}
		get source() {
			return new ingestSource_1.IngestSource(this.requestCtx);
		}
		dashboard(sourceId, ingestSourceConsumerPortalAccessIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/dashboard");
			request.setPathParam("source_id", sourceId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(ingestSourceConsumerPortalAccessIn_1.IngestSourceConsumerPortalAccessInSerializer._toJsonObject(ingestSourceConsumerPortalAccessIn));
			return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
		}
	};
	exports.Ingest = Ingest;
}));
//#endregion
//#region node_modules/svix/dist/models/integrationIn.js
var require_integrationIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IntegrationInSerializer = void 0;
	exports.IntegrationInSerializer = {
		_fromJsonObject(object) {
			return {
				featureFlags: object["featureFlags"],
				name: object["name"]
			};
		},
		_toJsonObject(self) {
			return {
				featureFlags: self.featureFlags,
				name: self.name
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/integrationKeyOut.js
var require_integrationKeyOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IntegrationKeyOutSerializer = void 0;
	exports.IntegrationKeyOutSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/integrationOut.js
var require_integrationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IntegrationOutSerializer = void 0;
	exports.IntegrationOutSerializer = {
		_fromJsonObject(object) {
			return {
				createdAt: new Date(object["createdAt"]),
				featureFlags: object["featureFlags"],
				id: object["id"],
				name: object["name"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				createdAt: self.createdAt,
				featureFlags: self.featureFlags,
				id: self.id,
				name: self.name,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/integrationUpdate.js
var require_integrationUpdate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IntegrationUpdateSerializer = void 0;
	exports.IntegrationUpdateSerializer = {
		_fromJsonObject(object) {
			return {
				featureFlags: object["featureFlags"],
				name: object["name"]
			};
		},
		_toJsonObject(self) {
			return {
				featureFlags: self.featureFlags,
				name: self.name
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseIntegrationOut.js
var require_listResponseIntegrationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseIntegrationOutSerializer = void 0;
	var integrationOut_1 = require_integrationOut();
	exports.ListResponseIntegrationOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => integrationOut_1.IntegrationOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => integrationOut_1.IntegrationOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/integration.js
var require_integration = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Integration = void 0;
	var integrationIn_1 = require_integrationIn();
	var integrationKeyOut_1 = require_integrationKeyOut();
	var integrationOut_1 = require_integrationOut();
	var integrationUpdate_1 = require_integrationUpdate();
	var listResponseIntegrationOut_1 = require_listResponseIntegrationOut();
	var request_1 = require_request();
	var Integration = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(appId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration");
			request.setPathParam("app_id", appId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseIntegrationOut_1.ListResponseIntegrationOutSerializer._fromJsonObject);
		}
		create(appId, integrationIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(integrationIn_1.IntegrationInSerializer._toJsonObject(integrationIn));
			return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
		}
		get(appId, integId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("integ_id", integId);
			return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
		}
		update(appId, integId, integrationUpdate) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/integration/{integ_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("integ_id", integId);
			request.setBody(integrationUpdate_1.IntegrationUpdateSerializer._toJsonObject(integrationUpdate));
			return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
		}
		delete(appId, integId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/integration/{integ_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("integ_id", integId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		getKey(appId, integId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}/key");
			request.setPathParam("app_id", appId);
			request.setPathParam("integ_id", integId);
			return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
		}
		rotateKey(appId, integId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration/{integ_id}/key/rotate");
			request.setPathParam("app_id", appId);
			request.setPathParam("integ_id", integId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
		}
	};
	exports.Integration = Integration;
}));
//#endregion
//#region node_modules/svix/dist/models/expungeAllContentsOut.js
var require_expungeAllContentsOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ExpungeAllContentsOutSerializer = void 0;
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	var backgroundTaskType_1 = require_backgroundTaskType();
	exports.ExpungeAllContentsOutSerializer = {
		_fromJsonObject(object) {
			return {
				id: object["id"],
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				id: self.id,
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseMessageOut.js
var require_listResponseMessageOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseMessageOutSerializer = void 0;
	var messageOut_1 = require_messageOut();
	exports.ListResponseMessageOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => messageOut_1.MessageOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => messageOut_1.MessageOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messagePrecheckIn.js
var require_messagePrecheckIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessagePrecheckInSerializer = void 0;
	exports.MessagePrecheckInSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				eventType: object["eventType"]
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				eventType: self.eventType
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messagePrecheckOut.js
var require_messagePrecheckOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessagePrecheckOutSerializer = void 0;
	exports.MessagePrecheckOutSerializer = {
		_fromJsonObject(object) {
			return { active: object["active"] };
		},
		_toJsonObject(self) {
			return { active: self.active };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/pollingEndpointConsumerSeekIn.js
var require_pollingEndpointConsumerSeekIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PollingEndpointConsumerSeekInSerializer = void 0;
	exports.PollingEndpointConsumerSeekInSerializer = {
		_fromJsonObject(object) {
			return { after: new Date(object["after"]) };
		},
		_toJsonObject(self) {
			return { after: self.after };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/pollingEndpointConsumerSeekOut.js
var require_pollingEndpointConsumerSeekOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PollingEndpointConsumerSeekOutSerializer = void 0;
	exports.PollingEndpointConsumerSeekOutSerializer = {
		_fromJsonObject(object) {
			return { iterator: object["iterator"] };
		},
		_toJsonObject(self) {
			return { iterator: self.iterator };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/pollingEndpointMessageOut.js
var require_pollingEndpointMessageOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PollingEndpointMessageOutSerializer = void 0;
	exports.PollingEndpointMessageOutSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				deliverAt: object["deliverAt"] ? new Date(object["deliverAt"]) : null,
				eventId: object["eventId"],
				eventType: object["eventType"],
				headers: object["headers"],
				id: object["id"],
				payload: object["payload"],
				tags: object["tags"],
				timestamp: new Date(object["timestamp"])
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				deliverAt: self.deliverAt,
				eventId: self.eventId,
				eventType: self.eventType,
				headers: self.headers,
				id: self.id,
				payload: self.payload,
				tags: self.tags,
				timestamp: self.timestamp
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/pollingEndpointOut.js
var require_pollingEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PollingEndpointOutSerializer = void 0;
	var pollingEndpointMessageOut_1 = require_pollingEndpointMessageOut();
	exports.PollingEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/messagePoller.js
var require_messagePoller = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessagePoller = void 0;
	var pollingEndpointConsumerSeekIn_1 = require_pollingEndpointConsumerSeekIn();
	var pollingEndpointConsumerSeekOut_1 = require_pollingEndpointConsumerSeekOut();
	var pollingEndpointOut_1 = require_pollingEndpointOut();
	var request_1 = require_request();
	var MessagePoller = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		poll(appId, sinkId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("sink_id", sinkId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				event_type: options === null || options === void 0 ? void 0 : options.eventType,
				channel: options === null || options === void 0 ? void 0 : options.channel,
				after: options === null || options === void 0 ? void 0 : options.after
			});
			return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
		}
		consumerPoll(appId, sinkId, consumerId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("sink_id", sinkId);
			request.setPathParam("consumer_id", consumerId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator
			});
			return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
		}
		consumerSeek(appId, sinkId, consumerId, pollingEndpointConsumerSeekIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}/seek");
			request.setPathParam("app_id", appId);
			request.setPathParam("sink_id", sinkId);
			request.setPathParam("consumer_id", consumerId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(pollingEndpointConsumerSeekIn_1.PollingEndpointConsumerSeekInSerializer._toJsonObject(pollingEndpointConsumerSeekIn));
			return request.send(this.requestCtx, pollingEndpointConsumerSeekOut_1.PollingEndpointConsumerSeekOutSerializer._fromJsonObject);
		}
	};
	exports.MessagePoller = MessagePoller;
}));
//#endregion
//#region node_modules/svix/dist/models/messageIn.js
var require_messageIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageInSerializer = void 0;
	var applicationIn_1 = require_applicationIn();
	exports.MessageInSerializer = {
		_fromJsonObject(object) {
			return {
				application: object["application"] != null ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"]) : void 0,
				channels: object["channels"],
				deliverAt: object["deliverAt"] ? new Date(object["deliverAt"]) : null,
				eventId: object["eventId"],
				eventType: object["eventType"],
				payload: object["payload"],
				payloadRetentionHours: object["payloadRetentionHours"],
				payloadRetentionPeriod: object["payloadRetentionPeriod"],
				tags: object["tags"],
				transformationsParams: object["transformationsParams"]
			};
		},
		_toJsonObject(self) {
			return {
				application: self.application != null ? applicationIn_1.ApplicationInSerializer._toJsonObject(self.application) : void 0,
				channels: self.channels,
				deliverAt: self.deliverAt,
				eventId: self.eventId,
				eventType: self.eventType,
				payload: self.payload,
				payloadRetentionHours: self.payloadRetentionHours,
				payloadRetentionPeriod: self.payloadRetentionPeriod,
				tags: self.tags,
				transformationsParams: self.transformationsParams
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/message.js
var require_message = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.messageInRaw = exports.Message = void 0;
	var expungeAllContentsOut_1 = require_expungeAllContentsOut();
	var listResponseMessageOut_1 = require_listResponseMessageOut();
	var messageOut_1 = require_messageOut();
	var messagePrecheckIn_1 = require_messagePrecheckIn();
	var messagePrecheckOut_1 = require_messagePrecheckOut();
	var messagePoller_1 = require_messagePoller();
	var request_1 = require_request();
	var messageIn_1 = require_messageIn();
	var Message = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		get poller() {
			return new messagePoller_1.MessagePoller(this.requestCtx);
		}
		list(appId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg");
			request.setPathParam("app_id", appId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				channel: options === null || options === void 0 ? void 0 : options.channel,
				before: options === null || options === void 0 ? void 0 : options.before,
				after: options === null || options === void 0 ? void 0 : options.after,
				with_content: options === null || options === void 0 ? void 0 : options.withContent,
				tag: options === null || options === void 0 ? void 0 : options.tag,
				event_types: options === null || options === void 0 ? void 0 : options.eventTypes
			});
			return request.send(this.requestCtx, listResponseMessageOut_1.ListResponseMessageOutSerializer._fromJsonObject);
		}
		create(appId, messageIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg");
			request.setPathParam("app_id", appId);
			request.setQueryParams({ with_content: options === null || options === void 0 ? void 0 : options.withContent });
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(messageIn_1.MessageInSerializer._toJsonObject(messageIn));
			return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
		}
		expungeAllContents(appId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/expunge-all-contents");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.send(this.requestCtx, expungeAllContentsOut_1.ExpungeAllContentsOutSerializer._fromJsonObject);
		}
		precheck(appId, messagePrecheckIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/precheck/active");
			request.setPathParam("app_id", appId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(messagePrecheckIn_1.MessagePrecheckInSerializer._toJsonObject(messagePrecheckIn));
			return request.send(this.requestCtx, messagePrecheckOut_1.MessagePrecheckOutSerializer._fromJsonObject);
		}
		get(appId, msgId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			request.setQueryParams({ with_content: options === null || options === void 0 ? void 0 : options.withContent });
			return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
		}
		expungeContent(appId, msgId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/content");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			return request.sendNoResponseBody(this.requestCtx);
		}
	};
	exports.Message = Message;
	function messageInRaw(eventType, payload, contentType) {
		return {
			eventType,
			payload: {},
			transformationsParams: {
				rawPayload: payload,
				headers: contentType ? { "content-type": contentType } : void 0
			}
		};
	}
	exports.messageInRaw = messageInRaw;
}));
//#endregion
//#region node_modules/svix/dist/models/emptyResponse.js
var require_emptyResponse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EmptyResponseSerializer = void 0;
	exports.EmptyResponseSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messageStatusText.js
var require_messageStatusText = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageStatusTextSerializer = exports.MessageStatusText = void 0;
	(function(MessageStatusText) {
		MessageStatusText["Success"] = "success";
		MessageStatusText["Pending"] = "pending";
		MessageStatusText["Fail"] = "fail";
		MessageStatusText["Sending"] = "sending";
	})(exports.MessageStatusText || (exports.MessageStatusText = {}));
	exports.MessageStatusTextSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/endpointMessageOut.js
var require_endpointMessageOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointMessageOutSerializer = void 0;
	var messageStatus_1 = require_messageStatus();
	var messageStatusText_1 = require_messageStatusText();
	exports.EndpointMessageOutSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				deliverAt: object["deliverAt"] ? new Date(object["deliverAt"]) : null,
				eventId: object["eventId"],
				eventType: object["eventType"],
				id: object["id"],
				nextAttempt: object["nextAttempt"] ? new Date(object["nextAttempt"]) : null,
				payload: object["payload"],
				status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
				statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
				tags: object["tags"],
				timestamp: new Date(object["timestamp"])
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				deliverAt: self.deliverAt,
				eventId: self.eventId,
				eventType: self.eventType,
				id: self.id,
				nextAttempt: self.nextAttempt,
				payload: self.payload,
				status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
				statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
				tags: self.tags,
				timestamp: self.timestamp
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseEndpointMessageOut.js
var require_listResponseEndpointMessageOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseEndpointMessageOutSerializer = void 0;
	var endpointMessageOut_1 = require_endpointMessageOut();
	exports.ListResponseEndpointMessageOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messageAttemptTriggerType.js
var require_messageAttemptTriggerType = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageAttemptTriggerTypeSerializer = exports.MessageAttemptTriggerType = void 0;
	(function(MessageAttemptTriggerType) {
		MessageAttemptTriggerType[MessageAttemptTriggerType["Scheduled"] = 0] = "Scheduled";
		MessageAttemptTriggerType[MessageAttemptTriggerType["Manual"] = 1] = "Manual";
	})(exports.MessageAttemptTriggerType || (exports.MessageAttemptTriggerType = {}));
	exports.MessageAttemptTriggerTypeSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messageAttemptOut.js
var require_messageAttemptOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageAttemptOutSerializer = void 0;
	var messageAttemptTriggerType_1 = require_messageAttemptTriggerType();
	var messageOut_1 = require_messageOut();
	var messageStatus_1 = require_messageStatus();
	var messageStatusText_1 = require_messageStatusText();
	exports.MessageAttemptOutSerializer = {
		_fromJsonObject(object) {
			return {
				endpointId: object["endpointId"],
				id: object["id"],
				msg: object["msg"] != null ? messageOut_1.MessageOutSerializer._fromJsonObject(object["msg"]) : void 0,
				msgId: object["msgId"],
				response: object["response"],
				responseDurationMs: object["responseDurationMs"],
				responseStatusCode: object["responseStatusCode"],
				status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
				statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
				timestamp: new Date(object["timestamp"]),
				triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._fromJsonObject(object["triggerType"]),
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				endpointId: self.endpointId,
				id: self.id,
				msg: self.msg != null ? messageOut_1.MessageOutSerializer._toJsonObject(self.msg) : void 0,
				msgId: self.msgId,
				response: self.response,
				responseDurationMs: self.responseDurationMs,
				responseStatusCode: self.responseStatusCode,
				status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
				statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
				timestamp: self.timestamp,
				triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._toJsonObject(self.triggerType),
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseMessageAttemptOut.js
var require_listResponseMessageAttemptOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseMessageAttemptOutSerializer = void 0;
	var messageAttemptOut_1 = require_messageAttemptOut();
	exports.ListResponseMessageAttemptOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/messageEndpointOut.js
var require_messageEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageEndpointOutSerializer = void 0;
	var messageStatus_1 = require_messageStatus();
	var messageStatusText_1 = require_messageStatusText();
	exports.MessageEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				channels: object["channels"],
				createdAt: new Date(object["createdAt"]),
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				id: object["id"],
				nextAttempt: object["nextAttempt"] ? new Date(object["nextAttempt"]) : null,
				rateLimit: object["rateLimit"],
				status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
				statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
				throttleRate: object["throttleRate"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"]),
				url: object["url"],
				version: object["version"]
			};
		},
		_toJsonObject(self) {
			return {
				channels: self.channels,
				createdAt: self.createdAt,
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				id: self.id,
				nextAttempt: self.nextAttempt,
				rateLimit: self.rateLimit,
				status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
				statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
				throttleRate: self.throttleRate,
				uid: self.uid,
				updatedAt: self.updatedAt,
				url: self.url,
				version: self.version
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseMessageEndpointOut.js
var require_listResponseMessageEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseMessageEndpointOutSerializer = void 0;
	var messageEndpointOut_1 = require_messageEndpointOut();
	exports.ListResponseMessageEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/messageAttempt.js
var require_messageAttempt = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageAttempt = void 0;
	var emptyResponse_1 = require_emptyResponse();
	var listResponseEndpointMessageOut_1 = require_listResponseEndpointMessageOut();
	var listResponseMessageAttemptOut_1 = require_listResponseMessageAttemptOut();
	var listResponseMessageEndpointOut_1 = require_listResponseMessageEndpointOut();
	var messageAttemptOut_1 = require_messageAttemptOut();
	var request_1 = require_request();
	var MessageAttempt = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		listByEndpoint(appId, endpointId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/endpoint/{endpoint_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				status: options === null || options === void 0 ? void 0 : options.status,
				status_code_class: options === null || options === void 0 ? void 0 : options.statusCodeClass,
				channel: options === null || options === void 0 ? void 0 : options.channel,
				tag: options === null || options === void 0 ? void 0 : options.tag,
				before: options === null || options === void 0 ? void 0 : options.before,
				after: options === null || options === void 0 ? void 0 : options.after,
				with_content: options === null || options === void 0 ? void 0 : options.withContent,
				with_msg: options === null || options === void 0 ? void 0 : options.withMsg,
				event_types: options === null || options === void 0 ? void 0 : options.eventTypes
			});
			return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
		}
		listByMsg(appId, msgId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/msg/{msg_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				status: options === null || options === void 0 ? void 0 : options.status,
				status_code_class: options === null || options === void 0 ? void 0 : options.statusCodeClass,
				channel: options === null || options === void 0 ? void 0 : options.channel,
				tag: options === null || options === void 0 ? void 0 : options.tag,
				endpoint_id: options === null || options === void 0 ? void 0 : options.endpointId,
				before: options === null || options === void 0 ? void 0 : options.before,
				after: options === null || options === void 0 ? void 0 : options.after,
				with_content: options === null || options === void 0 ? void 0 : options.withContent,
				event_types: options === null || options === void 0 ? void 0 : options.eventTypes
			});
			return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
		}
		listAttemptedMessages(appId, endpointId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/msg");
			request.setPathParam("app_id", appId);
			request.setPathParam("endpoint_id", endpointId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				channel: options === null || options === void 0 ? void 0 : options.channel,
				tag: options === null || options === void 0 ? void 0 : options.tag,
				status: options === null || options === void 0 ? void 0 : options.status,
				before: options === null || options === void 0 ? void 0 : options.before,
				after: options === null || options === void 0 ? void 0 : options.after,
				with_content: options === null || options === void 0 ? void 0 : options.withContent,
				event_types: options === null || options === void 0 ? void 0 : options.eventTypes
			});
			return request.send(this.requestCtx, listResponseEndpointMessageOut_1.ListResponseEndpointMessageOutSerializer._fromJsonObject);
		}
		get(appId, msgId, attemptId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			request.setPathParam("attempt_id", attemptId);
			return request.send(this.requestCtx, messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject);
		}
		expungeContent(appId, msgId, attemptId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}/content");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			request.setPathParam("attempt_id", attemptId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		listAttemptedDestinations(appId, msgId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator
			});
			return request.send(this.requestCtx, listResponseMessageEndpointOut_1.ListResponseMessageEndpointOutSerializer._fromJsonObject);
		}
		resend(appId, msgId, endpointId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/resend");
			request.setPathParam("app_id", appId);
			request.setPathParam("msg_id", msgId);
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			return request.send(this.requestCtx, emptyResponse_1.EmptyResponseSerializer._fromJsonObject);
		}
	};
	exports.MessageAttempt = MessageAttempt;
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointOut.js
var require_operationalWebhookEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointOutSerializer = void 0;
	exports.OperationalWebhookEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				createdAt: new Date(object["createdAt"]),
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				id: object["id"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"]),
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				createdAt: self.createdAt,
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				id: self.id,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				uid: self.uid,
				updatedAt: self.updatedAt,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseOperationalWebhookEndpointOut.js
var require_listResponseOperationalWebhookEndpointOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseOperationalWebhookEndpointOutSerializer = void 0;
	var operationalWebhookEndpointOut_1 = require_operationalWebhookEndpointOut();
	exports.ListResponseOperationalWebhookEndpointOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointHeadersIn.js
var require_operationalWebhookEndpointHeadersIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointHeadersInSerializer = void 0;
	exports.OperationalWebhookEndpointHeadersInSerializer = {
		_fromJsonObject(object) {
			return { headers: object["headers"] };
		},
		_toJsonObject(self) {
			return { headers: self.headers };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointHeadersOut.js
var require_operationalWebhookEndpointHeadersOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointHeadersOutSerializer = void 0;
	exports.OperationalWebhookEndpointHeadersOutSerializer = {
		_fromJsonObject(object) {
			return {
				headers: object["headers"],
				sensitive: object["sensitive"]
			};
		},
		_toJsonObject(self) {
			return {
				headers: self.headers,
				sensitive: self.sensitive
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointIn.js
var require_operationalWebhookEndpointIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointInSerializer = void 0;
	exports.OperationalWebhookEndpointInSerializer = {
		_fromJsonObject(object) {
			return {
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				secret: object["secret"],
				uid: object["uid"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				secret: self.secret,
				uid: self.uid,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointSecretIn.js
var require_operationalWebhookEndpointSecretIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointSecretInSerializer = void 0;
	exports.OperationalWebhookEndpointSecretInSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointSecretOut.js
var require_operationalWebhookEndpointSecretOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointSecretOutSerializer = void 0;
	exports.OperationalWebhookEndpointSecretOutSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/operationalWebhookEndpointUpdate.js
var require_operationalWebhookEndpointUpdate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpointUpdateSerializer = void 0;
	exports.OperationalWebhookEndpointUpdateSerializer = {
		_fromJsonObject(object) {
			return {
				description: object["description"],
				disabled: object["disabled"],
				filterTypes: object["filterTypes"],
				metadata: object["metadata"],
				rateLimit: object["rateLimit"],
				uid: object["uid"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				description: self.description,
				disabled: self.disabled,
				filterTypes: self.filterTypes,
				metadata: self.metadata,
				rateLimit: self.rateLimit,
				uid: self.uid,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/operationalWebhookEndpoint.js
var require_operationalWebhookEndpoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhookEndpoint = void 0;
	var listResponseOperationalWebhookEndpointOut_1 = require_listResponseOperationalWebhookEndpointOut();
	var operationalWebhookEndpointHeadersIn_1 = require_operationalWebhookEndpointHeadersIn();
	var operationalWebhookEndpointHeadersOut_1 = require_operationalWebhookEndpointHeadersOut();
	var operationalWebhookEndpointIn_1 = require_operationalWebhookEndpointIn();
	var operationalWebhookEndpointOut_1 = require_operationalWebhookEndpointOut();
	var operationalWebhookEndpointSecretIn_1 = require_operationalWebhookEndpointSecretIn();
	var operationalWebhookEndpointSecretOut_1 = require_operationalWebhookEndpointSecretOut();
	var operationalWebhookEndpointUpdate_1 = require_operationalWebhookEndpointUpdate();
	var request_1 = require_request();
	var OperationalWebhookEndpoint = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint");
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseOperationalWebhookEndpointOut_1.ListResponseOperationalWebhookEndpointOutSerializer._fromJsonObject);
		}
		create(operationalWebhookEndpointIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(operationalWebhookEndpointIn_1.OperationalWebhookEndpointInSerializer._toJsonObject(operationalWebhookEndpointIn));
			return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
		}
		get(endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
		}
		update(endpointId, operationalWebhookEndpointUpdate) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(operationalWebhookEndpointUpdate_1.OperationalWebhookEndpointUpdateSerializer._toJsonObject(operationalWebhookEndpointUpdate));
			return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
		}
		delete(endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
			request.setPathParam("endpoint_id", endpointId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		getHeaders(endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, operationalWebhookEndpointHeadersOut_1.OperationalWebhookEndpointHeadersOutSerializer._fromJsonObject);
		}
		updateHeaders(endpointId, operationalWebhookEndpointHeadersIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
			request.setPathParam("endpoint_id", endpointId);
			request.setBody(operationalWebhookEndpointHeadersIn_1.OperationalWebhookEndpointHeadersInSerializer._toJsonObject(operationalWebhookEndpointHeadersIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
		getSecret(endpointId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret");
			request.setPathParam("endpoint_id", endpointId);
			return request.send(this.requestCtx, operationalWebhookEndpointSecretOut_1.OperationalWebhookEndpointSecretOutSerializer._fromJsonObject);
		}
		rotateSecret(endpointId, operationalWebhookEndpointSecretIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret/rotate");
			request.setPathParam("endpoint_id", endpointId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(operationalWebhookEndpointSecretIn_1.OperationalWebhookEndpointSecretInSerializer._toJsonObject(operationalWebhookEndpointSecretIn));
			return request.sendNoResponseBody(this.requestCtx);
		}
	};
	exports.OperationalWebhookEndpoint = OperationalWebhookEndpoint;
}));
//#endregion
//#region node_modules/svix/dist/api/operationalWebhook.js
var require_operationalWebhook = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OperationalWebhook = void 0;
	var operationalWebhookEndpoint_1 = require_operationalWebhookEndpoint();
	var OperationalWebhook = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		get endpoint() {
			return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
		}
	};
	exports.OperationalWebhook = OperationalWebhook;
}));
//#endregion
//#region node_modules/svix/dist/models/aggregateEventTypesOut.js
var require_aggregateEventTypesOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AggregateEventTypesOutSerializer = void 0;
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	var backgroundTaskType_1 = require_backgroundTaskType();
	exports.AggregateEventTypesOutSerializer = {
		_fromJsonObject(object) {
			return {
				id: object["id"],
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				id: self.id,
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/appUsageStatsIn.js
var require_appUsageStatsIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppUsageStatsInSerializer = void 0;
	exports.AppUsageStatsInSerializer = {
		_fromJsonObject(object) {
			return {
				appIds: object["appIds"],
				since: new Date(object["since"]),
				until: new Date(object["until"])
			};
		},
		_toJsonObject(self) {
			return {
				appIds: self.appIds,
				since: self.since,
				until: self.until
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/appUsageStatsOut.js
var require_appUsageStatsOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppUsageStatsOutSerializer = void 0;
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	var backgroundTaskType_1 = require_backgroundTaskType();
	exports.AppUsageStatsOutSerializer = {
		_fromJsonObject(object) {
			return {
				id: object["id"],
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
				unresolvedAppIds: object["unresolvedAppIds"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				id: self.id,
				status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
				task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
				unresolvedAppIds: self.unresolvedAppIds,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/statistics.js
var require_statistics = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Statistics = void 0;
	var aggregateEventTypesOut_1 = require_aggregateEventTypesOut();
	var appUsageStatsIn_1 = require_appUsageStatsIn();
	var appUsageStatsOut_1 = require_appUsageStatsOut();
	var request_1 = require_request();
	var Statistics = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		aggregateAppStats(appUsageStatsIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stats/usage/app");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(appUsageStatsIn_1.AppUsageStatsInSerializer._toJsonObject(appUsageStatsIn));
			return request.send(this.requestCtx, appUsageStatsOut_1.AppUsageStatsOutSerializer._fromJsonObject);
		}
		aggregateEventTypes() {
			return new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stats/usage/event-types").send(this.requestCtx, aggregateEventTypesOut_1.AggregateEventTypesOutSerializer._fromJsonObject);
		}
	};
	exports.Statistics = Statistics;
}));
//#endregion
//#region node_modules/svix/dist/models/httpSinkHeadersPatchIn.js
var require_httpSinkHeadersPatchIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HttpSinkHeadersPatchInSerializer = void 0;
	exports.HttpSinkHeadersPatchInSerializer = {
		_fromJsonObject(object) {
			return { headers: object["headers"] };
		},
		_toJsonObject(self) {
			return { headers: self.headers };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkTransformationOut.js
var require_sinkTransformationOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkTransformationOutSerializer = void 0;
	exports.SinkTransformationOutSerializer = {
		_fromJsonObject(object) {
			return {
				code: object["code"],
				enabled: object["enabled"]
			};
		},
		_toJsonObject(self) {
			return {
				code: self.code,
				enabled: self.enabled
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamEventTypeOut.js
var require_streamEventTypeOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamEventTypeOutSerializer = void 0;
	exports.StreamEventTypeOutSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				createdAt: new Date(object["createdAt"]),
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlags: object["featureFlags"],
				name: object["name"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				createdAt: self.createdAt,
				deprecated: self.deprecated,
				description: self.description,
				featureFlags: self.featureFlags,
				name: self.name,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseStreamEventTypeOut.js
var require_listResponseStreamEventTypeOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseStreamEventTypeOutSerializer = void 0;
	var streamEventTypeOut_1 = require_streamEventTypeOut();
	exports.ListResponseStreamEventTypeOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => streamEventTypeOut_1.StreamEventTypeOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => streamEventTypeOut_1.StreamEventTypeOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamEventTypeIn.js
var require_streamEventTypeIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamEventTypeInSerializer = void 0;
	exports.StreamEventTypeInSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlags: object["featureFlags"],
				name: object["name"]
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				deprecated: self.deprecated,
				description: self.description,
				featureFlags: self.featureFlags,
				name: self.name
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamEventTypePatch.js
var require_streamEventTypePatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamEventTypePatchSerializer = void 0;
	exports.StreamEventTypePatchSerializer = {
		_fromJsonObject(object) {
			return {
				archived: object["archived"],
				deprecated: object["deprecated"],
				description: object["description"],
				featureFlags: object["featureFlags"],
				name: object["name"]
			};
		},
		_toJsonObject(self) {
			return {
				archived: self.archived,
				deprecated: self.deprecated,
				description: self.description,
				featureFlags: self.featureFlags,
				name: self.name
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/streamingEventType.js
var require_streamingEventType = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamingEventType = void 0;
	var listResponseStreamEventTypeOut_1 = require_listResponseStreamEventTypeOut();
	var streamEventTypeIn_1 = require_streamEventTypeIn();
	var streamEventTypeOut_1 = require_streamEventTypeOut();
	var streamEventTypePatch_1 = require_streamEventTypePatch();
	var request_1 = require_request();
	var StreamingEventType = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/event-type");
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order,
				include_archived: options === null || options === void 0 ? void 0 : options.includeArchived
			});
			return request.send(this.requestCtx, listResponseStreamEventTypeOut_1.ListResponseStreamEventTypeOutSerializer._fromJsonObject);
		}
		create(streamEventTypeIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stream/event-type");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(streamEventTypeIn_1.StreamEventTypeInSerializer._toJsonObject(streamEventTypeIn));
			return request.send(this.requestCtx, streamEventTypeOut_1.StreamEventTypeOutSerializer._fromJsonObject);
		}
		get(name) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/event-type/{name}");
			request.setPathParam("name", name);
			return request.send(this.requestCtx, streamEventTypeOut_1.StreamEventTypeOutSerializer._fromJsonObject);
		}
		update(name, streamEventTypeIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stream/event-type/{name}");
			request.setPathParam("name", name);
			request.setBody(streamEventTypeIn_1.StreamEventTypeInSerializer._toJsonObject(streamEventTypeIn));
			return request.send(this.requestCtx, streamEventTypeOut_1.StreamEventTypeOutSerializer._fromJsonObject);
		}
		delete(name, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/stream/event-type/{name}");
			request.setPathParam("name", name);
			request.setQueryParams({ expunge: options === null || options === void 0 ? void 0 : options.expunge });
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(name, streamEventTypePatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/stream/event-type/{name}");
			request.setPathParam("name", name);
			request.setBody(streamEventTypePatch_1.StreamEventTypePatchSerializer._toJsonObject(streamEventTypePatch));
			return request.send(this.requestCtx, streamEventTypeOut_1.StreamEventTypeOutSerializer._fromJsonObject);
		}
	};
	exports.StreamingEventType = StreamingEventType;
}));
//#endregion
//#region node_modules/svix/dist/models/eventIn.js
var require_eventIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventInSerializer = void 0;
	exports.EventInSerializer = {
		_fromJsonObject(object) {
			return {
				eventType: object["eventType"],
				payload: object["payload"]
			};
		},
		_toJsonObject(self) {
			return {
				eventType: self.eventType,
				payload: self.payload
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamIn.js
var require_streamIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamInSerializer = void 0;
	exports.StreamInSerializer = {
		_fromJsonObject(object) {
			return {
				metadata: object["metadata"],
				name: object["name"],
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			return {
				metadata: self.metadata,
				name: self.name,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/createStreamEventsIn.js
var require_createStreamEventsIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateStreamEventsInSerializer = void 0;
	var eventIn_1 = require_eventIn();
	var streamIn_1 = require_streamIn();
	exports.CreateStreamEventsInSerializer = {
		_fromJsonObject(object) {
			return {
				events: object["events"].map((item) => eventIn_1.EventInSerializer._fromJsonObject(item)),
				stream: object["stream"] != null ? streamIn_1.StreamInSerializer._fromJsonObject(object["stream"]) : void 0
			};
		},
		_toJsonObject(self) {
			return {
				events: self.events.map((item) => eventIn_1.EventInSerializer._toJsonObject(item)),
				stream: self.stream != null ? streamIn_1.StreamInSerializer._toJsonObject(self.stream) : void 0
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/createStreamEventsOut.js
var require_createStreamEventsOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateStreamEventsOutSerializer = void 0;
	exports.CreateStreamEventsOutSerializer = {
		_fromJsonObject(_object) {
			return {};
		},
		_toJsonObject(_self) {
			return {};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventOut.js
var require_eventOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventOutSerializer = void 0;
	exports.EventOutSerializer = {
		_fromJsonObject(object) {
			return {
				eventType: object["eventType"],
				payload: object["payload"],
				timestamp: new Date(object["timestamp"])
			};
		},
		_toJsonObject(self) {
			return {
				eventType: self.eventType,
				payload: self.payload,
				timestamp: self.timestamp
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/eventStreamOut.js
var require_eventStreamOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventStreamOutSerializer = void 0;
	var eventOut_1 = require_eventOut();
	exports.EventStreamOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => eventOut_1.EventOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => eventOut_1.EventOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/streamingEvents.js
var require_streamingEvents = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamingEvents = void 0;
	var createStreamEventsIn_1 = require_createStreamEventsIn();
	var createStreamEventsOut_1 = require_createStreamEventsOut();
	var eventStreamOut_1 = require_eventStreamOut();
	var request_1 = require_request();
	var StreamingEvents = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		create(streamId, createStreamEventsIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stream/{stream_id}/events");
			request.setPathParam("stream_id", streamId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(createStreamEventsIn_1.CreateStreamEventsInSerializer._toJsonObject(createStreamEventsIn));
			return request.send(this.requestCtx, createStreamEventsOut_1.CreateStreamEventsOutSerializer._fromJsonObject);
		}
		get(streamId, sinkId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}/sink/{sink_id}/events");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				after: options === null || options === void 0 ? void 0 : options.after
			});
			return request.send(this.requestCtx, eventStreamOut_1.EventStreamOutSerializer._fromJsonObject);
		}
	};
	exports.StreamingEvents = StreamingEvents;
}));
//#endregion
//#region node_modules/svix/dist/models/azureBlobStorageConfig.js
var require_azureBlobStorageConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AzureBlobStorageConfigSerializer = void 0;
	exports.AzureBlobStorageConfigSerializer = {
		_fromJsonObject(object) {
			return {
				accessKey: object["accessKey"],
				account: object["account"],
				container: object["container"]
			};
		},
		_toJsonObject(self) {
			return {
				accessKey: self.accessKey,
				account: self.account,
				container: self.container
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/googleCloudStorageConfig.js
var require_googleCloudStorageConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GoogleCloudStorageConfigSerializer = void 0;
	exports.GoogleCloudStorageConfigSerializer = {
		_fromJsonObject(object) {
			return {
				bucket: object["bucket"],
				credentials: object["credentials"]
			};
		},
		_toJsonObject(self) {
			return {
				bucket: self.bucket,
				credentials: self.credentials
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/s3Config.js
var require_s3Config = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.S3ConfigSerializer = void 0;
	exports.S3ConfigSerializer = {
		_fromJsonObject(object) {
			return {
				accessKeyId: object["accessKeyId"],
				bucket: object["bucket"],
				endpointUrl: object["endpointUrl"],
				region: object["region"],
				secretAccessKey: object["secretAccessKey"]
			};
		},
		_toJsonObject(self) {
			return {
				accessKeyId: self.accessKeyId,
				bucket: self.bucket,
				endpointUrl: self.endpointUrl,
				region: self.region,
				secretAccessKey: self.secretAccessKey
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkHttpConfig.js
var require_sinkHttpConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkHttpConfigSerializer = void 0;
	exports.SinkHttpConfigSerializer = {
		_fromJsonObject(object) {
			return {
				headers: object["headers"],
				key: object["key"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				headers: self.headers,
				key: self.key,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkOtelV1Config.js
var require_sinkOtelV1Config = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkOtelV1ConfigSerializer = void 0;
	exports.SinkOtelV1ConfigSerializer = {
		_fromJsonObject(object) {
			return {
				headers: object["headers"],
				url: object["url"]
			};
		},
		_toJsonObject(self) {
			return {
				headers: self.headers,
				url: self.url
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkStatus.js
var require_sinkStatus = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkStatusSerializer = exports.SinkStatus = void 0;
	(function(SinkStatus) {
		SinkStatus["Enabled"] = "enabled";
		SinkStatus["Paused"] = "paused";
		SinkStatus["Disabled"] = "disabled";
		SinkStatus["Retrying"] = "retrying";
	})(exports.SinkStatus || (exports.SinkStatus = {}));
	exports.SinkStatusSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamSinkOut.js
var require_streamSinkOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamSinkOutSerializer = void 0;
	var azureBlobStorageConfig_1 = require_azureBlobStorageConfig();
	var googleCloudStorageConfig_1 = require_googleCloudStorageConfig();
	var s3Config_1 = require_s3Config();
	var sinkHttpConfig_1 = require_sinkHttpConfig();
	var sinkOtelV1Config_1 = require_sinkOtelV1Config();
	var sinkStatus_1 = require_sinkStatus();
	exports.StreamSinkOutSerializer = {
		_fromJsonObject(object) {
			const type = object["type"];
			function getConfig(type) {
				switch (type) {
					case "poller": return {};
					case "azureBlobStorage": return azureBlobStorageConfig_1.AzureBlobStorageConfigSerializer._fromJsonObject(object["config"]);
					case "otelTracing": return sinkOtelV1Config_1.SinkOtelV1ConfigSerializer._fromJsonObject(object["config"]);
					case "http": return sinkHttpConfig_1.SinkHttpConfigSerializer._fromJsonObject(object["config"]);
					case "amazonS3": return s3Config_1.S3ConfigSerializer._fromJsonObject(object["config"]);
					case "googleCloudStorage": return googleCloudStorageConfig_1.GoogleCloudStorageConfigSerializer._fromJsonObject(object["config"]);
					default: throw new Error(`Unexpected type: ${type}`);
				}
			}
			return {
				type,
				config: getConfig(type),
				batchSize: object["batchSize"],
				createdAt: new Date(object["createdAt"]),
				currentIterator: object["currentIterator"],
				eventTypes: object["eventTypes"],
				failureReason: object["failureReason"],
				id: object["id"],
				maxWaitSecs: object["maxWaitSecs"],
				metadata: object["metadata"],
				nextRetryAt: object["nextRetryAt"] ? new Date(object["nextRetryAt"]) : null,
				status: sinkStatus_1.SinkStatusSerializer._fromJsonObject(object["status"]),
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			let config;
			switch (self.type) {
				case "poller":
					config = {};
					break;
				case "azureBlobStorage":
					config = azureBlobStorageConfig_1.AzureBlobStorageConfigSerializer._toJsonObject(self.config);
					break;
				case "otelTracing":
					config = sinkOtelV1Config_1.SinkOtelV1ConfigSerializer._toJsonObject(self.config);
					break;
				case "http":
					config = sinkHttpConfig_1.SinkHttpConfigSerializer._toJsonObject(self.config);
					break;
				case "amazonS3":
					config = s3Config_1.S3ConfigSerializer._toJsonObject(self.config);
					break;
				case "googleCloudStorage":
					config = googleCloudStorageConfig_1.GoogleCloudStorageConfigSerializer._toJsonObject(self.config);
					break;
			}
			return {
				type: self.type,
				config,
				batchSize: self.batchSize,
				createdAt: self.createdAt,
				currentIterator: self.currentIterator,
				eventTypes: self.eventTypes,
				failureReason: self.failureReason,
				id: self.id,
				maxWaitSecs: self.maxWaitSecs,
				metadata: self.metadata,
				nextRetryAt: self.nextRetryAt,
				status: sinkStatus_1.SinkStatusSerializer._toJsonObject(self.status),
				uid: self.uid,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseStreamSinkOut.js
var require_listResponseStreamSinkOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseStreamSinkOutSerializer = void 0;
	var streamSinkOut_1 = require_streamSinkOut();
	exports.ListResponseStreamSinkOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => streamSinkOut_1.StreamSinkOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => streamSinkOut_1.StreamSinkOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkSecretOut.js
var require_sinkSecretOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkSecretOutSerializer = void 0;
	exports.SinkSecretOutSerializer = {
		_fromJsonObject(object) {
			return { key: object["key"] };
		},
		_toJsonObject(self) {
			return { key: self.key };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkTransformIn.js
var require_sinkTransformIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkTransformInSerializer = void 0;
	exports.SinkTransformInSerializer = {
		_fromJsonObject(object) {
			return { code: object["code"] };
		},
		_toJsonObject(self) {
			return { code: self.code };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/sinkStatusIn.js
var require_sinkStatusIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SinkStatusInSerializer = exports.SinkStatusIn = void 0;
	(function(SinkStatusIn) {
		SinkStatusIn["Enabled"] = "enabled";
		SinkStatusIn["Disabled"] = "disabled";
	})(exports.SinkStatusIn || (exports.SinkStatusIn = {}));
	exports.SinkStatusInSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamSinkIn.js
var require_streamSinkIn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamSinkInSerializer = void 0;
	var azureBlobStorageConfig_1 = require_azureBlobStorageConfig();
	var googleCloudStorageConfig_1 = require_googleCloudStorageConfig();
	var s3Config_1 = require_s3Config();
	var sinkHttpConfig_1 = require_sinkHttpConfig();
	var sinkOtelV1Config_1 = require_sinkOtelV1Config();
	var sinkStatusIn_1 = require_sinkStatusIn();
	exports.StreamSinkInSerializer = {
		_fromJsonObject(object) {
			const type = object["type"];
			function getConfig(type) {
				switch (type) {
					case "poller": return {};
					case "azureBlobStorage": return azureBlobStorageConfig_1.AzureBlobStorageConfigSerializer._fromJsonObject(object["config"]);
					case "otelTracing": return sinkOtelV1Config_1.SinkOtelV1ConfigSerializer._fromJsonObject(object["config"]);
					case "http": return sinkHttpConfig_1.SinkHttpConfigSerializer._fromJsonObject(object["config"]);
					case "amazonS3": return s3Config_1.S3ConfigSerializer._fromJsonObject(object["config"]);
					case "googleCloudStorage": return googleCloudStorageConfig_1.GoogleCloudStorageConfigSerializer._fromJsonObject(object["config"]);
					default: throw new Error(`Unexpected type: ${type}`);
				}
			}
			return {
				type,
				config: getConfig(type),
				batchSize: object["batchSize"],
				eventTypes: object["eventTypes"],
				maxWaitSecs: object["maxWaitSecs"],
				metadata: object["metadata"],
				status: object["status"] != null ? sinkStatusIn_1.SinkStatusInSerializer._fromJsonObject(object["status"]) : void 0,
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			let config;
			switch (self.type) {
				case "poller":
					config = {};
					break;
				case "azureBlobStorage":
					config = azureBlobStorageConfig_1.AzureBlobStorageConfigSerializer._toJsonObject(self.config);
					break;
				case "otelTracing":
					config = sinkOtelV1Config_1.SinkOtelV1ConfigSerializer._toJsonObject(self.config);
					break;
				case "http":
					config = sinkHttpConfig_1.SinkHttpConfigSerializer._toJsonObject(self.config);
					break;
				case "amazonS3":
					config = s3Config_1.S3ConfigSerializer._toJsonObject(self.config);
					break;
				case "googleCloudStorage":
					config = googleCloudStorageConfig_1.GoogleCloudStorageConfigSerializer._toJsonObject(self.config);
					break;
			}
			return {
				type: self.type,
				config,
				batchSize: self.batchSize,
				eventTypes: self.eventTypes,
				maxWaitSecs: self.maxWaitSecs,
				metadata: self.metadata,
				status: self.status != null ? sinkStatusIn_1.SinkStatusInSerializer._toJsonObject(self.status) : void 0,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/amazonS3PatchConfig.js
var require_amazonS3PatchConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AmazonS3PatchConfigSerializer = void 0;
	exports.AmazonS3PatchConfigSerializer = {
		_fromJsonObject(object) {
			return {
				accessKeyId: object["accessKeyId"],
				bucket: object["bucket"],
				endpointUrl: object["endpointUrl"],
				region: object["region"],
				secretAccessKey: object["secretAccessKey"]
			};
		},
		_toJsonObject(self) {
			return {
				accessKeyId: self.accessKeyId,
				bucket: self.bucket,
				endpointUrl: self.endpointUrl,
				region: self.region,
				secretAccessKey: self.secretAccessKey
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/azureBlobStoragePatchConfig.js
var require_azureBlobStoragePatchConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AzureBlobStoragePatchConfigSerializer = void 0;
	exports.AzureBlobStoragePatchConfigSerializer = {
		_fromJsonObject(object) {
			return {
				accessKey: object["accessKey"],
				account: object["account"],
				container: object["container"]
			};
		},
		_toJsonObject(self) {
			return {
				accessKey: self.accessKey,
				account: self.account,
				container: self.container
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/googleCloudStoragePatchConfig.js
var require_googleCloudStoragePatchConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GoogleCloudStoragePatchConfigSerializer = void 0;
	exports.GoogleCloudStoragePatchConfigSerializer = {
		_fromJsonObject(object) {
			return {
				bucket: object["bucket"],
				credentials: object["credentials"]
			};
		},
		_toJsonObject(self) {
			return {
				bucket: self.bucket,
				credentials: self.credentials
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/httpPatchConfig.js
var require_httpPatchConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HttpPatchConfigSerializer = void 0;
	exports.HttpPatchConfigSerializer = {
		_fromJsonObject(object) {
			return { url: object["url"] };
		},
		_toJsonObject(self) {
			return { url: self.url };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/otelTracingPatchConfig.js
var require_otelTracingPatchConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OtelTracingPatchConfigSerializer = void 0;
	exports.OtelTracingPatchConfigSerializer = {
		_fromJsonObject(object) {
			return { url: object["url"] };
		},
		_toJsonObject(self) {
			return { url: self.url };
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamSinkPatch.js
var require_streamSinkPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamSinkPatchSerializer = void 0;
	var amazonS3PatchConfig_1 = require_amazonS3PatchConfig();
	var azureBlobStoragePatchConfig_1 = require_azureBlobStoragePatchConfig();
	var googleCloudStoragePatchConfig_1 = require_googleCloudStoragePatchConfig();
	var httpPatchConfig_1 = require_httpPatchConfig();
	var otelTracingPatchConfig_1 = require_otelTracingPatchConfig();
	var sinkStatusIn_1 = require_sinkStatusIn();
	exports.StreamSinkPatchSerializer = {
		_fromJsonObject(object) {
			const type = object["type"];
			function getConfig(type) {
				switch (type) {
					case "poller": return {};
					case "azureBlobStorage": return azureBlobStoragePatchConfig_1.AzureBlobStoragePatchConfigSerializer._fromJsonObject(object["config"]);
					case "otelTracing": return otelTracingPatchConfig_1.OtelTracingPatchConfigSerializer._fromJsonObject(object["config"]);
					case "http": return httpPatchConfig_1.HttpPatchConfigSerializer._fromJsonObject(object["config"]);
					case "amazonS3": return amazonS3PatchConfig_1.AmazonS3PatchConfigSerializer._fromJsonObject(object["config"]);
					case "googleCloudStorage": return googleCloudStoragePatchConfig_1.GoogleCloudStoragePatchConfigSerializer._fromJsonObject(object["config"]);
					default: throw new Error(`Unexpected type: ${type}`);
				}
			}
			return {
				type,
				config: getConfig(type),
				batchSize: object["batchSize"],
				eventTypes: object["eventTypes"],
				maxWaitSecs: object["maxWaitSecs"],
				metadata: object["metadata"],
				status: object["status"] != null ? sinkStatusIn_1.SinkStatusInSerializer._fromJsonObject(object["status"]) : void 0,
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			let config;
			switch (self.type) {
				case "poller":
					config = {};
					break;
				case "azureBlobStorage":
					config = azureBlobStoragePatchConfig_1.AzureBlobStoragePatchConfigSerializer._toJsonObject(self.config);
					break;
				case "otelTracing":
					config = otelTracingPatchConfig_1.OtelTracingPatchConfigSerializer._toJsonObject(self.config);
					break;
				case "http":
					config = httpPatchConfig_1.HttpPatchConfigSerializer._toJsonObject(self.config);
					break;
				case "amazonS3":
					config = amazonS3PatchConfig_1.AmazonS3PatchConfigSerializer._toJsonObject(self.config);
					break;
				case "googleCloudStorage":
					config = googleCloudStoragePatchConfig_1.GoogleCloudStoragePatchConfigSerializer._toJsonObject(self.config);
					break;
			}
			return {
				type: self.type,
				config,
				batchSize: self.batchSize,
				eventTypes: self.eventTypes,
				maxWaitSecs: self.maxWaitSecs,
				metadata: self.metadata,
				status: self.status != null ? sinkStatusIn_1.SinkStatusInSerializer._toJsonObject(self.status) : void 0,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/streamingSink.js
var require_streamingSink = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamingSink = void 0;
	var emptyResponse_1 = require_emptyResponse();
	var endpointSecretRotateIn_1 = require_endpointSecretRotateIn();
	var listResponseStreamSinkOut_1 = require_listResponseStreamSinkOut();
	var sinkSecretOut_1 = require_sinkSecretOut();
	var sinkTransformIn_1 = require_sinkTransformIn();
	var streamSinkIn_1 = require_streamSinkIn();
	var streamSinkOut_1 = require_streamSinkOut();
	var streamSinkPatch_1 = require_streamSinkPatch();
	var request_1 = require_request();
	var StreamingSink = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(streamId, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}/sink");
			request.setPathParam("stream_id", streamId);
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseStreamSinkOut_1.ListResponseStreamSinkOutSerializer._fromJsonObject);
		}
		create(streamId, streamSinkIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stream/{stream_id}/sink");
			request.setPathParam("stream_id", streamId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(streamSinkIn_1.StreamSinkInSerializer._toJsonObject(streamSinkIn));
			return request.send(this.requestCtx, streamSinkOut_1.StreamSinkOutSerializer._fromJsonObject);
		}
		get(streamId, sinkId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}/sink/{sink_id}");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			return request.send(this.requestCtx, streamSinkOut_1.StreamSinkOutSerializer._fromJsonObject);
		}
		update(streamId, sinkId, streamSinkIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stream/{stream_id}/sink/{sink_id}");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setBody(streamSinkIn_1.StreamSinkInSerializer._toJsonObject(streamSinkIn));
			return request.send(this.requestCtx, streamSinkOut_1.StreamSinkOutSerializer._fromJsonObject);
		}
		delete(streamId, sinkId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/stream/{stream_id}/sink/{sink_id}");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(streamId, sinkId, streamSinkPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/stream/{stream_id}/sink/{sink_id}");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setBody(streamSinkPatch_1.StreamSinkPatchSerializer._toJsonObject(streamSinkPatch));
			return request.send(this.requestCtx, streamSinkOut_1.StreamSinkOutSerializer._fromJsonObject);
		}
		getSecret(streamId, sinkId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}/sink/{sink_id}/secret");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			return request.send(this.requestCtx, sinkSecretOut_1.SinkSecretOutSerializer._fromJsonObject);
		}
		rotateSecret(streamId, sinkId, endpointSecretRotateIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stream/{stream_id}/sink/{sink_id}/secret/rotate");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(endpointSecretRotateIn_1.EndpointSecretRotateInSerializer._toJsonObject(endpointSecretRotateIn));
			return request.send(this.requestCtx, emptyResponse_1.EmptyResponseSerializer._fromJsonObject);
		}
		transformationPartialUpdate(streamId, sinkId, sinkTransformIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/stream/{stream_id}/sink/{sink_id}/transformation");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setBody(sinkTransformIn_1.SinkTransformInSerializer._toJsonObject(sinkTransformIn));
			return request.send(this.requestCtx, emptyResponse_1.EmptyResponseSerializer._fromJsonObject);
		}
	};
	exports.StreamingSink = StreamingSink;
}));
//#endregion
//#region node_modules/svix/dist/models/streamOut.js
var require_streamOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamOutSerializer = void 0;
	exports.StreamOutSerializer = {
		_fromJsonObject(object) {
			return {
				createdAt: new Date(object["createdAt"]),
				id: object["id"],
				metadata: object["metadata"],
				name: object["name"],
				uid: object["uid"],
				updatedAt: new Date(object["updatedAt"])
			};
		},
		_toJsonObject(self) {
			return {
				createdAt: self.createdAt,
				id: self.id,
				metadata: self.metadata,
				name: self.name,
				uid: self.uid,
				updatedAt: self.updatedAt
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/listResponseStreamOut.js
var require_listResponseStreamOut = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ListResponseStreamOutSerializer = void 0;
	var streamOut_1 = require_streamOut();
	exports.ListResponseStreamOutSerializer = {
		_fromJsonObject(object) {
			return {
				data: object["data"].map((item) => streamOut_1.StreamOutSerializer._fromJsonObject(item)),
				done: object["done"],
				iterator: object["iterator"],
				prevIterator: object["prevIterator"]
			};
		},
		_toJsonObject(self) {
			return {
				data: self.data.map((item) => streamOut_1.StreamOutSerializer._toJsonObject(item)),
				done: self.done,
				iterator: self.iterator,
				prevIterator: self.prevIterator
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/streamPatch.js
var require_streamPatch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamPatchSerializer = void 0;
	exports.StreamPatchSerializer = {
		_fromJsonObject(object) {
			return {
				description: object["description"],
				metadata: object["metadata"],
				uid: object["uid"]
			};
		},
		_toJsonObject(self) {
			return {
				description: self.description,
				metadata: self.metadata,
				uid: self.uid
			};
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/api/streamingStream.js
var require_streamingStream = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StreamingStream = void 0;
	var listResponseStreamOut_1 = require_listResponseStreamOut();
	var streamIn_1 = require_streamIn();
	var streamOut_1 = require_streamOut();
	var streamPatch_1 = require_streamPatch();
	var request_1 = require_request();
	var StreamingStream = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		list(options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream");
			request.setQueryParams({
				limit: options === null || options === void 0 ? void 0 : options.limit,
				iterator: options === null || options === void 0 ? void 0 : options.iterator,
				order: options === null || options === void 0 ? void 0 : options.order
			});
			return request.send(this.requestCtx, listResponseStreamOut_1.ListResponseStreamOutSerializer._fromJsonObject);
		}
		create(streamIn, options) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stream");
			request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
			request.setBody(streamIn_1.StreamInSerializer._toJsonObject(streamIn));
			return request.send(this.requestCtx, streamOut_1.StreamOutSerializer._fromJsonObject);
		}
		get(streamId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}");
			request.setPathParam("stream_id", streamId);
			return request.send(this.requestCtx, streamOut_1.StreamOutSerializer._fromJsonObject);
		}
		update(streamId, streamIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stream/{stream_id}");
			request.setPathParam("stream_id", streamId);
			request.setBody(streamIn_1.StreamInSerializer._toJsonObject(streamIn));
			return request.send(this.requestCtx, streamOut_1.StreamOutSerializer._fromJsonObject);
		}
		delete(streamId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/stream/{stream_id}");
			request.setPathParam("stream_id", streamId);
			return request.sendNoResponseBody(this.requestCtx);
		}
		patch(streamId, streamPatch) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/stream/{stream_id}");
			request.setPathParam("stream_id", streamId);
			request.setBody(streamPatch_1.StreamPatchSerializer._toJsonObject(streamPatch));
			return request.send(this.requestCtx, streamOut_1.StreamOutSerializer._fromJsonObject);
		}
	};
	exports.StreamingStream = StreamingStream;
}));
//#endregion
//#region node_modules/svix/dist/api/streaming.js
var require_streaming = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Streaming = void 0;
	var endpointHeadersOut_1 = require_endpointHeadersOut();
	var httpSinkHeadersPatchIn_1 = require_httpSinkHeadersPatchIn();
	var sinkTransformationOut_1 = require_sinkTransformationOut();
	var streamingEventType_1 = require_streamingEventType();
	var streamingEvents_1 = require_streamingEvents();
	var streamingSink_1 = require_streamingSink();
	var streamingStream_1 = require_streamingStream();
	var request_1 = require_request();
	var Streaming = class {
		constructor(requestCtx) {
			this.requestCtx = requestCtx;
		}
		get event_type() {
			return new streamingEventType_1.StreamingEventType(this.requestCtx);
		}
		get events() {
			return new streamingEvents_1.StreamingEvents(this.requestCtx);
		}
		get sink() {
			return new streamingSink_1.StreamingSink(this.requestCtx);
		}
		get stream() {
			return new streamingStream_1.StreamingStream(this.requestCtx);
		}
		sinkHeadersGet(streamId, sinkId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}/sink/{sink_id}/headers");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			return request.send(this.requestCtx, endpointHeadersOut_1.EndpointHeadersOutSerializer._fromJsonObject);
		}
		sinkHeadersPatch(streamId, sinkId, httpSinkHeadersPatchIn) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/stream/{stream_id}/sink/{sink_id}/headers");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			request.setBody(httpSinkHeadersPatchIn_1.HttpSinkHeadersPatchInSerializer._toJsonObject(httpSinkHeadersPatchIn));
			return request.send(this.requestCtx, endpointHeadersOut_1.EndpointHeadersOutSerializer._fromJsonObject);
		}
		sinkTransformationGet(streamId, sinkId) {
			const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/stream/{stream_id}/sink/{sink_id}/transformation");
			request.setPathParam("stream_id", streamId);
			request.setPathParam("sink_id", sinkId);
			return request.send(this.requestCtx, sinkTransformationOut_1.SinkTransformationOutSerializer._fromJsonObject);
		}
	};
	exports.Streaming = Streaming;
}));
//#endregion
//#region node_modules/svix/dist/HttpErrors.js
var require_HttpErrors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HTTPValidationError = exports.ValidationError = exports.HttpErrorOut = void 0;
	var HttpErrorOut = class HttpErrorOut {
		static getAttributeTypeMap() {
			return HttpErrorOut.attributeTypeMap;
		}
	};
	exports.HttpErrorOut = HttpErrorOut;
	HttpErrorOut.discriminator = void 0;
	HttpErrorOut.mapping = void 0;
	HttpErrorOut.attributeTypeMap = [{
		name: "code",
		baseName: "code",
		type: "string",
		format: ""
	}, {
		name: "detail",
		baseName: "detail",
		type: "string",
		format: ""
	}];
	var ValidationError = class ValidationError {
		static getAttributeTypeMap() {
			return ValidationError.attributeTypeMap;
		}
	};
	exports.ValidationError = ValidationError;
	ValidationError.discriminator = void 0;
	ValidationError.mapping = void 0;
	ValidationError.attributeTypeMap = [
		{
			name: "loc",
			baseName: "loc",
			type: "Array<string>",
			format: ""
		},
		{
			name: "msg",
			baseName: "msg",
			type: "string",
			format: ""
		},
		{
			name: "type",
			baseName: "type",
			type: "string",
			format: ""
		}
	];
	var HTTPValidationError = class HTTPValidationError {
		static getAttributeTypeMap() {
			return HTTPValidationError.attributeTypeMap;
		}
	};
	exports.HTTPValidationError = HTTPValidationError;
	HTTPValidationError.discriminator = void 0;
	HTTPValidationError.mapping = void 0;
	HTTPValidationError.attributeTypeMap = [{
		name: "detail",
		baseName: "detail",
		type: "Array<ValidationError>",
		format: ""
	}];
}));
//#endregion
//#region node_modules/standardwebhooks/dist/timing_safe_equal.js
var require_timing_safe_equal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.timingSafeEqual = void 0;
	function assert(expr, msg = "") {
		if (!expr) throw new Error(msg);
	}
	function timingSafeEqual(a, b) {
		if (a.byteLength !== b.byteLength) return false;
		if (!(a instanceof DataView)) a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
		if (!(b instanceof DataView)) b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
		assert(a instanceof DataView);
		assert(b instanceof DataView);
		const length = a.byteLength;
		let out = 0;
		let i = -1;
		while (++i < length) out |= a.getUint8(i) ^ b.getUint8(i);
		return out === 0;
	}
	exports.timingSafeEqual = timingSafeEqual;
}));
//#endregion
//#region node_modules/standardwebhooks/dist/index.js
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Webhook = exports.WebhookVerificationError = void 0;
	var timing_safe_equal_1 = require_timing_safe_equal();
	var base64 = require_base64();
	var sha256 = require_sha256();
	var WEBHOOK_TOLERANCE_IN_SECONDS = 300;
	var ExtendableError = class ExtendableError extends Error {
		constructor(message) {
			super(message);
			Object.setPrototypeOf(this, ExtendableError.prototype);
			this.name = "ExtendableError";
			this.stack = new Error(message).stack;
		}
	};
	var WebhookVerificationError = class WebhookVerificationError extends ExtendableError {
		constructor(message) {
			super(message);
			Object.setPrototypeOf(this, WebhookVerificationError.prototype);
			this.name = "WebhookVerificationError";
		}
	};
	exports.WebhookVerificationError = WebhookVerificationError;
	var Webhook = class Webhook {
		constructor(secret, options) {
			if (!secret) throw new Error("Secret can't be empty.");
			if ((options === null || options === void 0 ? void 0 : options.format) === "raw") if (secret instanceof Uint8Array) this.key = secret;
			else this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
			else {
				if (typeof secret !== "string") throw new Error("Expected secret to be of type string");
				if (secret.startsWith(Webhook.prefix)) secret = secret.substring(Webhook.prefix.length);
				this.key = base64.decode(secret);
			}
		}
		verify(payload, headers_) {
			const headers = {};
			for (const key of Object.keys(headers_)) headers[key.toLowerCase()] = headers_[key];
			const msgId = headers["webhook-id"];
			const msgSignature = headers["webhook-signature"];
			const msgTimestamp = headers["webhook-timestamp"];
			if (!msgSignature || !msgId || !msgTimestamp) throw new WebhookVerificationError("Missing required headers");
			const timestamp = this.verifyTimestamp(msgTimestamp);
			const expectedSignature = this.sign(msgId, timestamp, payload).split(",")[1];
			const passedSignatures = msgSignature.split(" ");
			const encoder = new globalThis.TextEncoder();
			for (const versionedSignature of passedSignatures) {
				const [version, signature] = versionedSignature.split(",");
				if (version !== "v1") continue;
				if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) return JSON.parse(payload.toString());
			}
			throw new WebhookVerificationError("No matching signature found");
		}
		sign(msgId, timestamp, payload) {
			if (typeof payload === "string") {} else if (payload.constructor.name === "Buffer") payload = payload.toString();
			else throw new Error("Expected payload to be of type string or Buffer.");
			const encoder = new TextEncoder();
			const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
			const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
			return `v1,${base64.encode(sha256.hmac(this.key, toSign))}`;
		}
		verifyTimestamp(timestampHeader) {
			const now = Math.floor(Date.now() / 1e3);
			const timestamp = parseInt(timestampHeader, 10);
			if (isNaN(timestamp)) throw new WebhookVerificationError("Invalid Signature Headers");
			if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) throw new WebhookVerificationError("Message timestamp too old");
			if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) throw new WebhookVerificationError("Message timestamp too new");
			return /* @__PURE__ */ new Date(timestamp * 1e3);
		}
	};
	exports.Webhook = Webhook;
	Webhook.prefix = "whsec_";
}));
//#endregion
//#region node_modules/svix/dist/webhook.js
var require_webhook = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Webhook = exports.WebhookVerificationError = void 0;
	var standardwebhooks_1 = require_dist$1();
	var standardwebhooks_2 = require_dist$1();
	Object.defineProperty(exports, "WebhookVerificationError", {
		enumerable: true,
		get: function() {
			return standardwebhooks_2.WebhookVerificationError;
		}
	});
	var Webhook = class {
		constructor(secret, options) {
			this.inner = new standardwebhooks_1.Webhook(secret, options);
		}
		verify(payload, headers_) {
			var _a, _b, _c, _d, _e, _f;
			const headers = {};
			for (const key of Object.keys(headers_)) headers[key.toLowerCase()] = headers_[key];
			headers["webhook-id"] = (_b = (_a = headers["svix-id"]) !== null && _a !== void 0 ? _a : headers["webhook-id"]) !== null && _b !== void 0 ? _b : "";
			headers["webhook-signature"] = (_d = (_c = headers["svix-signature"]) !== null && _c !== void 0 ? _c : headers["webhook-signature"]) !== null && _d !== void 0 ? _d : "";
			headers["webhook-timestamp"] = (_f = (_e = headers["svix-timestamp"]) !== null && _e !== void 0 ? _e : headers["webhook-timestamp"]) !== null && _f !== void 0 ? _f : "";
			return this.inner.verify(payload, headers);
		}
		sign(msgId, timestamp, payload) {
			return this.inner.sign(msgId, timestamp, payload);
		}
	};
	exports.Webhook = Webhook;
}));
//#endregion
//#region node_modules/svix/dist/models/endpointDisabledTrigger.js
var require_endpointDisabledTrigger = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EndpointDisabledTriggerSerializer = exports.EndpointDisabledTrigger = void 0;
	(function(EndpointDisabledTrigger) {
		EndpointDisabledTrigger["Manual"] = "manual";
		EndpointDisabledTrigger["Automatic"] = "automatic";
	})(exports.EndpointDisabledTrigger || (exports.EndpointDisabledTrigger = {}));
	exports.EndpointDisabledTriggerSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/ordering.js
var require_ordering = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OrderingSerializer = exports.Ordering = void 0;
	(function(Ordering) {
		Ordering["Ascending"] = "ascending";
		Ordering["Descending"] = "descending";
	})(exports.Ordering || (exports.Ordering = {}));
	exports.OrderingSerializer = {
		_fromJsonObject(object) {
			return object;
		},
		_toJsonObject(self) {
			return self;
		}
	};
}));
//#endregion
//#region node_modules/svix/dist/models/index.js
var require_models = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StatusCodeClass = exports.SinkStatusIn = exports.SinkStatus = exports.Ordering = exports.MessageStatusText = exports.MessageStatus = exports.MessageAttemptTriggerType = exports.EndpointDisabledTrigger = exports.ConnectorProduct = exports.ConnectorKind = exports.BackgroundTaskType = exports.BackgroundTaskStatus = exports.AppPortalCapability = void 0;
	var appPortalCapability_1 = require_appPortalCapability();
	Object.defineProperty(exports, "AppPortalCapability", {
		enumerable: true,
		get: function() {
			return appPortalCapability_1.AppPortalCapability;
		}
	});
	var backgroundTaskStatus_1 = require_backgroundTaskStatus();
	Object.defineProperty(exports, "BackgroundTaskStatus", {
		enumerable: true,
		get: function() {
			return backgroundTaskStatus_1.BackgroundTaskStatus;
		}
	});
	var backgroundTaskType_1 = require_backgroundTaskType();
	Object.defineProperty(exports, "BackgroundTaskType", {
		enumerable: true,
		get: function() {
			return backgroundTaskType_1.BackgroundTaskType;
		}
	});
	var connectorKind_1 = require_connectorKind();
	Object.defineProperty(exports, "ConnectorKind", {
		enumerable: true,
		get: function() {
			return connectorKind_1.ConnectorKind;
		}
	});
	var connectorProduct_1 = require_connectorProduct();
	Object.defineProperty(exports, "ConnectorProduct", {
		enumerable: true,
		get: function() {
			return connectorProduct_1.ConnectorProduct;
		}
	});
	var endpointDisabledTrigger_1 = require_endpointDisabledTrigger();
	Object.defineProperty(exports, "EndpointDisabledTrigger", {
		enumerable: true,
		get: function() {
			return endpointDisabledTrigger_1.EndpointDisabledTrigger;
		}
	});
	var messageAttemptTriggerType_1 = require_messageAttemptTriggerType();
	Object.defineProperty(exports, "MessageAttemptTriggerType", {
		enumerable: true,
		get: function() {
			return messageAttemptTriggerType_1.MessageAttemptTriggerType;
		}
	});
	var messageStatus_1 = require_messageStatus();
	Object.defineProperty(exports, "MessageStatus", {
		enumerable: true,
		get: function() {
			return messageStatus_1.MessageStatus;
		}
	});
	var messageStatusText_1 = require_messageStatusText();
	Object.defineProperty(exports, "MessageStatusText", {
		enumerable: true,
		get: function() {
			return messageStatusText_1.MessageStatusText;
		}
	});
	var ordering_1 = require_ordering();
	Object.defineProperty(exports, "Ordering", {
		enumerable: true,
		get: function() {
			return ordering_1.Ordering;
		}
	});
	var sinkStatus_1 = require_sinkStatus();
	Object.defineProperty(exports, "SinkStatus", {
		enumerable: true,
		get: function() {
			return sinkStatus_1.SinkStatus;
		}
	});
	var sinkStatusIn_1 = require_sinkStatusIn();
	Object.defineProperty(exports, "SinkStatusIn", {
		enumerable: true,
		get: function() {
			return sinkStatusIn_1.SinkStatusIn;
		}
	});
	var statusCodeClass_1 = require_statusCodeClass();
	Object.defineProperty(exports, "StatusCodeClass", {
		enumerable: true,
		get: function() {
			return statusCodeClass_1.StatusCodeClass;
		}
	});
}));
//#endregion
//#region node_modules/resend/dist/index.mjs
var import_dist = (/* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Svix = exports.messageInRaw = exports.ValidationError = exports.HttpErrorOut = exports.HTTPValidationError = exports.ApiException = void 0;
	var application_1 = require_application();
	var authentication_1 = require_authentication();
	var backgroundTask_1 = require_backgroundTask();
	var connector_1 = require_connector();
	var endpoint_1 = require_endpoint();
	var environment_1 = require_environment();
	var eventType_1 = require_eventType();
	var health_1 = require_health();
	var ingest_1 = require_ingest();
	var integration_1 = require_integration();
	var message_1 = require_message();
	var messageAttempt_1 = require_messageAttempt();
	var operationalWebhook_1 = require_operationalWebhook();
	var statistics_1 = require_statistics();
	var streaming_1 = require_streaming();
	var operationalWebhookEndpoint_1 = require_operationalWebhookEndpoint();
	var util_1 = require_util();
	Object.defineProperty(exports, "ApiException", {
		enumerable: true,
		get: function() {
			return util_1.ApiException;
		}
	});
	var HttpErrors_1 = require_HttpErrors();
	Object.defineProperty(exports, "HTTPValidationError", {
		enumerable: true,
		get: function() {
			return HttpErrors_1.HTTPValidationError;
		}
	});
	Object.defineProperty(exports, "HttpErrorOut", {
		enumerable: true,
		get: function() {
			return HttpErrors_1.HttpErrorOut;
		}
	});
	Object.defineProperty(exports, "ValidationError", {
		enumerable: true,
		get: function() {
			return HttpErrors_1.ValidationError;
		}
	});
	__exportStar(require_webhook(), exports);
	__exportStar(require_models(), exports);
	var message_2 = require_message();
	Object.defineProperty(exports, "messageInRaw", {
		enumerable: true,
		get: function() {
			return message_2.messageInRaw;
		}
	});
	var REGIONS = [
		{
			region: "us",
			url: "https://api.us.svix.com"
		},
		{
			region: "eu",
			url: "https://api.eu.svix.com"
		},
		{
			region: "in",
			url: "https://api.in.svix.com"
		},
		{
			region: "ca",
			url: "https://api.ca.svix.com"
		},
		{
			region: "au",
			url: "https://api.au.svix.com"
		}
	];
	var Svix = class {
		constructor(token, options = {}) {
			var _a, _b, _c;
			const regionalUrl = (_a = REGIONS.find((x) => x.region === token.split(".")[1])) === null || _a === void 0 ? void 0 : _a.url;
			const baseUrl = (_c = (_b = options.serverUrl) !== null && _b !== void 0 ? _b : regionalUrl) !== null && _c !== void 0 ? _c : "https://api.svix.com";
			if (options.retryScheduleInMs) {
				this.requestCtx = {
					baseUrl,
					token,
					timeout: options.requestTimeout,
					retryScheduleInMs: options.retryScheduleInMs,
					fetch: options.fetch
				};
				return;
			}
			if (options.numRetries) {
				this.requestCtx = {
					baseUrl,
					token,
					timeout: options.requestTimeout,
					numRetries: options.numRetries,
					fetch: options.fetch
				};
				return;
			}
			this.requestCtx = {
				baseUrl,
				token,
				timeout: options.requestTimeout,
				fetch: options.fetch
			};
		}
		get application() {
			return new application_1.Application(this.requestCtx);
		}
		get authentication() {
			return new authentication_1.Authentication(this.requestCtx);
		}
		get backgroundTask() {
			return new backgroundTask_1.BackgroundTask(this.requestCtx);
		}
		get connector() {
			return new connector_1.Connector(this.requestCtx);
		}
		get endpoint() {
			return new endpoint_1.Endpoint(this.requestCtx);
		}
		get environment() {
			return new environment_1.Environment(this.requestCtx);
		}
		get eventType() {
			return new eventType_1.EventType(this.requestCtx);
		}
		get health() {
			return new health_1.Health(this.requestCtx);
		}
		get ingest() {
			return new ingest_1.Ingest(this.requestCtx);
		}
		get integration() {
			return new integration_1.Integration(this.requestCtx);
		}
		get message() {
			return new message_1.Message(this.requestCtx);
		}
		get messageAttempt() {
			return new messageAttempt_1.MessageAttempt(this.requestCtx);
		}
		get operationalWebhook() {
			return new operationalWebhook_1.OperationalWebhook(this.requestCtx);
		}
		get statistics() {
			return new statistics_1.Statistics(this.requestCtx);
		}
		get streaming() {
			return new streaming_1.Streaming(this.requestCtx);
		}
		get operationalWebhookEndpoint() {
			return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
		}
	};
	exports.Svix = Svix;
})))();
var version = "6.12.3";
/**
* Builds a query string from pagination options
* @param options - Pagination options containing limit and either after or before (but not both)
* @returns Query string (without leading '?') or empty string if no options
*/
function buildPaginationQuery(options) {
	const searchParams = new URLSearchParams();
	if (options.limit !== void 0) searchParams.set("limit", options.limit.toString());
	if ("after" in options && options.after !== void 0) searchParams.set("after", options.after);
	if ("before" in options && options.before !== void 0) searchParams.set("before", options.before);
	return searchParams.toString();
}
var ApiKeys = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/api-keys", payload, options);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/api-keys?${queryString}` : "/api-keys";
		return await this.resend.get(url);
	}
	async remove(id) {
		return await this.resend.delete(`/api-keys/${id}`);
	}
};
var AutomationRuns = class {
	constructor(resend) {
		this.resend = resend;
	}
	async get(options) {
		return await this.resend.get(`/automations/${options.automationId}/runs/${options.runId}`);
	}
	async list(options) {
		const queryString = buildPaginationQuery(options);
		const searchParams = new URLSearchParams(queryString);
		if (options.status) {
			const statusValue = Array.isArray(options.status) ? options.status.join(",") : options.status;
			searchParams.set("status", statusValue);
		}
		const qs = searchParams.toString();
		const url = qs ? `/automations/${options.automationId}/runs?${qs}` : `/automations/${options.automationId}/runs`;
		return await this.resend.get(url);
	}
};
function parseStepConfig(step) {
	switch (step.type) {
		case "trigger": return {
			key: step.key,
			type: step.type,
			config: { event_name: step.config.eventName }
		};
		case "delay": return {
			key: step.key,
			type: step.type,
			config: step.config
		};
		case "send_email": return {
			key: step.key,
			type: step.type,
			config: {
				template: step.config.template,
				subject: step.config.subject,
				from: step.config.from,
				reply_to: step.config.replyTo
			}
		};
		case "wait_for_event": return {
			key: step.key,
			type: step.type,
			config: {
				event_name: step.config.eventName,
				timeout: step.config.timeout,
				filter_rule: step.config.filterRule
			}
		};
		case "condition": return {
			key: step.key,
			type: step.type,
			config: step.config
		};
		case "contact_update": return {
			key: step.key,
			type: step.type,
			config: {
				first_name: step.config.firstName,
				last_name: step.config.lastName,
				unsubscribed: step.config.unsubscribed,
				properties: step.config.properties
			}
		};
		case "contact_delete": return {
			key: step.key,
			type: step.type,
			config: step.config
		};
		case "add_to_segment": return {
			key: step.key,
			type: step.type,
			config: { segment_id: step.config.segmentId }
		};
	}
}
function parseConnection(connection) {
	return {
		from: connection.from,
		to: connection.to,
		type: connection.type
	};
}
function parseAutomationToApiOptions(automation) {
	return {
		name: automation.name,
		status: automation.status,
		steps: automation.steps.map(parseStepConfig),
		connections: automation.connections.map(parseConnection)
	};
}
function parseEventToApiOptions(event) {
	return {
		event: event.event,
		contact_id: event.contactId,
		email: event.email,
		payload: event.payload
	};
}
var Automations = class {
	constructor(resend) {
		this.resend = resend;
		this.runs = new AutomationRuns(this.resend);
	}
	async create(payload) {
		return await this.resend.post("/automations", parseAutomationToApiOptions(payload));
	}
	async list(options = {}) {
		const params = [buildPaginationQuery(options)];
		if (options.status) params.push(`status=${encodeURIComponent(options.status)}`);
		const qs = params.filter(Boolean).join("&");
		const url = qs ? `/automations?${qs}` : "/automations";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/automations/${id}`);
	}
	async remove(id) {
		return await this.resend.delete(`/automations/${id}`);
	}
	async update(id, payload) {
		const apiPayload = {};
		if (payload.name !== void 0) apiPayload.name = payload.name;
		if (payload.status !== void 0) apiPayload.status = payload.status;
		if (payload.steps !== void 0) apiPayload.steps = payload.steps.map(parseStepConfig);
		if (payload.connections !== void 0) apiPayload.connections = payload.connections.map(parseConnection);
		return await this.resend.patch(`/automations/${id}`, apiPayload);
	}
	async stop(id) {
		return await this.resend.post(`/automations/${id}/stop`);
	}
};
function parseAttachments(attachments) {
	return attachments?.map((attachment) => ({
		content: attachment.content,
		filename: attachment.filename,
		path: attachment.path,
		content_type: attachment.contentType,
		content_id: attachment.contentId
	}));
}
function parseEmailToApiOptions(email) {
	return {
		attachments: parseAttachments(email.attachments),
		bcc: email.bcc,
		cc: email.cc,
		from: email.from,
		headers: email.headers,
		html: email.html,
		reply_to: email.replyTo,
		scheduled_at: email.scheduledAt,
		subject: email.subject,
		tags: email.tags,
		text: email.text,
		to: email.to,
		template: email.template ? {
			id: email.template.id,
			variables: email.template.variables
		} : void 0,
		topic_id: email.topicId
	};
}
async function render(node) {
	let render;
	try {
		({render} = await import("../_chunks/render_resend.mjs"));
	} catch {
		throw new Error("Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.");
	}
	return render(node);
}
var Batch = class {
	constructor(resend) {
		this.resend = resend;
	}
	async send(payload, options) {
		return this.create(payload, options);
	}
	async create(payload, options) {
		const emails = [];
		for (const email of payload) {
			if (email.react) {
				email.html = await render(email.react);
				email.react = void 0;
			}
			emails.push(parseEmailToApiOptions(email));
		}
		return await this.resend.post("/emails/batch", emails, {
			...options,
			headers: {
				"x-batch-validation": options?.batchValidation ?? "strict",
				...options?.headers
			}
		});
	}
};
var Broadcasts = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		if (payload.react) payload.html = await render(payload.react);
		return await this.resend.post("/broadcasts", {
			name: payload.name,
			segment_id: payload.segmentId,
			audience_id: payload.audienceId,
			preview_text: payload.previewText,
			from: payload.from,
			html: payload.html,
			reply_to: payload.replyTo,
			subject: payload.subject,
			text: payload.text,
			topic_id: payload.topicId,
			send: payload.send,
			scheduled_at: payload.scheduledAt
		}, options);
	}
	async send(id, payload) {
		return await this.resend.post(`/broadcasts/${id}/send`, { scheduled_at: payload?.scheduledAt });
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/broadcasts?${queryString}` : "/broadcasts";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/broadcasts/${id}`);
	}
	async remove(id) {
		return await this.resend.delete(`/broadcasts/${id}`);
	}
	async update(id, payload) {
		if (payload.react) payload.html = await render(payload.react);
		return await this.resend.patch(`/broadcasts/${id}`, {
			name: payload.name,
			segment_id: payload.segmentId,
			audience_id: payload.audienceId,
			from: payload.from,
			html: payload.html,
			text: payload.text,
			subject: payload.subject,
			reply_to: payload.replyTo,
			preview_text: payload.previewText,
			topic_id: payload.topicId
		});
	}
};
function parseContactPropertyFromApi(contactProperty) {
	return {
		id: contactProperty.id,
		key: contactProperty.key,
		createdAt: contactProperty.created_at,
		type: contactProperty.type,
		fallbackValue: contactProperty.fallback_value
	};
}
function parseContactPropertyToApiOptions(contactProperty) {
	if ("key" in contactProperty) return {
		key: contactProperty.key,
		type: contactProperty.type,
		fallback_value: contactProperty.fallbackValue
	};
	return { fallback_value: contactProperty.fallbackValue };
}
var ContactProperties = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(options) {
		const apiOptions = parseContactPropertyToApiOptions(options);
		return await this.resend.post("/contact-properties", apiOptions);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/contact-properties?${queryString}` : "/contact-properties";
		const response = await this.resend.get(url);
		if (response.data) return {
			data: {
				...response.data,
				data: response.data.data.map((apiContactProperty) => parseContactPropertyFromApi(apiContactProperty))
			},
			headers: response.headers,
			error: null
		};
		return response;
	}
	async get(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const response = await this.resend.get(`/contact-properties/${id}`);
		if (response.data) return {
			data: {
				object: "contact_property",
				...parseContactPropertyFromApi(response.data)
			},
			headers: response.headers,
			error: null
		};
		return response;
	}
	async update(payload) {
		if (!payload.id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const apiOptions = parseContactPropertyToApiOptions(payload);
		return await this.resend.patch(`/contact-properties/${payload.id}`, apiOptions);
	}
	async remove(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.delete(`/contact-properties/${id}`);
	}
};
var ContactSegments = class {
	constructor(resend) {
		this.resend = resend;
	}
	async list(options) {
		if (!options.contactId && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.contactId;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/contacts/${identifier}/segments?${queryString}` : `/contacts/${identifier}/segments`;
		return await this.resend.get(url);
	}
	async add(options) {
		if (!options.contactId && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.contactId;
		return this.resend.post(`/contacts/${identifier}/segments/${options.segmentId}`);
	}
	async remove(options) {
		if (!options.contactId && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.contactId;
		return this.resend.delete(`/contacts/${identifier}/segments/${options.segmentId}`);
	}
};
var ContactTopics = class {
	constructor(resend) {
		this.resend = resend;
	}
	async update(payload) {
		if (!payload.id && !payload.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = payload.email ? payload.email : payload.id;
		return this.resend.patch(`/contacts/${identifier}/topics`, payload.topics);
	}
	async list(options) {
		if (!options.id && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		const identifier = options.email ? options.email : options.id;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/contacts/${identifier}/topics?${queryString}` : `/contacts/${identifier}/topics`;
		return this.resend.get(url);
	}
};
var Contacts = class {
	constructor(resend) {
		this.resend = resend;
		this.topics = new ContactTopics(this.resend);
		this.segments = new ContactSegments(this.resend);
	}
	async create(payload, options = {}) {
		if ("audienceId" in payload) {
			if ("segments" in payload || "topics" in payload) return {
				data: null,
				headers: null,
				error: {
					message: "`audienceId` is deprecated, and cannot be used together with `segments` or `topics`. Use `segments` instead to add one or more segments to the new contact.",
					statusCode: null,
					name: "invalid_parameter"
				}
			};
			return await this.resend.post(`/audiences/${payload.audienceId}/contacts`, {
				unsubscribed: payload.unsubscribed,
				email: payload.email,
				first_name: payload.firstName,
				last_name: payload.lastName,
				properties: payload.properties
			}, options);
		}
		return await this.resend.post("/contacts", {
			unsubscribed: payload.unsubscribed,
			email: payload.email,
			first_name: payload.firstName,
			last_name: payload.lastName,
			properties: payload.properties,
			segments: payload.segments,
			topics: payload.topics
		}, options);
	}
	async list(options = {}) {
		const segmentId = options.segmentId ?? options.audienceId;
		if (!segmentId) {
			const queryString = buildPaginationQuery(options);
			const url = queryString ? `/contacts?${queryString}` : "/contacts";
			return await this.resend.get(url);
		}
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/segments/${segmentId}/contacts?${queryString}` : `/segments/${segmentId}/contacts`;
		return await this.resend.get(url);
	}
	async get(options) {
		if (typeof options === "string") return this.resend.get(`/contacts/${options}`);
		if (!options.id && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		if (!options.audienceId) return this.resend.get(`/contacts/${options?.email ? options?.email : options?.id}`);
		return this.resend.get(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`);
	}
	async update(options) {
		if (!options.id && !options.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		if (!options.audienceId) return await this.resend.patch(`/contacts/${options?.email ? options?.email : options?.id}`, {
			unsubscribed: options.unsubscribed,
			first_name: options.firstName,
			last_name: options.lastName,
			properties: options.properties
		});
		return await this.resend.patch(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`, {
			unsubscribed: options.unsubscribed,
			first_name: options.firstName,
			last_name: options.lastName,
			properties: options.properties
		});
	}
	async remove(payload) {
		if (typeof payload === "string") return this.resend.delete(`/contacts/${payload}`);
		if (!payload.id && !payload.email) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` or `email` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		if (!payload.audienceId) return this.resend.delete(`/contacts/${payload?.email ? payload?.email : payload?.id}`);
		return this.resend.delete(`/audiences/${payload.audienceId}/contacts/${payload?.email ? payload?.email : payload?.id}`);
	}
};
function parseDomainToApiOptions(domain) {
	return {
		name: domain.name,
		region: domain.region,
		custom_return_path: domain.customReturnPath,
		capabilities: domain.capabilities,
		open_tracking: domain.openTracking,
		click_tracking: domain.clickTracking,
		tls: domain.tls,
		tracking_subdomain: domain.trackingSubdomain
	};
}
var Domains = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/domains", parseDomainToApiOptions(payload), options);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/domains?${queryString}` : "/domains";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/domains/${id}`);
	}
	async update(payload) {
		return await this.resend.patch(`/domains/${payload.id}`, {
			click_tracking: payload.clickTracking,
			open_tracking: payload.openTracking,
			tls: payload.tls,
			capabilities: payload.capabilities,
			tracking_subdomain: payload.trackingSubdomain
		});
	}
	async remove(id) {
		return await this.resend.delete(`/domains/${id}`);
	}
	async verify(id) {
		return await this.resend.post(`/domains/${id}/verify`);
	}
};
var Attachments$1 = class {
	constructor(resend) {
		this.resend = resend;
	}
	async get(options) {
		const { emailId, id } = options;
		return await this.resend.get(`/emails/${emailId}/attachments/${id}`);
	}
	async list(options) {
		const { emailId } = options;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails/${emailId}/attachments?${queryString}` : `/emails/${emailId}/attachments`;
		return await this.resend.get(url);
	}
};
var Attachments = class {
	constructor(resend) {
		this.resend = resend;
	}
	async get(options) {
		const { emailId, id } = options;
		return await this.resend.get(`/emails/receiving/${emailId}/attachments/${id}`);
	}
	async list(options) {
		const { emailId } = options;
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails/receiving/${emailId}/attachments?${queryString}` : `/emails/receiving/${emailId}/attachments`;
		return await this.resend.get(url);
	}
};
var Receiving = class {
	constructor(resend) {
		this.resend = resend;
		this.attachments = new Attachments(resend);
	}
	async get(id) {
		return await this.resend.get(`/emails/receiving/${id}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails/receiving?${queryString}` : "/emails/receiving";
		return await this.resend.get(url);
	}
	async forward(options) {
		const { emailId, to, from } = options;
		const passthrough = options.passthrough !== false;
		const emailResponse = await this.get(emailId);
		if (emailResponse.error) return {
			data: null,
			error: emailResponse.error,
			headers: emailResponse.headers
		};
		const email = emailResponse.data;
		const originalSubject = email.subject || "(no subject)";
		if (passthrough) return this.forwardPassthrough(email, {
			to,
			from,
			subject: originalSubject
		});
		const forwardSubject = originalSubject.startsWith("Fwd:") ? originalSubject : `Fwd: ${originalSubject}`;
		return this.forwardWrapped(email, {
			to,
			from,
			subject: forwardSubject,
			text: "text" in options ? options.text : void 0,
			html: "html" in options ? options.html : void 0
		});
	}
	async forwardPassthrough(email, options) {
		const { to, from, subject } = options;
		if (!email.raw?.download_url) return {
			data: null,
			error: {
				name: "validation_error",
				message: "Raw email content is not available for this email",
				statusCode: 400
			},
			headers: null
		};
		const rawResponse = await fetch(email.raw.download_url);
		if (!rawResponse.ok) return {
			data: null,
			error: {
				name: "application_error",
				message: "Failed to download raw email content",
				statusCode: rawResponse.status
			},
			headers: null
		};
		const rawEmailContent = await rawResponse.text();
		const parsed = await PostalMime.parse(rawEmailContent, { attachmentEncoding: "base64" });
		const attachments = parsed.attachments.map((attachment) => {
			const contentId = attachment.contentId ? attachment.contentId.replace(/^<|>$/g, "") : void 0;
			return {
				filename: attachment.filename,
				content: attachment.content.toString(),
				content_type: attachment.mimeType,
				content_id: contentId || void 0
			};
		});
		return await this.resend.post("/emails", {
			from,
			to,
			subject,
			text: parsed.text || void 0,
			html: parsed.html || void 0,
			attachments: attachments.length > 0 ? attachments : void 0
		});
	}
	async forwardWrapped(email, options) {
		const { to, from, subject, text, html } = options;
		if (!email.raw?.download_url) return {
			data: null,
			error: {
				name: "validation_error",
				message: "Raw email content is not available for this email",
				statusCode: 400
			},
			headers: null
		};
		const rawResponse = await fetch(email.raw.download_url);
		if (!rawResponse.ok) return {
			data: null,
			error: {
				name: "application_error",
				message: "Failed to download raw email content",
				statusCode: rawResponse.status
			},
			headers: null
		};
		const rawEmailContent = await rawResponse.text();
		return await this.resend.post("/emails", {
			from,
			to,
			subject,
			text,
			html,
			attachments: [{
				filename: "forwarded_message.eml",
				content: Buffer.from(rawEmailContent).toString("base64"),
				content_type: "message/rfc822"
			}]
		});
	}
};
var Emails = class {
	constructor(resend) {
		this.resend = resend;
		this.attachments = new Attachments$1(resend);
		this.receiving = new Receiving(resend);
	}
	async send(payload, options = {}) {
		return this.create(payload, options);
	}
	async create(payload, options = {}) {
		if (payload.react) payload.html = await render(payload.react);
		return await this.resend.post("/emails", parseEmailToApiOptions(payload), options);
	}
	async get(id) {
		return await this.resend.get(`/emails/${id}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/emails?${queryString}` : "/emails";
		return await this.resend.get(url);
	}
	async update(payload) {
		return await this.resend.patch(`/emails/${payload.id}`, { scheduled_at: payload.scheduledAt });
	}
	async cancel(id) {
		return await this.resend.post(`/emails/${id}/cancel`);
	}
};
var Events = class {
	constructor(resend) {
		this.resend = resend;
	}
	async send(payload) {
		return await this.resend.post("/events/send", parseEventToApiOptions(payload));
	}
	async create(payload) {
		return await this.resend.post("/events", payload);
	}
	async get(identifier) {
		return await this.resend.get(`/events/${encodeURIComponent(identifier)}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/events?${queryString}` : "/events";
		return await this.resend.get(url);
	}
	async update(identifier, payload) {
		return await this.resend.patch(`/events/${encodeURIComponent(identifier)}`, payload);
	}
	async remove(identifier) {
		return await this.resend.delete(`/events/${encodeURIComponent(identifier)}`);
	}
};
var Logs = class {
	constructor(resend) {
		this.resend = resend;
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/logs?${queryString}` : "/logs";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/logs/${id}`);
	}
};
var Segments = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/segments", payload, options);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/segments?${queryString}` : "/segments";
		return await this.resend.get(url);
	}
	async get(id) {
		return await this.resend.get(`/segments/${id}`);
	}
	async remove(id) {
		return await this.resend.delete(`/segments/${id}`);
	}
};
function getPaginationQueryProperties(options = {}) {
	const query = new URLSearchParams();
	if (options.before) query.set("before", options.before);
	if (options.after) query.set("after", options.after);
	if (options.limit) query.set("limit", options.limit.toString());
	return query.size > 0 ? `?${query.toString()}` : "";
}
function parseVariables(variables) {
	return variables?.map((variable) => ({
		key: variable.key,
		type: variable.type,
		fallback_value: variable.fallbackValue
	}));
}
function parseTemplateToApiOptions(template) {
	return {
		name: "name" in template ? template.name : void 0,
		subject: template.subject,
		html: template.html,
		text: template.text,
		alias: template.alias,
		from: template.from,
		reply_to: template.replyTo,
		variables: parseVariables(template.variables)
	};
}
var ChainableTemplateResult = class {
	constructor(promise, publishFn) {
		this.promise = promise;
		this.publishFn = publishFn;
	}
	then(onfulfilled, onrejected) {
		return this.promise.then(onfulfilled, onrejected);
	}
	async publish() {
		const { data, error } = await this.promise;
		if (error) return {
			data: null,
			headers: null,
			error
		};
		return this.publishFn(data.id);
	}
};
var Templates = class {
	constructor(resend) {
		this.resend = resend;
	}
	create(payload) {
		return new ChainableTemplateResult(this.performCreate(payload), this.publish.bind(this));
	}
	async performCreate(payload) {
		if (payload.react) {
			if (!this.renderAsync) try {
				const { renderAsync } = await import("../_chunks/render_resend.mjs");
				this.renderAsync = renderAsync;
			} catch {
				throw new Error("Failed to render React component. Make sure to install `@react-email/render`");
			}
			payload.html = await this.renderAsync(payload.react);
		}
		return this.resend.post("/templates", parseTemplateToApiOptions(payload));
	}
	async remove(identifier) {
		return await this.resend.delete(`/templates/${identifier}`);
	}
	async get(identifier) {
		return await this.resend.get(`/templates/${identifier}`);
	}
	async list(options = {}) {
		return this.resend.get(`/templates${getPaginationQueryProperties(options)}`);
	}
	duplicate(identifier) {
		return new ChainableTemplateResult(this.resend.post(`/templates/${identifier}/duplicate`), this.publish.bind(this));
	}
	async publish(identifier) {
		return await this.resend.post(`/templates/${identifier}/publish`);
	}
	async update(identifier, payload) {
		return await this.resend.patch(`/templates/${identifier}`, parseTemplateToApiOptions(payload));
	}
};
var Topics = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload) {
		const { defaultSubscription, ...body } = payload;
		return await this.resend.post("/topics", {
			...body,
			default_subscription: defaultSubscription
		});
	}
	async list() {
		return await this.resend.get("/topics");
	}
	async get(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.get(`/topics/${id}`);
	}
	async update(payload) {
		if (!payload.id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.patch(`/topics/${payload.id}`, payload);
	}
	async remove(id) {
		if (!id) return {
			data: null,
			headers: null,
			error: {
				message: "Missing `id` field.",
				statusCode: null,
				name: "missing_required_field"
			}
		};
		return await this.resend.delete(`/topics/${id}`);
	}
};
var Webhooks = class {
	constructor(resend) {
		this.resend = resend;
	}
	async create(payload, options = {}) {
		return await this.resend.post("/webhooks", payload, options);
	}
	async get(id) {
		return await this.resend.get(`/webhooks/${id}`);
	}
	async list(options = {}) {
		const queryString = buildPaginationQuery(options);
		const url = queryString ? `/webhooks?${queryString}` : "/webhooks";
		return await this.resend.get(url);
	}
	async update(id, payload) {
		return await this.resend.patch(`/webhooks/${id}`, payload);
	}
	async remove(id) {
		return await this.resend.delete(`/webhooks/${id}`);
	}
	verify(payload) {
		return new import_dist.Webhook(payload.webhookSecret).verify(payload.payload, {
			"svix-id": payload.headers.id,
			"svix-timestamp": payload.headers.timestamp,
			"svix-signature": payload.headers.signature
		});
	}
};
var defaultBaseUrl = "https://api.resend.com";
var defaultUserAgent = `resend-node:${version}`;
var baseUrl = typeof process !== "undefined" && process.env ? process.env.RESEND_BASE_URL || defaultBaseUrl : defaultBaseUrl;
var userAgent = typeof process !== "undefined" && process.env ? process.env.RESEND_USER_AGENT || defaultUserAgent : defaultUserAgent;
var Resend = class {
	constructor(key) {
		this.key = key;
		this.segments = new Segments(this);
		this.apiKeys = new ApiKeys(this);
		this.audiences = this.segments;
		this.automations = new Automations(this);
		this.batch = new Batch(this);
		this.broadcasts = new Broadcasts(this);
		this.contactProperties = new ContactProperties(this);
		this.contacts = new Contacts(this);
		this.domains = new Domains(this);
		this.emails = new Emails(this);
		this.events = new Events(this);
		this.logs = new Logs(this);
		this.templates = new Templates(this);
		this.topics = new Topics(this);
		this.webhooks = new Webhooks(this);
		if (!key) {
			if (typeof process !== "undefined" && process.env) this.key = process.env.RESEND_API_KEY;
			if (!this.key) throw new Error("Missing API key. Pass it to the constructor `new Resend(\"re_123\")`");
		}
		this.headers = new Headers({
			Authorization: `Bearer ${this.key}`,
			"User-Agent": userAgent,
			"Content-Type": "application/json"
		});
	}
	async fetchRequest(path, options = {}) {
		try {
			const response = await fetch(`${baseUrl}${path}`, options);
			if (!response.ok) try {
				const rawError = await response.text();
				return {
					data: null,
					error: JSON.parse(rawError),
					headers: Object.fromEntries(response.headers.entries())
				};
			} catch (err) {
				if (err instanceof SyntaxError) return {
					data: null,
					error: {
						name: "application_error",
						statusCode: response.status,
						message: "Internal server error. We are unable to process your request right now, please try again later."
					},
					headers: Object.fromEntries(response.headers.entries())
				};
				const error = {
					message: response.statusText,
					statusCode: response.status,
					name: "application_error"
				};
				if (err instanceof Error) return {
					data: null,
					error: {
						...error,
						message: err.message
					},
					headers: Object.fromEntries(response.headers.entries())
				};
				return {
					data: null,
					error,
					headers: Object.fromEntries(response.headers.entries())
				};
			}
			return {
				data: await response.json(),
				error: null,
				headers: Object.fromEntries(response.headers.entries())
			};
		} catch {
			return {
				data: null,
				error: {
					name: "application_error",
					statusCode: null,
					message: "Unable to fetch data. The request could not be resolved."
				},
				headers: null
			};
		}
	}
	async post(path, entity, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		if (options.idempotencyKey) headers.set("Idempotency-Key", options.idempotencyKey);
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(entity),
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async get(path, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		const requestOptions = {
			method: "GET",
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async put(path, entity, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		const requestOptions = {
			method: "PUT",
			body: JSON.stringify(entity),
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async patch(path, entity, options = {}) {
		const headers = new Headers(this.headers);
		if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
		const requestOptions = {
			method: "PATCH",
			body: JSON.stringify(entity),
			...options,
			headers
		};
		return this.fetchRequest(path, requestOptions);
	}
	async delete(path, query) {
		const requestOptions = {
			method: "DELETE",
			body: JSON.stringify(query),
			headers: this.headers
		};
		return this.fetchRequest(path, requestOptions);
	}
};
//#endregion
export { Resend as t };
