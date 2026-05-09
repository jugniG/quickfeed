import { c as createFileRoute, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ot as string, Tt as object } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BrLbWQpb.js
var $$splitComponentImporter = () => import("./login-CEW4rWCg.mjs");
var searchSchema = object({ domain: string().optional() });
var Route = createFileRoute("/login")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
