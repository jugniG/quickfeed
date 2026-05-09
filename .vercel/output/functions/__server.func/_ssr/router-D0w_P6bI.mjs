import { n as require_jsx_runtime } from "../_libs/@heroui/kbd+[...].mjs";
import { S as redirect, a as createRouter, c as createFileRoute, l as createRootRouteWithContext, n as Scripts, r as HeadContent, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ot as string, Tt as object, wt as number } from "../_libs/@better-auth/core+[...].mjs";
import { t as Route$7 } from "./login-BrLbWQpb.mjs";
import { a as auth } from "./server-BOMALCnJ.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as SmartCoercionPlugin, o as os } from "../_libs/@orpc/json-schema+[...].mjs";
import { T as onError } from "../_libs/@orpc/client+[...].mjs";
import { n as OpenAPIHandler, r as RPCHandler, t as OpenAPIReferencePlugin } from "../_libs/orpc__openapi+orpc__server.mjs";
import { t as ZodToJsonSchemaConverter } from "../_libs/orpc__zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { File } from "node:buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D0w_P6bI.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BnfdAU8_.css";
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "QuickFeed — We don't let you miss a single inconvenience of your users" },
			{
				name: "description",
				content: "QuickFeed intercepts Ctrl+Shift+F on your website — capturing user frustration the moment it happens, with screenshots, delivered to your dashboard."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
			}
		]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getServerSession = createServerFn().handler(createSsrRpc("2538e6bc0fefe698c881766f840f156dcb05bc10580d83856e4d32238e628dd5"));
var $$splitComponentImporter$2 = () => import("../_protected-B_a4b6PG.mjs");
var Route$5 = createFileRoute("/_protected")({
	beforeLoad: async () => {
		const session = await getServerSession();
		if (!session) throw redirect({ to: "/login" });
		return { session };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-B_pscxJO.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
/**
* This file aims to polyfill missing APIs in Node.js 18 that oRPC depends on.
*
* Since Stackblitz runs on Node.js 18, these polyfills ensure oRPC works in that environment.
* If you're running oRPC locally, please use Node.js 20 or later for full compatibility.
*/
/**
* Note: Stackblitz provides an emulated Node.js environment with inherent limitations.
* If you encounter issues, please test on a local setup with Node.js 20 or later before reporting them.
*/
/**
* The `oz.file()` schema depends on the `File` API.
* If you're not using `oz.file()`, you can safely remove this polyfill.
*/
if (typeof globalThis.File === "undefined") globalThis.File = File;
var TodoSchema = object({
	id: number().int().min(1),
	name: string()
});
var todos = [
	{
		id: 1,
		name: "Get groceries"
	},
	{
		id: 2,
		name: "Buy a new phone"
	},
	{
		id: 3,
		name: "Finish the project"
	}
];
var router_default = {
	listTodos: os.input(object({})).handler(() => {
		return todos;
	}),
	addTodo: os.input(object({ name: string() })).handler(({ input }) => {
		const newTodo = {
			id: todos.length + 1,
			name: input.name
		};
		todos.push(newTodo);
		return newTodo;
	})
};
var handler$1 = new OpenAPIHandler(router_default, {
	interceptors: [onError((error) => {
		console.error(error);
	})],
	plugins: [new SmartCoercionPlugin({ schemaConverters: [new ZodToJsonSchemaConverter()] }), new OpenAPIReferencePlugin({
		schemaConverters: [new ZodToJsonSchemaConverter()],
		specGenerateOptions: {
			info: {
				title: "TanStack ORPC Playground",
				version: "1.0.0"
			},
			commonSchemas: {
				Todo: { schema: TodoSchema },
				UndefinedError: { error: "UndefinedError" }
			},
			security: [{ bearerAuth: [] }],
			components: { securitySchemes: { bearerAuth: {
				type: "http",
				scheme: "bearer"
			} } }
		},
		docsConfig: { authentication: { securitySchemes: { bearerAuth: { token: "default-token" } } } }
	})]
});
async function handle$1({ request }) {
	const { response } = await handler$1.handle(request, {
		prefix: "/api",
		context: {}
	});
	return response ?? new Response("Not Found", { status: 404 });
}
var Route$3 = createFileRoute("/api/$")({ server: { handlers: {
	HEAD: handle$1,
	GET: handle$1,
	POST: handle$1,
	PUT: handle$1,
	PATCH: handle$1,
	DELETE: handle$1
} } });
var $$splitComponentImporter = () => import("../_protected.dashboard-DU2Hs40i.mjs");
var Route$2 = createFileRoute("/_protected/dashboard")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var handler = new RPCHandler(router_default);
async function handle({ request }) {
	const { response } = await handler.handle(request, {
		prefix: "/api/rpc",
		context: {}
	});
	return response ?? new Response("Not Found", { status: 404 });
}
var Route$1 = createFileRoute("/api/rpc/$")({ server: { handlers: {
	HEAD: handle,
	GET: handle,
	POST: handle,
	PUT: handle,
	PATCH: handle,
	DELETE: handle
} } });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$6
});
var ProtectedRoute = Route$5.update({
	id: "/_protected",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var ApiSplatRoute = Route$3.update({
	id: "/api/$",
	path: "/api/$",
	getParentRoute: () => Route$6
});
var ProtectedDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => ProtectedRoute
});
var ApiRpcSplatRoute = Route$1.update({
	id: "/api/rpc/$",
	path: "/api/rpc/$",
	getParentRoute: () => Route$6
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$6
});
var ProtectedRouteChildren = { ProtectedDashboardRoute };
var rootRouteChildren = {
	IndexRoute,
	ProtectedRoute: ProtectedRoute._addFileChildren(ProtectedRouteChildren),
	LoginRoute,
	ApiSplatRoute,
	ApiAuthSplatRoute,
	ApiRpcSplatRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function getContext() {
	return { queryClient: new QueryClient() };
}
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { getRouter };
