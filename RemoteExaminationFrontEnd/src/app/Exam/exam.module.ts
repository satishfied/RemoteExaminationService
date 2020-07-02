import {NgModule} from '@angular/core';
import {ExamService} from '../Shared/Services/Exam/exam.service';
import {ExamCompetitionService} from '../Shared/Services/ExamCompetition/exam-competition.service';
import {SharedModule} from '../Shared/Services/Shared/Modules/shared.module';
import {ExamRoutingModule} from './exam-routing/exam-routing.module';
import {ExamCompetitionComponent} from './Pages/exam-competition/exam-competition.component';
import {ExamDetailsComponent} from './Pages/exam-details/exam-details.component';
import {ExamResultViewComponent} from './Pages/exam-result-view/exam-result-view.component';
import {NbAccordionModule, NbIconModule, NbListModule, NbTreeGridModule, NbWindowModule, NbWindowService} from '@nebular/theme';
import {ExamEditComponent} from './Pages/exam-edit/exam-edit.component';
import {ExamCreateComponent} from './Pages/exam-create/exam-create.component';
import { ExamAddQuestionComponent } from './Pages/exam-create/Partial Components/exam-add-question/exam-add-question.component';
import { ExamAddAnswerComponent } from './Pages/exam-create/Partial Components/exam-add-answer/exam-add-answer.component';


@NgModule({
  declarations: [
    ExamCompetitionComponent,
    ExamDetailsComponent,
    ExamResultViewComponent,
    ExamEditComponent,
    ExamCreateComponent,
    ExamAddQuestionComponent,
    ExamAddAnswerComponent,
  ],
  imports: [
    ExamRoutingModule,
    SharedModule.forRoot(),
    NbAccordionModule,
    NbListModule,
    NbTreeGridModule,
  ],
  providers: [
    ExamService,
    ExamCompetitionService,
  ]
})
export class ExamModule {
}
