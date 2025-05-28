"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Clock, Trophy, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function QuizCard() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const quiz = {
    title: "Computer Science Fundamentals",
    description: "Test your knowledge of basic CS concepts",
    timeLimit: 300, // 5 minutes
    questions: [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
      },
      {
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1,
      },
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language",
        ],
        correct: 0,
      },
    ],
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizStarted(false)
  }

  const startQuiz = () => {
    setQuizStarted(true)
  }

  if (!quizStarted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground">{quiz.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{quiz.questions.length}</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{Math.floor(quiz.timeLimit / 60)}</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">Easy</p>
            <p className="text-xs text-muted-foreground">Difficulty</p>
          </div>
        </div>

        <Button onClick={startQuiz} className="w-full">
          <Brain className="h-4 w-4 mr-2" />
          Start Quiz
        </Button>
      </motion.div>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="space-y-2">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Quiz Complete!</h3>
          <p className="text-muted-foreground">Great job on completing the quiz</p>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">{percentage}%</div>
          <p className="text-sm text-muted-foreground">
            You scored {score} out of {quiz.questions.length} questions correctly
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={resetQuiz}>
            Try Again
          </Button>
          <Button>View Solutions</Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>5:00</span>
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">{quiz.questions[currentQuestion].question}</h3>

        <div className="space-y-2">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-3 text-left border rounded-lg transition-colors ${
                selectedAnswer === index ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {selectedAnswer === index && <CheckCircle className="h-2 w-2 text-white" />}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full">
          {currentQuestion + 1 === quiz.questions.length ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </motion.div>
  )
}
