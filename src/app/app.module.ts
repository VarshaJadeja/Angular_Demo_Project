import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AddProductComponent } from '@sharedComponents/add-product/add-product.component';
import { ProductListComponent } from '@sharedComponents/product-list/product-list.component';
import { ProductDetailsComponent } from '@sharedComponents/product-details/product-details.component';
import { CategoriesComponent } from '@sharedComponents/categories/categories.component';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '@services/product-service.service';
import { ToastrModule, provideToastr  } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LoginComponent } from '@sharedComponents/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from './services/login.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// Your code using DateTime goes here

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CategoriesComponent,
    LoginComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AsyncPipe,
    BrowserAnimationsModule,
    // HttpClientModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatCardModule,
  ],
  providers: [ProductService, LoginService,
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(),
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
