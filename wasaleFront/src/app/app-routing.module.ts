import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Dashboard404 } from "./Error404/dashboard.component";

import { GlobalComponent } from "./global/global.component";
import { AdminGuard } from "./Guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "",
    component: GlobalComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule),
      },
      {
        path: "user",
        loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "notfound",
        component: Dashboard404,
      },
    ],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AdminGuard],
  },
  {
    path: "notfound",
    component: Dashboard404,
  },
  {
    path: "products",
    loadChildren: () =>
    import("./souq/souq.module").then(m => m.SouqModule)
  },

  // {
  //   path: "",
  //   redirectTo: "",
  //   pathMatch: "full",
  // },
  {
    path: "**",
    redirectTo: "notfound",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
