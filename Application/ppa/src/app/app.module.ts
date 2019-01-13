import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminSidebarComponent } from './admin-dashboard/admin-sidebar/admin-sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
          MatIconModule, MatListModule, MatInputModule, MatTabsModule } from '@angular/material';
import { SummaryViewComponent } from './summary-view/summary-view.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { LoginFormComponent } from './login-dashboard/login-form/login-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginResetComponent } from './login-dashboard/login-form/login-reset/login-reset.component';
import { LoginResetCodeComponent } from './login-dashboard/login-form/login-reset/login-reset-code/login-reset-code.component';
import { MainGalleryComponent } from './main-gallery/main-gallery.component';
import { AddImageComponent } from './main-gallery/add-image/add-image.component';
import { GalleryHeaderComponent } from './main-gallery/gallery-header/gallery-header.component';
import { AccountComponent } from './account/account-dashboard/account.component';
import { ViewGalleryComponent } from './main-gallery/view-gallery/view-gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainAccountsComponent } from './account/main-accounts.component';
import { ViewAccountsComponent } from './account/view-accounts/view-accounts.component';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { AccTransactionComponent } from './account/account-reports/acc-transaction/acc-transaction.component';
import { AddTransactionComponent } from './account/add-transaction/add-transaction.component';
import { AccountReportsComponent } from './account/account-reports/account-reports.component';
import { AccBalRepComponent } from './account/account-reports/acc-balance/acc-bal-rep.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MembershipRequestComponent } from './new-membership/membership/membership-request.component';
import { MemberDirectoryComponent } from './new-membership/member-directory/member-directory.component';
import { MemberDirDetailComponent } from './new-membership/member-dir-detail/member-dir-detail.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ViewTransactionComponent } from './account/view-transaction/view-transaction.component';
import { MatCheckboxModule } from '@angular/material';
import { LetterRequestComponent } from './letter-request/letter-request.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { MailComponent } from './mail/mail.component';
import { ReviewMembershipsComponent, DetailedMembershipDialog } from './new-membership/review-memberships/review-memberships.component';
import { FilterPipe} from './new-membership/review-memberships/filter.pipe';
import { MatDialogModule } from '@angular/material';
import { LetterGenComponent } from './review-letter-requests/letter-gen/letter-gen.component';
import { LetterFilterPipe } from './review-letter-requests/letter-filter.pipe';
import { ReviewLetterRequestsComponent } from './review-letter-requests/review-letter-requests.component';
import { HomepageDashboardComponent } from './homepage-dashboard/homepage-dashboard.component';
import { HomepageSidebarComponent } from './homepage-dashboard/homepage-sidebar/homepage-sidebar.component';
import { SliderModule } from 'angular-image-slider';
import {SlideshowModule} from 'ng-simple-slideshow';
import { HomepageBodyComponent } from './homepage-dashboard/homepage-body/homepage-body.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommentComponent, NewCommentDialog } from './comment/comment.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadMoreUtilComponent } from './utils/read-more-util/read-more-util.component';
import { NewsViewComponent } from './news-view/news-view.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NewAdmissionComponent } from './student-admission/new-admission/new-admission.component';
import { ReviewAdmissionComponent } from './student-admission/review-admission/review-admission.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AdmissionMenuComponent } from './student-admission/admission-menu/admission-menu.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { ExcoMembersComponent } from './exco-members/exco-members.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe } from '@angular/common';

import { AdmissionFilterPipe } from './student-admission/review-admission/admission-filter.pipe';
import { ViewAdmissionComponent } from './student-admission/view-admission/view-admission.component';
import { LogComponent } from './log/log.component';
import { CreatePostComponent } from './project/create-post/create-post.component';
import { ReviewCommentsComponent } from './comment/review-comments/review-comments.component';
import { CommentFilterPipe } from './comment/review-comments/comment-filter.pipe';
import { ViewPostsComponent } from './project/view-posts/view-posts.component';
import { TaskListComponent } from './project/task-list/task-list.component';
import { TaskDetailComponent } from './project/task-detail/task-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    SummaryViewComponent,
    AdminNewsComponent,
    LoginDashboardComponent,
    LoginFormComponent,
    LoginResetComponent,
    LoginResetCodeComponent,
    MainGalleryComponent,
    AddImageComponent,
    GalleryHeaderComponent,
    MemberDirectoryComponent,
    MemberDirDetailComponent,
    AccountComponent,
    ViewGalleryComponent,
    MainAccountsComponent,
    ViewAccountsComponent,
    AddTransactionComponent,
    AccountReportsComponent,
    AccBalRepComponent,
    AccTransactionComponent,
    MembershipRequestComponent,
    ViewTransactionComponent,
    AddAccountComponent,
    LetterRequestComponent,
    ProjectComponent,
    ProjectListComponent,
    CreateProjectComponent,
    ViewProjectComponent,
    MailComponent,
    ReviewMembershipsComponent,
    FilterPipe,
    DetailedMembershipDialog,
    ReviewLetterRequestsComponent,
    LetterGenComponent,
    LetterFilterPipe,
    HomepageDashboardComponent,
    HomepageSidebarComponent,
    HomepageBodyComponent,
    UserProfileComponent,
    CommentComponent,
    NewCommentDialog,
    ReadMoreUtilComponent,
    NewsViewComponent,
    SignUpComponent,
    NewAdmissionComponent,
    ReviewAdmissionComponent,
    PasswordResetComponent,
    MemberDashboardComponent,
    ExcoMembersComponent,
    AdmissionMenuComponent,
    MemberDashboardComponent,
    AdmissionFilterPipe,
    ViewAdmissionComponent,
    LogComponent,
    CreatePostComponent,
    ReviewCommentsComponent,
    CommentFilterPipe,
    ViewPostsComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    SliderModule,
    SlideshowModule,
    FlashMessagesModule,
    MatTooltipModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [ReviewMembershipsComponent, DetailedMembershipDialog, CommentComponent, NewCommentDialog],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
