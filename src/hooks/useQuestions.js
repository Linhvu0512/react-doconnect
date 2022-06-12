import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../components/Firebase/Firebase.config";

const useQuestions = () =>{
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(()=>{  
        const getQuestions = async() =>{
            const questionsDocs = await getDocs(collection(db, "questions"))
            const questionsData = questionsDocs.docs.map(doc => ({...doc.data(), id: doc.id}));
            setQuestions(questionsData)
            setLoading(true)
        }
        getQuestions();
    }, [])

    return {questions, loading}
}

export default useQuestions;