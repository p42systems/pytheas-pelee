import fetch from "cross-fetch";

export interface RouteStop {
  id: string;
  name: string;
}

export interface Route {
  id: string;
  name: string;
  stops: RouteStop[];
  features: string[];
}

export interface RoutesPayload {
  routes: Route[];
}

export async function fetchRoutes(): Promise<RoutesPayload> {
  const routesUrl = `${window.location.origin}/data/routes/routes.json`;

  const res = await fetch(routesUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data: RoutesPayload = await res.json();

  return data;
}
