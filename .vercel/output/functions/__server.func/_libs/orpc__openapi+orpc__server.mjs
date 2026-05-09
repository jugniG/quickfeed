import { h as findRoute, m as createRouter, p as addRoute } from "./@better-auth/core+[...].mjs";
import { _ as unlazy, c as StandardOpenAPISerializer, d as createContractedProcedure, f as createProcedureClient, g as traverseContractProcedures, h as isProcedure, l as standardizeHTTPPath, m as getRouter, p as getLazyMeta, r as OpenAPIGenerator, s as StandardOpenAPIJsonSerializer, u as StandardBracketNotationSerializer } from "./@orpc/json-schema+[...].mjs";
import { A as runWithSpan, C as isAsyncIteratorObject, E as once, F as value, M as stringifyJSON, N as toArray, O as parseEmptyableJSON, P as tryDecodeURIComponent, S as intercept, _ as NullProtoObj, a as toStandardLazyRequest, g as toORPCError, h as isORPCErrorStatus, i as toFetchResponse, j as setSpanError, k as resolveMaybeOptionalOptions, l as flattenHeader, n as StandardRPCSerializer, r as toHttpPath, t as StandardRPCJsonSerializer, u as ORPCError, v as ORPC_NAME, w as isObject, y as asyncIteratorWithSpan } from "./@orpc/client+[...].mjs";
import { n as fallbackContractConfig } from "./orpc__contract.mjs";
//#region node_modules/@orpc/server/dist/shared/server.DZ5BIITo.mjs
function resolveFriendlyStandardHandleOptions(options) {
	return {
		...options,
		context: options.context ?? {}
	};
}
//#endregion
//#region node_modules/@orpc/server/dist/shared/server.Dz5G6M6M.mjs
var CompositeStandardHandlerPlugin = class {
	plugins;
	constructor(plugins = []) {
		this.plugins = [...plugins].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	}
	init(options, router) {
		for (const plugin of this.plugins) plugin.init?.(options, router);
	}
};
var StandardHandler = class {
	constructor(router, matcher, codec, options) {
		this.matcher = matcher;
		this.codec = codec;
		new CompositeStandardHandlerPlugin(options.plugins).init(options, router);
		this.interceptors = toArray(options.interceptors);
		this.clientInterceptors = toArray(options.clientInterceptors);
		this.rootInterceptors = toArray(options.rootInterceptors);
		this.matcher.init(router);
	}
	interceptors;
	clientInterceptors;
	rootInterceptors;
	async handle(request, options) {
		const prefix = options.prefix?.replace(/\/$/, "") || void 0;
		if (prefix && !request.url.pathname.startsWith(`${prefix}/`) && request.url.pathname !== prefix) return {
			matched: false,
			response: void 0
		};
		return intercept(this.rootInterceptors, {
			...options,
			request,
			prefix
		}, async (interceptorOptions) => {
			return runWithSpan({ name: `${request.method} ${request.url.pathname}` }, async (span) => {
				let step;
				try {
					return await intercept(this.interceptors, interceptorOptions, async ({ request: request2, context, prefix: prefix2 }) => {
						const method = request2.method;
						const url = request2.url;
						const pathname = prefix2 ? url.pathname.replace(prefix2, "") : url.pathname;
						const match = await runWithSpan({ name: "find_procedure" }, () => this.matcher.match(method, `/${pathname.replace(/^\/|\/$/g, "")}`));
						if (!match) return {
							matched: false,
							response: void 0
						};
						span?.updateName(`${ORPC_NAME}.${match.path.join("/")}`);
						span?.setAttribute("rpc.system", ORPC_NAME);
						span?.setAttribute("rpc.method", match.path.join("."));
						step = "decode_input";
						let input = await runWithSpan({ name: "decode_input" }, () => this.codec.decode(request2, match.params, match.procedure));
						step = void 0;
						if (isAsyncIteratorObject(input)) input = asyncIteratorWithSpan({
							name: "consume_event_iterator_input",
							signal: request2.signal
						}, input);
						const client = createProcedureClient(match.procedure, {
							context,
							path: match.path,
							interceptors: this.clientInterceptors
						});
						step = "call_procedure";
						const output = await client(input, {
							signal: request2.signal,
							lastEventId: flattenHeader(request2.headers["last-event-id"])
						});
						step = void 0;
						return {
							matched: true,
							response: this.codec.encode(output, match.procedure)
						};
					});
				} catch (e) {
					if (step !== "call_procedure") setSpanError(span, e);
					const error = step === "decode_input" && !(e instanceof ORPCError) ? new ORPCError("BAD_REQUEST", {
						message: `Malformed request. Ensure the request body is properly formatted and the 'Content-Type' header is set correctly.`,
						cause: e
					}) : toORPCError(e);
					return {
						matched: true,
						response: this.codec.encodeError(error)
					};
				}
			});
		});
	}
};
var StandardRPCCodec = class {
	constructor(serializer) {
		this.serializer = serializer;
	}
	async decode(request, _params, _procedure) {
		const serialized = request.method === "GET" ? parseEmptyableJSON(request.url.searchParams.getAll("data").at(-1)) : await request.body();
		return this.serializer.deserialize(serialized);
	}
	encode(output, _procedure) {
		if (output instanceof ReadableStream) return {
			status: 200,
			headers: {},
			body: output
		};
		return {
			status: 200,
			headers: {},
			body: this.serializer.serialize(output)
		};
	}
	encodeError(error) {
		return {
			status: error.status,
			headers: {},
			body: this.serializer.serialize(error.toJSON())
		};
	}
};
var StandardRPCMatcher = class {
	filter;
	tree = new NullProtoObj();
	pendingRouters = [];
	constructor(options = {}) {
		this.filter = options.filter ?? true;
	}
	init(router, path = []) {
		const laziedOptions = traverseContractProcedures({
			router,
			path
		}, (traverseOptions) => {
			if (!value(this.filter, traverseOptions)) return;
			const { path: path2, contract } = traverseOptions;
			const httpPath = toHttpPath(path2);
			if (isProcedure(contract)) this.tree[httpPath] = {
				path: path2,
				contract,
				procedure: contract,
				router
			};
			else this.tree[httpPath] = {
				path: path2,
				contract,
				procedure: void 0,
				router
			};
		});
		this.pendingRouters.push(...laziedOptions.map((option) => ({
			...option,
			httpPathPrefix: toHttpPath(option.path)
		})));
	}
	async match(_method, pathname) {
		if (this.pendingRouters.length) {
			const newPendingRouters = [];
			for (const pendingRouter of this.pendingRouters) if (pathname.startsWith(pendingRouter.httpPathPrefix)) {
				const { default: router } = await unlazy(pendingRouter.router);
				this.init(router, pendingRouter.path);
			} else newPendingRouters.push(pendingRouter);
			this.pendingRouters = newPendingRouters;
		}
		const match = this.tree[pathname];
		if (!match) return;
		if (!match.procedure) {
			const { default: maybeProcedure } = await unlazy(getRouter(match.router, match.path));
			if (!isProcedure(maybeProcedure)) throw new Error(`
          [Contract-First] Missing or invalid implementation for procedure at path: ${toHttpPath(match.path)}.
          Ensure that the procedure is correctly defined and matches the expected contract.
        `);
			match.procedure = createContractedProcedure(maybeProcedure, match.contract);
		}
		return {
			path: match.path,
			procedure: match.procedure
		};
	}
};
var StandardRPCHandler = class extends StandardHandler {
	constructor(router, options = {}) {
		const serializer = new StandardRPCSerializer(new StandardRPCJsonSerializer(options));
		const matcher = new StandardRPCMatcher(options);
		const codec = new StandardRPCCodec(serializer);
		super(router, matcher, codec, options);
	}
};
//#endregion
//#region node_modules/@orpc/server/dist/shared/server.TEVCLCFC.mjs
var STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL = Symbol("STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT");
var StrictGetMethodPlugin = class {
	error;
	/**
	* make sure execute before batch plugin to get real method
	*/
	order = 7e6;
	constructor(options = {}) {
		this.error = options.error ?? new ORPCError("METHOD_NOT_SUPPORTED");
	}
	init(options) {
		options.rootInterceptors ??= [];
		options.clientInterceptors ??= [];
		options.rootInterceptors.unshift((options2) => {
			const isGetMethod = options2.request.method === "GET";
			return options2.next({
				...options2,
				context: {
					...options2.context,
					[STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL]: isGetMethod
				}
			});
		});
		options.clientInterceptors.unshift((options2) => {
			if (typeof options2.context[STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL] !== "boolean") throw new TypeError("[StrictGetMethodPlugin] strict GET method context has been corrupted or modified by another plugin or interceptor");
			const procedureMethod = fallbackContractConfig("defaultMethod", options2.procedure["~orpc"].route.method);
			if (options2.context[STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL] && procedureMethod !== "GET") throw this.error;
			return options2.next();
		});
	}
};
//#endregion
//#region node_modules/@orpc/server/dist/adapters/fetch/index.mjs
var CompositeFetchHandlerPlugin = class extends CompositeStandardHandlerPlugin {
	initRuntimeAdapter(options) {
		for (const plugin of this.plugins) plugin.initRuntimeAdapter?.(options);
	}
};
var FetchHandler = class {
	constructor(standardHandler, options = {}) {
		this.standardHandler = standardHandler;
		new CompositeFetchHandlerPlugin(options.plugins).initRuntimeAdapter(options);
		this.adapterInterceptors = toArray(options.adapterInterceptors);
		this.toFetchResponseOptions = options;
	}
	toFetchResponseOptions;
	adapterInterceptors;
	async handle(request, ...rest) {
		return intercept(this.adapterInterceptors, {
			...resolveFriendlyStandardHandleOptions(resolveMaybeOptionalOptions(rest)),
			request,
			toFetchResponseOptions: this.toFetchResponseOptions
		}, async ({ request: request2, toFetchResponseOptions, ...options }) => {
			const standardRequest = toStandardLazyRequest(request2);
			const result = await this.standardHandler.handle(standardRequest, options);
			if (!result.matched) return result;
			return {
				matched: true,
				response: toFetchResponse(result.response, toFetchResponseOptions)
			};
		});
	}
};
var RPCHandler = class extends FetchHandler {
	constructor(router, options = {}) {
		if (options.strictGetMethodPluginEnabled ?? true) {
			options.plugins ??= [];
			options.plugins.push(new StrictGetMethodPlugin());
		}
		super(new StandardRPCHandler(router, options), options);
	}
};
//#endregion
//#region node_modules/@orpc/openapi/dist/shared/openapi.BB-W-NKv.mjs
var StandardOpenAPICodec = class {
	constructor(serializer, options = {}) {
		this.serializer = serializer;
		this.customErrorResponseBodyEncoder = options.customErrorResponseBodyEncoder;
	}
	customErrorResponseBodyEncoder;
	async decode(request, params, procedure) {
		if (fallbackContractConfig("defaultInputStructure", procedure["~orpc"].route.inputStructure) === "compact") {
			const data = request.method === "GET" ? this.serializer.deserialize(request.url.searchParams) : this.serializer.deserialize(await request.body());
			if (data === void 0) return params;
			if (isObject(data)) return {
				...params,
				...data
			};
			return data;
		}
		const deserializeSearchParams = () => {
			return this.serializer.deserialize(request.url.searchParams);
		};
		return {
			params,
			get query() {
				const value = deserializeSearchParams();
				Object.defineProperty(this, "query", {
					value,
					writable: true
				});
				return value;
			},
			set query(value) {
				Object.defineProperty(this, "query", {
					value,
					writable: true
				});
			},
			headers: request.headers,
			body: this.serializer.deserialize(await request.body())
		};
	}
	encode(output, procedure) {
		const successStatus = fallbackContractConfig("defaultSuccessStatus", procedure["~orpc"].route.successStatus);
		if (fallbackContractConfig("defaultOutputStructure", procedure["~orpc"].route.outputStructure) === "compact") {
			if (output instanceof ReadableStream) return {
				status: successStatus,
				headers: {},
				body: output
			};
			return {
				status: successStatus,
				headers: {},
				body: this.serializer.serialize(output)
			};
		}
		if (!this.#isDetailedOutput(output)) throw new Error(`
        Invalid "detailed" output structure:
        \u2022 Expected an object with optional properties:
          - status (number 200-399)
          - headers (Record<string, string | string[]>)
          - body (any)
        \u2022 No extra keys allowed.

        Actual value:
          ${stringifyJSON(output)}
      `);
		if (output.body instanceof ReadableStream) return {
			status: output.status ?? successStatus,
			headers: output.headers ?? {},
			body: output.body
		};
		return {
			status: output.status ?? successStatus,
			headers: output.headers ?? {},
			body: this.serializer.serialize(output.body)
		};
	}
	encodeError(error) {
		const body = this.customErrorResponseBodyEncoder?.(error) ?? error.toJSON();
		return {
			status: error.status,
			headers: {},
			body: this.serializer.serialize(body, { outputFormat: "plain" })
		};
	}
	#isDetailedOutput(output) {
		if (!isObject(output)) return false;
		if (output.headers && !isObject(output.headers)) return false;
		if (output.status !== void 0 && (typeof output.status !== "number" || !Number.isInteger(output.status) || isORPCErrorStatus(output.status))) return false;
		return true;
	}
};
function toRou3Pattern(path) {
	return standardizeHTTPPath(path).replace(/\/\{\+([^}]+)\}/g, "/**:$1").replace(/\/\{([^}]+)\}/g, "/:$1");
}
function decodeParams(params) {
	return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, tryDecodeURIComponent(value)]));
}
var StandardOpenAPIMatcher = class {
	filter;
	tree = createRouter();
	pendingRouters = [];
	constructor(options = {}) {
		this.filter = options.filter ?? true;
	}
	init(router, path = []) {
		const laziedOptions = traverseContractProcedures({
			router,
			path
		}, (traverseOptions) => {
			if (!value(this.filter, traverseOptions)) return;
			const { path: path2, contract } = traverseOptions;
			const method = fallbackContractConfig("defaultMethod", contract["~orpc"].route.method);
			const httpPath = toRou3Pattern(contract["~orpc"].route.path ?? toHttpPath(path2));
			if (isProcedure(contract)) addRoute(this.tree, method, httpPath, {
				path: path2,
				contract,
				procedure: contract,
				router
			});
			else addRoute(this.tree, method, httpPath, {
				path: path2,
				contract,
				procedure: void 0,
				router
			});
		});
		this.pendingRouters.push(...laziedOptions.map((option) => ({
			...option,
			httpPathPrefix: toHttpPath(option.path),
			laziedPrefix: getLazyMeta(option.router).prefix
		})));
	}
	async match(method, pathname) {
		if (this.pendingRouters.length) {
			const newPendingRouters = [];
			for (const pendingRouter of this.pendingRouters) if (!pendingRouter.laziedPrefix || pathname.startsWith(pendingRouter.laziedPrefix) || pathname.startsWith(pendingRouter.httpPathPrefix)) {
				const { default: router } = await unlazy(pendingRouter.router);
				this.init(router, pendingRouter.path);
			} else newPendingRouters.push(pendingRouter);
			this.pendingRouters = newPendingRouters;
		}
		const match = findRoute(this.tree, method, pathname);
		if (!match) return;
		if (!match.data.procedure) {
			const { default: maybeProcedure } = await unlazy(getRouter(match.data.router, match.data.path));
			if (!isProcedure(maybeProcedure)) throw new Error(`
          [Contract-First] Missing or invalid implementation for procedure at path: ${toHttpPath(match.data.path)}.
          Ensure that the procedure is correctly defined and matches the expected contract.
        `);
			match.data.procedure = createContractedProcedure(maybeProcedure, match.data.contract);
		}
		return {
			path: match.data.path,
			procedure: match.data.procedure,
			params: match.params ? decodeParams(match.params) : void 0
		};
	}
};
var StandardOpenAPIHandler = class extends StandardHandler {
	constructor(router, options) {
		const serializer = new StandardOpenAPISerializer(new StandardOpenAPIJsonSerializer(options), new StandardBracketNotationSerializer(options));
		const matcher = new StandardOpenAPIMatcher(options);
		const codec = new StandardOpenAPICodec(serializer, options);
		super(router, matcher, codec, options);
	}
};
//#endregion
//#region node_modules/@orpc/openapi/dist/adapters/fetch/index.mjs
var OpenAPIHandler = class extends FetchHandler {
	constructor(router, options = {}) {
		super(new StandardOpenAPIHandler(router, options), options);
	}
};
//#endregion
//#region node_modules/@orpc/openapi/dist/plugins/index.mjs
var OpenAPIReferencePlugin = class {
	generator;
	specGenerateOptions;
	specPath;
	docsPath;
	docsTitle;
	docsHead;
	docsProvider;
	docsScriptUrl;
	docsCssUrl;
	docsConfig;
	renderDocsHtml;
	constructor(options = {}) {
		this.specGenerateOptions = options.specGenerateOptions;
		this.docsPath = options.docsPath ?? "/";
		this.docsTitle = options.docsTitle ?? "API Reference";
		this.docsConfig = options.docsConfig ?? void 0;
		this.docsProvider = options.docsProvider ?? "scalar";
		this.docsScriptUrl = options.docsScriptUrl ?? (this.docsProvider === "swagger" ? "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js" : "https://cdn.jsdelivr.net/npm/@scalar/api-reference");
		this.docsCssUrl = options.docsCssUrl ?? (this.docsProvider === "swagger" ? "https://unpkg.com/swagger-ui-dist/swagger-ui.css" : void 0);
		this.docsHead = options.docsHead ?? "";
		this.specPath = options.specPath ?? "/spec.json";
		this.generator = new OpenAPIGenerator(options);
		const escapeHtmlEntities = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		const escapeJsonForHtml = (obj) => stringifyJSON(obj).replace(/&/g, "\\u0026").replace(/'/g, "\\u0027").replace(/</g, "\\u003C").replace(/>/g, "\\u003E").replace(/\//g, "\\u002F");
		this.renderDocsHtml = options.renderDocsHtml ?? ((specUrl, title, head, scriptUrl, config, spec, docsProvider, cssUrl) => {
			let body;
			if (docsProvider === "swagger") {
				const swaggerConfig = {
					dom_id: "#app",
					spec,
					deepLinking: true,
					presets: ["SwaggerUIBundle.presets.apis", "SwaggerUIBundle.presets.standalone"],
					plugins: ["SwaggerUIBundle.plugins.DownloadUrl"],
					...config
				};
				body = `
        <body>
          <div id="app"></div>

          <script src="${escapeHtmlEntities(scriptUrl)}"><\/script>

          <!-- IMPORTANT: assign to a variable first to prevent ), ( in values breaking the call expression. -->
          <!-- IMPORTANT: escapeJsonForHtml ensures <, > cannot terminate the <\/script> tag prematurely. -->
          <script>
            const swaggerConfig = ${escapeJsonForHtml(swaggerConfig).replace(/"(SwaggerUIBundle\.[^"]+)"/g, "$1")}

            window.onload = () => {
              window.ui = SwaggerUIBundle(swaggerConfig)
            }
          <\/script>
        </body>
        `;
			} else {
				const scalarConfig = {
					content: stringifyJSON(spec),
					...config
				};
				body = `
        <body>
          <div id="app"></div>
 
          <script src="${escapeHtmlEntities(scriptUrl)}"><\/script>
 
          <!-- IMPORTANT: assign to a variable first to prevent ), ( in values breaking the call expression. -->
          <!-- IMPORTANT: escapeJsonForHtml ensures <, > cannot terminate the <\/script> tag prematurely. -->
          <script>
            const scalarConfig = ${escapeJsonForHtml(scalarConfig)}

            Scalar.createApiReference('#app', scalarConfig)
          <\/script>
        </body>
        `;
			}
			return `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>${escapeHtmlEntities(title)}</title>
            ${cssUrl ? `<link rel="stylesheet" type="text/css" href="${escapeHtmlEntities(cssUrl)}" />` : ""}
            ${head}
          </head>
          ${body}
        </html>
        `;
		});
	}
	init(options, router) {
		options.interceptors ??= [];
		options.interceptors.push(async (options2) => {
			const res = await options2.next();
			if (res.matched || options2.request.method !== "GET") return res;
			const prefix = options2.prefix ?? "";
			const requestPathname = options2.request.url.pathname.replace(/\/$/, "") || "/";
			const docsUrl = new URL(`${prefix}${this.docsPath}`.replace(/\/$/, ""), options2.request.url.origin);
			const specUrl = new URL(`${prefix}${this.specPath}`.replace(/\/$/, ""), options2.request.url.origin);
			const generateSpec = once(async () => {
				return await this.generator.generate(router, {
					servers: [{ url: new URL(prefix, options2.request.url.origin).toString() }],
					...await value(this.specGenerateOptions, options2)
				});
			});
			if (requestPathname === specUrl.pathname) {
				const spec = await generateSpec();
				return {
					matched: true,
					response: {
						status: 200,
						headers: {},
						body: new File([stringifyJSON(spec)], "spec.json", { type: "application/json" })
					}
				};
			}
			if (requestPathname === docsUrl.pathname) {
				const html = this.renderDocsHtml(specUrl.toString(), await value(this.docsTitle, options2), await value(this.docsHead, options2), await value(this.docsScriptUrl, options2), await value(this.docsConfig, options2), await generateSpec(), this.docsProvider, await value(this.docsCssUrl, options2));
				return {
					matched: true,
					response: {
						status: 200,
						headers: {},
						body: new File([html], "api-reference.html", { type: "text/html" })
					}
				};
			}
			return res;
		});
	}
};
//#endregion
export { OpenAPIHandler as n, RPCHandler as r, OpenAPIReferencePlugin as t };
