import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Mat modules

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SidePanelComponent } from './component/side-panel/side-panel.component';
import { HeaderComponent } from './component/header/header.component';
import { AddClassDirective } from '../../directive/add-class.directive';
import { SkeletonLoaderComponent } from './component/skeleton-loader/skeleton-loader.component';
import { ListOfTableComponent } from './component/list-of-table/list-of-table.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { KeyPipe } from '../../pipe/key.pipe';
import { DetailsComponent } from '../common/component/details/details.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


// import { MatCarousel, MatCarouselComponent, MatCarouselModule  } from '@ngmodule/material-carousel';
import { SliderModule } from 'angular-image-slider';
import { NgImageSliderModule } from 'ng-image-slider';
import { ToastrModule } from 'ngx-toastr'

import { ImageViewComponent } from './component/image-view/image-view.component';
import { OtpComponent } from './component/otp/otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { LoaderComponent } from '../../component/loader/loader.component';
import { ContactCardComponent } from './component/contact-card/contact-card.component';
import { OtherInformationCardComponent } from './component/other-information-card/other-information-card.component';
import {ConnectionServiceModule} from 'ng-connection-service';
import { CommentDetailsComponent } from './component/comment-details/comment-details.component';
@NgModule({
  declarations: [
    ListOfTableComponent,
    SidePanelComponent,
    HeaderComponent,
    AddClassDirective,
    SkeletonLoaderComponent,
    SafeHtmlPipe,
    DetailsComponent,
    DashboardComponent,
    ImageViewComponent,
    OtpComponent,
    LoaderComponent,
    ContactCardComponent,
    OtherInformationCardComponent,
    KeyPipe,
    CommentDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    HttpClientModule,

    // Material modules
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatRippleModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    ToastrModule.forRoot(),

    // MatCarousel,
    // MatCarouselComponent,
    // MatCarouselModule,
    SliderModule,
    NgImageSliderModule,

    NgOtpInputModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    HttpClientModule,
    // Material modules
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatRippleModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    AddClassDirective,
    SidePanelComponent,
    HeaderComponent,
    ListOfTableComponent,
    SkeletonLoaderComponent,
    SafeHtmlPipe,
    DetailsComponent,
    DashboardComponent,
    MatDialogModule,
    // MatCarousel,
    // MatCarouselComponent,
    // MatCarouselModule,
    SliderModule,
    NgImageSliderModule,
    NgOtpInputModule,
    ImageViewComponent,
    LoaderComponent,
    ContactCardComponent,
    KeyPipe,
    ToastrModule,
  ],
  entryComponents:[
    OtpComponent,
    ImageViewComponent,
    CommentDetailsComponent
  ]
})
export class localModule { }
