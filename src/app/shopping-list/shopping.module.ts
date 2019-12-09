import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [RouterModule, FormsModule, ShoppingRoutingModule, SharedModule],
})
export class ShoppingModule {}
