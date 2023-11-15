import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { appRoutes } from '../../../../../apps/share-a-meal-web/src/app/app.routes'
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterLink],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class UiModule {}
