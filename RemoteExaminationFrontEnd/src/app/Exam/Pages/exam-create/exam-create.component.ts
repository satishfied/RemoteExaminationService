import {Component, OnInit} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {faCheck, faPlus, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.scss']
})

export class ExamCreateComponent implements OnInit {
  examNameForm: FormGroup;
  examQuestionForm: FormGroup;
  faPlus = faPlus;
  faCheck = faCheck;
  faSave = faSave;
  faTrash = faTrash;
  exam: IExam<IQuestion<IAnswer>>;

  constructor(private examService: ExamService,
              private toastrService: NbToastrService,
              private router: Router,
              private fb: FormBuilder) {
    this.initializeForms(fb);
    this.initializeNewExam();
  }

  private initializeNewExam() {
    this.exam = {
      examId: null,
      name: '',
      questions: [],
    };
  }
  private initializeForms(fb) {
    this.examNameForm = fb
      .group({
        examName: ['', Validators.required]
      });

    this.examQuestionForm = fb
      .group({
        examQuestion: ['', Validators.required]
      });
  }

  showToast(position, status, duration, message: string, title: string) {
    this.toastrService.show(
      message,
      title,
      {preventDuplicates: true, position, status, duration});
  }

  ngOnInit() {
  }

  addAnswer(event) {
    // this.showAnswerInput(event);
  }

  addQuestion() {
    this.showQuestionInput();
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.exam.questions[0].answers
      .splice(answerIndex, 1);
  }

  removeQuestion(questionIndex: number) {
    this.exam.questions
      .splice(questionIndex, 1);
  }

  createExam() {
    this.exam.name = $('#examName')
      .val()
      .toString();
    this.exam.examId = 0;
    this.examService.createExam(this.exam).subscribe(() => {
      this.router.navigate(['/dashboard'])
        .then(() => {
          this.showToast('top-right',
            'success',
            3000,
            'Экзамен успешно создан',
            'Успех');
        });
    });
  }

  saveAnswer() {
    // this.showAnswerInitial();
  }

  saveQuestion() {
    const question = $('#question-input')
      .val()
      .toString();
    this.exam.questions.push({questionMessage: question, answers: []});
    console.log(this.exam.questions);
    this.showQuestionInitial();
  }

  /*showAnswerInput(event) {
    this.parentBlock = $(event.path[0])
      .parents('nb-list-item')
      .first();
    this.hiddenBlock = this.parentBlock
      .find('.show-answer')
      .first();
    this.showedBlock = this.parentBlock
      .find('.save-answer')
      .first();

    this.hiddenBlock
      .addClass('hide');
    this.showedBlock
      .removeClass('hide');
  }*/

  /*showAnswerInitial() {
    this.hiddenBlock
      .removeClass('hide');
    this.showedBlock
      .addClass('hide');
  }*/

  showQuestionInput() {
    $('#add-question-block').addClass('hide');
    $('#save-question-block').removeClass('hide');
  }

  showQuestionInitial() {
    $('#add-question-block').removeClass('hide');
    $('#save-question-block').addClass('hide');
  }
}