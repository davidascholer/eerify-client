import { createBrowserRouter, createMemoryRouter, RouteObject } from "react-router-dom";

const AppRouter = (routes: RouteObject[]) => {
	// Use memory router during Vitest runs to avoid double-router issues
	const isVitest = !!import.meta.env?.VITEST;
	if (isVitest) {
		const initialPath = typeof window !== "undefined" ? window.location.pathname || "/" : "/";
		return createMemoryRouter(routes, { initialEntries: [initialPath] });
	}
	return createBrowserRouter(routes);
};

export default AppRouter;
