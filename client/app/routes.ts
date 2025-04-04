import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./routes/layout.tsx', [
    index('./routes/home.tsx'),
    route('login', './routes/login.tsx'),
    route('loaders/categories', './loaders/allCategories.tsx'),
    route('loaders/products', './loaders/allProducts.tsx'),
    route('loaders/productsList', './loaders/productsList.tsx'),
    route('categoriesList', './routes/categoriesList.tsx'),
    route('productsList/:category', './routes/productList.tsx'),
    route('productSingle/:id', './routes/productSingle.tsx'),
    route('admin', './routes/admin/dashboard.tsx', [
      route('products', './routes/admin/products/productRoot.tsx', [
        route('create', './routes/admin/products/create.tsx'),
        route('all', './routes/admin/products/allProducts.tsx'),
        route('delete/:id', './routes/admin/products/delete.tsx'),
        route('edit/:id', './routes/admin/products/edit.tsx'),
      ]),
      route('category', './routes/admin/category/categoryRoot.tsx', [
        route('create', './routes/admin/category/create.tsx'),
        route('edit/:id', './routes/admin/category/edit.tsx'),
        route('delete/:id', './routes/admin/category/delete.tsx'),
        route('all', './routes/admin/category/allCategories.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
