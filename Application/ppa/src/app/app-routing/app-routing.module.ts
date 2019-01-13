import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryViewComponent } from '../summary-view/summary-view.component';
import { AdminNewsComponent } from '../admin-news/admin-news.component';
import { LoginResetComponent } from '../login-dashboard/login-form/login-reset/login-reset.component';
import { ViewAccountsComponent } from '../account/view-accounts/view-accounts.component';
import { LoginResetCodeComponent } from '../login-dashboard/login-form/login-reset/login-reset-code/login-reset-code.component';
import { MainGalleryComponent} from '../main-gallery/main-gallery.component';
import { MainAccountsComponent } from '../account/main-accounts.component';
import { AccountComponent } from '../account/account-dashboard/account.component';
import { AccTransactionComponent } from '../account/account-reports/acc-transaction/acc-transaction.component';
import { AddAccountComponent } from '../account/add-account/add-account.component';
import { AccBalRepComponent } from '../account/account-reports/acc-balance/acc-bal-rep.component';
import { ViewTransactionComponent } from '../account/view-transaction/view-transaction.component';
import { MemberDirectoryComponent } from '../new-membership/member-directory/member-directory.component';
import { MemberDirDetailComponent } from '../new-membership/member-dir-detail/member-dir-detail.component';
import { AddTransactionComponent } from '../account/add-transaction/add-transaction.component';
import { AccountReportsComponent } from '../account/account-reports/account-reports.component';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { ViewProjectComponent } from '../project/view-project/view-project.component';
import { CreateProjectComponent } from '../project/create-project/create-project.component';
import { MembershipRequestComponent } from '../new-membership/membership/membership-request.component';
import { ReviewMembershipsComponent } from '../new-membership/review-memberships/review-memberships.component';
import { ReviewLetterRequestsComponent } from '../review-letter-requests/review-letter-requests.component';
import { MailComponent } from '../mail/mail.component';
import { HomepageBodyComponent } from '../homepage-dashboard/homepage-body/homepage-body.component';
import { LoginDashboardComponent } from '../login-dashboard/login-dashboard.component';
import { LetterRequestComponent } from '../letter-request/letter-request.component';
import { LetterGenComponent } from '../review-letter-requests/letter-gen/letter-gen.component';
import { HomepageSidebarComponent } from '../homepage-dashboard/homepage-sidebar/homepage-sidebar.component';
import { LoginFormComponent } from '../login-dashboard/login-form/login-form.component';
import { HomepageDashboardComponent } from '../homepage-dashboard/homepage-dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NewsViewComponent } from '../news-view/news-view.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { NewAdmissionComponent } from '../student-admission/new-admission/new-admission.component';
import { AdmissionMenuComponent } from '../student-admission/admission-menu/admission-menu.component';
import { MemberDashboardComponent } from '../member-dashboard/member-dashboard.component';
import { ExcoMembersComponent } from '../exco-members/exco-members.component';
import { ReviewAdmissionComponent } from '../student-admission/review-admission/review-admission.component';
import { ViewAdmissionComponent } from '../student-admission/view-admission/view-admission.component';
import { ReviewCommentsComponent } from '../comment/review-comments/review-comments.component';
import { TaskDetailComponent } from '../project/task-detail/task-detail.component';
import { LogComponent } from '../log/log.component';

const routes: Routes = [
  {
    path: 'admin-summary',
    component: SummaryViewComponent
  },
  {
    path: 'admin-news',
    component: AdminNewsComponent
  },
  {
    path: 'login-reset',
    component: LoginResetComponent
  },
  {
    path: 'login-reset-code',
    component: LoginResetCodeComponent
  },
  {
    path: 'accounts-all',
    component: ViewAccountsComponent
  },
  {
    path: 'transactions-all',
    component: ViewTransactionComponent
  },
  {
    path: 'transactions-all/:accountId',
    component: ViewTransactionComponent
  },
  {
    path: 'accounts-add',
    component: AddAccountComponent
  },
  {
    path: 'account-rep1',
    component: AccountReportsComponent
  },
  {
    path: 'acc-bal-rep',
    component: AccBalRepComponent
  },
  {
    path: 'acc-transaction',
    component: AccTransactionComponent
  },
  {
    path: 'member-dir-det/:memberId',
    component: MemberDirDetailComponent
  },
  {
    path: 'letter-gen/:memberId',
    component: LetterGenComponent
  },
  {
    path: 'member-dir',
    component: MemberDirectoryComponent
  },
  {
    path: 'transactions-add',
    component: AddTransactionComponent
  },
  {
    path: 'transactions-add/:accountId',
    component: AddTransactionComponent
  },
  {
    path: 'transactions-edit/:transactionId',
    component: AddTransactionComponent
  },
  {
    path: 'accounts-edit/:accountId',
    component: AddAccountComponent
  },
  {
    path: 'account/',
    component: MainAccountsComponent
  },
  {
    path: 'accounts-dash',
    component: AccountComponent
  },
  {
    path: 'main-gallery',
    component: MainGalleryComponent
  },
  {
    path: 'projects/create',
    component: CreateProjectComponent
  },
  {
    path: 'projects',
    component: ProjectListComponent,
  },
  {
    path: 'projects/:projectId/tasks/create',
    component: TaskDetailComponent
  },
  {
    path: 'projects/:projectId/:taskId/edit',
    component: TaskDetailComponent
  },
  {
    path: 'projects/:projectId/edit',
    component: CreateProjectComponent
  },
  {
    path: 'projects/:projectId',
    component: ViewProjectComponent
  },
  {
    path: 'email/compose',
    component: MailComponent
  },
  {
    path: 'new-membership',
    component: MembershipRequestComponent
  },
  {
    path: 'review-memberships',
    component: ReviewMembershipsComponent
  },
  {
    path: 'review-letters',
    component: ReviewLetterRequestsComponent
  },
  {
    path: 'home-page',
    component: HomepageBodyComponent
  },
  {
    path: 'home-Mainpage',
    component: HomepageDashboardComponent
  },
  {
    path: 'login-page',
    component: LoginDashboardComponent
  },
  {
    path: 'letter-request',
    component: LetterRequestComponent
  },
  {
    path: 'home-sidebar',
    component: HomepageSidebarComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'view-news',
    component: NewsViewComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'new-admissions/:param',
    component: NewAdmissionComponent
  },
  {
    path: 'admissions',
    component: AdmissionMenuComponent
  },
  {
    path: 'member-dashboard',
    component: MemberDashboardComponent
  },
  {
    path: 'exco-members',
    component: ExcoMembersComponent
  },
  {
    path: 'review-admission',
    component: ReviewAdmissionComponent
  },
  {
    path: 'view-admission/:id',
    component: ViewAdmissionComponent
  },
  {
    path: 'view-comments',
    component: ReviewCommentsComponent
  },
  {
    path: 'logs',
    component: LogComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
