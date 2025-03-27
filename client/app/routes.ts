import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index('./routes/home.tsx'),
    route("loaders/categories", "./loaders/allCategories.tsx"),
  route('admin', './routes/admin/dashboard.tsx', [
    route('category', './routes/admin/category/categoryRoot.tsx', [
      route('create', './routes/admin/category/create.tsx'),
        route('edit/:id', './routes/admin/category/edit.tsx'),
      route("all", "./routes/admin/category/allCategories.tsx")
    ]),
  ]),
] satisfies RouteConfig
