export const subjectChange = (component, newSubject) => {
  component?.setters?.setExamSubject(newSubject)
}

const dateChange = (component, newDate) => {
  component?.setters?.setExamDate(newDate)
}

const dateReset = (component) => {
  component?.setters?.setExamDate(component?.defaults?.tomorrow)
  component?.setters?.setExamDuration(component?.defaults?.minDuration)
}

const startTimeChange = (component, newStartTime) => {
  component?.setters?.setExamStartTime(newStartTime)
  component?.setters?.setExamEndTime(newStartTime + (component?.states?.examDuration * 60))
}

const timeReset = (component) => {
  component?.setters?.setExamStartTime(component?.defaults?.earliestHourNum)
  component?.setters?.setExamEndTime(component?.defaults?.earliestHourNum + component?.defaults?.minDuration * 60)
  component?.setters?.setExamDuration(component?.defaults?.minDuration)
}

const durationChange = (component, newDuration) => {
  newDuration = Math.floor(newDuration)
  if (newDuration >= 1 || newDuration <= 180) {
    component?.setters?.setExamDuration(newDuration)
    component?.setters?.setExamEndTime(component?.states?.examStartTime + (newDuration * 60))
  }
}

const sliderChange = (component, newDuration) => {
  component?.setters?.setExamDuration(newDuration)
  component?.setters?.setExamEndTime(component?.states?.examStartTime + (newDuration * 60))
}

const randomizeToggle = (component) => {
  component?.setters?.setExamIsRandomized(!component?.states?.examIsRandomized)
}

const questionsClear = (component) => {
  if (window.confirm('Are you sure you want to clear all questions?')) {
    component.setters.setQuestions([])
  }
}

const questionEdit = (question) => {
  // changeActiveTab('questionform')
}


export default {
  subjectChange,
  dateChange,
  dateReset,
  startTimeChange,
  timeReset,
  durationChange,
  sliderChange,
  randomizeToggle,
  questionsClear,
  questionEdit
}