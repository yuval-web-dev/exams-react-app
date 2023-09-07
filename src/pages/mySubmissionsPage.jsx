import React from "react"
import { Button, ListGroup } from "react-bootstrap"
import * as AuthKit from "react-auth-kit"
import * as RouterDom from "react-router-dom"

import { PageContainers } from "../components"
import { default as api } from "../api"
import { default as storage } from "../storage"


const MySubmissionsPage = () => {
  const [exams, setExams] = React.useState([])
  const [selectedExam, setSelectedExam] = React.useState(null)

  const navigate = RouterDom.useNavigate()
  const authHeader = AuthKit.useAuthHeader()

  React.useEffect(() => {
    const refreshExams = async () => {
      try {
        // Fetch exams from the API
        const apiResponse = await api.getExams(authHeader());
        if (apiResponse) {
          // Filter out duplicates and update the state
          setExams((prevExams) => {
            const newExams = apiResponse.exams.filter(
              (apiExam) => !prevExams.some((exam) => exam.id === apiExam.id)
            );
            return [...prevExams, ...newExams];
          });
        }

        // Fetch exams from storage
        const storageExams = await storage.getExams();
        if (storageExams) {
          // Filter out duplicates and update the state
          setExams((prevExams) => {
            const newExams = storageExams.filter(
              (storageExam) => !prevExams.some((exam) => exam.id === storageExam.id)
            );
            return [...prevExams, ...newExams];
          });
        }
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching exams:", error);
      }
    };

    refreshExams();
  }, []);


  const handleSelectExam = async (exam) => {
    if (exam === selectedExam) {
      setSelectedExam(null)
      await storage.clearSelectedExam()
    }
    else {
      setSelectedExam(exam)
      await storage.setSelectedExam(exam)
    }

  }

  const handleClickStart = () => {
    if (selectedExam) {
      navigate("/take-exam")
    }
  }


  return (
    <PageContainers.PostLogin>

    </PageContainers.PostLogin>
  )
}



export default MySubmissionsPage