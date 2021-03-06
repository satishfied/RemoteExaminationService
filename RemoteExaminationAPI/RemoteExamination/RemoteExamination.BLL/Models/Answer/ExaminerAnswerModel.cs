﻿using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminerAnswerModel : IAnswer
    {
        public bool IsCorrect { get; set; }
        public int AnswerId { get; set; }
        public string Value { get; set; }
    }
}