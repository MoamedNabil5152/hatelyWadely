import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () => import("../pages/pages.module").then((m) => m.PagesModule),
      },
    ],
  },
];
