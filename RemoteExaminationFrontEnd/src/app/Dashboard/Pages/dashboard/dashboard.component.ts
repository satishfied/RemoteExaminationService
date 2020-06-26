import { Component, OnInit } from '@angular/core';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {Auth} from '../../../Shared/Models/UserAuth/auth';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faVoteYea} from '@fortawesome/free-solid-svg-icons';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: Auth;
  ExamList: Array<IExam<IQuestion<IAnswer>>>;
  faTrash = faTrash;
  faEdit = faEdit;
  faVoteYea = faVoteYea;
  private destroy$ = new Subject<void>();

  constructor(private examService: ExamService,
              private authenticationService: AuthorizationService,
              private toastrService: NbToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
     this.getExams();
  }

  showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }
  getExams(): void {
    this.examService.getExams()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.ExamList = data;
        console.log(this.ExamList);
      });
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin;
  }

  isExaminer(): boolean {
    return this.authenticationService.isExaminer;
  }

  isExamined(): boolean {
    return this.authenticationService.isExamined;
  }
  deleteExam(examId: number) {
   this.examService.deleteExam(examId).subscribe(() => {
      this.showToast('top-right',
        'success',
        1600,
        'Экзамен удален',
        'Успех');
      location.reload();
   });
}
}
