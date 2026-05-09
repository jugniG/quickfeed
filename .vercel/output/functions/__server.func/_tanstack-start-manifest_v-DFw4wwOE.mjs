//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DFw4wwOE.js
var tsrStartManifest = () => ({
	routes: {
		__root__: {
			filePath: "/home/user/tanstack-starter/src/routes/__root.tsx",
			children: [
				"/",
				"/_protected",
				"/login",
				"/api/$",
				"/api/auth/$",
				"/api/rpc/$"
			],
			assets: void 0,
			preloads: [
				"/assets/index-DJz1uBDi.js",
				"/assets/jsx-runtime-BHwPObl3.js",
				"/assets/useStore-Bo6SuAJd.js"
			]
		},
		"/": {
			filePath: "/home/user/tanstack-starter/src/routes/index.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/routes-COSmHHJF.js"]
		},
		"/_protected": {
			filePath: "/home/user/tanstack-starter/src/routes/_protected.tsx",
			children: ["/_protected/dashboard"],
			assets: void 0,
			preloads: ["/assets/_protected-BumOHJOX.js"]
		},
		"/login": {
			filePath: "/home/user/tanstack-starter/src/routes/login.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/login-BPZ33Hqf.js", "/assets/auth-client-ByIQIYD7.js"]
		},
		"/_protected/dashboard": {
			filePath: "/home/user/tanstack-starter/src/routes/_protected.dashboard.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/_protected.dashboard-DYBBrjz_.js", "/assets/auth-client-ByIQIYD7.js"]
		}
	},
	clientEntry: "/assets/index-DJz1uBDi.js"
});
//#endregion
export { tsrStartManifest };
