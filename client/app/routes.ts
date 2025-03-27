import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("./routes/home.tsx"), route("admin", "./routes/admin/dashboard.tsx", [
    route("category/create", "./routes/admin/category/create.tsx")
])] satisfies RouteConfig;
