import React from "react"
import * as RouterDom from "react-router-dom"
import * as AuthKit from "react-auth-kit"
import { ListGroup, Container, Pagination, Row, Col } from "react-bootstrap"


import { Forms, PageContainers } from "../components"
import { api } from "../api"
import { storage } from "../storage"


const TakeExamPage = () => {
  const [selectedExam, setExam] = React.useState(null)
  const [loading, setLoading] = React.useState(true) // child component is dependant on async func
  const formRef = React.useRef(null);
  const authHeader = AuthKit.useAuthHeader()
  const navigate = RouterDom.useNavigate()

  React.useEffect(() => {
    const fetchSelectedExam = async () => {
      try {
        const exam = await storage.getSelectedExam();
        setExam(exam);
      }
      catch (err) {
        console.error("Error fetching selected exam:", err);
      }
      finally {
        setLoading(false)
      }
    };

    fetchSelectedExam();
  }, []);

  const handleSubmitForm = async (answers) => {
    try {
      await api.postSubmission(selectedExam.name, answers, authHeader())
    }
    catch (err) {
      console.error("Posting the submission to backend failed:", err)
    }
  }

  return (
    <PageContainers.TakeExam>
      {
        loading ? null :
          <Forms.TakeExam
            ref={formRef}
            exam={selectedExam}
            submitHandler={handleSubmitForm} />
      }
    </PageContainers.TakeExam>
  );
};

export default TakeExamPage;
