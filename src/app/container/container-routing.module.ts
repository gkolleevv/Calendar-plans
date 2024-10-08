import {RouterModule, Routes} from "@angular/router";
import {ContainerComponent} from "./container.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '', component: ContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule {}
