import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import Loading from '../../components/UI/Loader/Loader'
import { getQuizes } from '../../store/slices/quizSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const QuizList = () => {
  const quiz = useAppSelector((state) => state.quiz)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getQuizes())
  }, [])

  const renderQuizes = () => {
    return quiz.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>
            <h3>{quiz.quizName}</h3>
            <p>{quiz.quizDescription}</p>
            <ul className={classes.QuizItemInfo}>
              <li>
                {/* <i className={`${classes.InfoIcon} fas fa-list`}></i> */}
                <small className={classes.InfoCount}>
                  {quiz.quizQuestionsCount} questions
                </small>
              </li>
              {/* <li>
                <small className={classes.InfoCount}>1 hour 15 minutes</small>
              </li> */}
            </ul>
          </NavLink>
        </li>
      )
    })
  }

  return (
    <div className={classes.QuizList}>
      <div className={classes.QuizListWrapper}>
        <h1>Quizes list</h1>
        {quiz.loading ? (
          <Loading />
        ) : (
          <ul className={classes.QuizListItems}>{renderQuizes()}</ul>
        )}
      </div>
    </div>
  )
}

export default QuizList
