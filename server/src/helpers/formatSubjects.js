import { poolSiia } from "../dB.js"

export async function addTeacherSubjects(subjects){
    const arrSubjectsFormat = []
    for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].teacherId != null) {
            try {
                const [getTeacherSubject] = await poolSiia.query("SELECT id AS teacherId, name AS teacherName, last_name AS teacherLastName, image AS teacherImage FROM users WHERE id = ?", [subjects[i].teacherId])
                const dataSubject = Object.assign(subjects[i], getTeacherSubject[0])
                arrSubjectsFormat.push(dataSubject)
            } catch (e) {
                return e
            }
        }else{
            const dataSubject = Object.assign(subjects[i], {
                teacherId: null,
                teahcerName: null,
                teacherLastName: null,
                teacherImage: null
            })
            arrSubjectsFormat.push(dataSubject)
        }
    }   

    return arrSubjectsFormat
}

export function formatAviableSubjectTeacher(listSubjects, listSchedules) {
    const listSubjectsFormat = []
    for (let i = 0; i < listSubjects.length; i++) {
        let subjectFormat = {
            courseId: listSubjects[i].courseId,
            subjectId: listSubjects[i].subject_id,
            teamName: listSubjects[i].teamName,
            teacherId: listSubjects[i].teacher_id,
            teamId: listSubjects[i].team_id,
            subjectName: listSubjects[i].subjectName,
            credits: listSubjects[i].credits,
            semesterId: listSubjects[i].semester_id,
            schedule: []
        }
        for (let y = 0; y < listSchedules.length; y++) {
            if (listSubjects[i].courseId == listSchedules[y].subjectCourseId) {
                subjectFormat.schedule.push({
                    id: listSchedules[y].id,
                    day: listSchedules[y].day,
                    startTime: listSchedules[y].startTime,
                    endTime: listSchedules[y].endTime,
                })
            }
        }
        listSubjectsFormat.push(subjectFormat)
    }

    return listSubjectsFormat
}

export function formatQualificationsStudent(listSubjects){
    console.log(listSubjects)
    //Aqui defino un arreglo vacio donde iran las materias formateadas
    const listSubjectsFormat = []

    //Con este filter buscamos si en el listado de materias hay materias en segunda oportunidad
    const getSubjectsFailed = listSubjects.filter(s => s.opportunity > 1)

    //verificamos que haya materias en segunda oportunidad
    if (getSubjectsFailed.length > 0) {
        //Recuperamos las materias que estan primera oportunidad
        const getSubjectsNotFailed = listSubjects.filter(s => s.opportunity == 1)
        
        /* 
            Recorremos las materias que no tienen segunda oportunidad para compararlas
            con las que si lo tienen y fuccionarlas en un solo array de materias
        */
        for (let i = 0; i < getSubjectsNotFailed.length; i++) {
            //definimos una variable con la materia que no tienen segunda oportunidad 
            let subjectFormat = getSubjectsNotFailed[i]
            /*
                le agregamos el aributo donde ira la calificacion de la primera oportunidad
                y despues meter los datos de las materias en oportunidad 2 o 3 etc...  
            */
            subjectFormat.ratings = [{
                id: subjectFormat.subjectStudiedId,
                courseId: subjectFormat.subjectCourseId,
                opportunity: subjectFormat.opportunity,
                date: subjectFormat.date,
                qualification: subjectFormat.qualification,
                typeOfGroup: subjectFormat.typeOfGroup,
                team:{
                    id: subjectFormat.teamId,
                    name: subjectFormat.teamName,
                },
                teacher:{
                    id: subjectFormat.teacherId,
                    name: subjectFormat.teacherName,
                    lastName: subjectFormat.teacherLastName,
                    image: subjectFormat.teacherImage,
                },
                period: {
                    id: subjectFormat.periodId,
                    name: subjectFormat.periodName,
                    startDate: subjectFormat.periodStartDate,
                    endDate: subjectFormat.periodEndDate,
                    typeOfPeriod: subjectFormat.typeOfPeriod,
                }

            }]
            //recorremos las materias en oportunidad 2 o mas
            for (let y = 0; y < getSubjectsFailed.length; y++) {
                /**
                    validamos que coincida con la materia y estudiante de la materia
                    en primera oportunidad 
                */ 
                if (subjectFormat.studentId === getSubjectsFailed[y].studentId && subjectFormat.subjectId === getSubjectsFailed[y].subjectId) {
                    /*
                        le agregamos los datos de las materias en segundo o mas 
                        oportunidad al array de materias de la materia en primera 
                        oportunidad
                     */ 
                    subjectFormat.ratings.push({
                        id: getSubjectsFailed[y].subjectStudiedId,
                        courseId: getSubjectsFailed[y].subjectCourseId,
                        opportunity: getSubjectsFailed[y].opportunity,
                        date: getSubjectsFailed[y].date,
                        qualification: getSubjectsFailed[y].qualification,
                        typeOfGroup: getSubjectsFailed[y].typeOfGroup,
                        team:{
                            id: getSubjectsFailed[y].teamId,
                            name: getSubjectsFailed[y].teamName,
                        },
                        teacher:{
                            id: getSubjectsFailed[y].teacherId,
                            name: getSubjectsFailed[y].teacherName,
                            lastName: getSubjectsFailed[y].teacherLastName,
                            image: getSubjectsFailed[y].teacherImage,
                        },
                        period: {
                            id: getSubjectsFailed[y].periodId,
                            name: getSubjectsFailed[y].periodName,
                            startDate: getSubjectsFailed[y].periodStartDate,
                            endDate: getSubjectsFailed[y].periodEndDate,
                            typeOfPeriod: getSubjectsFailed[y].typeOfPeriod,
                        }
                    })
                }
            }
            //agregamos la materia ya fucciondada al array de materias
            listSubjectsFormat.push(subjectFormat)
        }

        /**
         en caso contrario no hay materias en segunda oportunidad solo hay que
         poner la calificacion de primera oportunidad dentro del array, solo puede
         haber hasta cuarta oportunidad y solo en casos suamente especiales 
        */ 
    }else{
        for (let l = 0; l < listSubjects.length; l++) {
            let subjectFormat = listSubjects[l]
            subjectFormat.ratings = [
                {
                id: subjectFormat.subjectStudiedId,
                courseId: subjectFormat.subjectCourseId,
                opportunity: subjectFormat.opportunity,
                date: subjectFormat.date,
                qualification: subjectFormat.qualification,
                typeOfGroup: subjectFormat.typeOfGroup,
                team:{
                    id: subjectFormat.teamId,
                    name: subjectFormat.teamName,
                },
                teacher:{
                    id: subjectFormat.teacherId,
                    name: subjectFormat.teacherName,
                    lastName: subjectFormat.teacherLastName,
                    image: subjectFormat.teacherImage,
                },
                period:{
                    id: subjectFormat.periodId,
                    name: subjectFormat.periodName,
                    startDate: subjectFormat.periodStartDate,
                    endDate: subjectFormat.periodEndDate,
                    typeOfPeriod: subjectFormat.typeOfPeriod,
                    }
                }
            ]
            listSubjectsFormat.push(subjectFormat)
        }
    }

    /**
     * finalmente retornamos el objto ya procesado no he quitado los atributos antiguos
     * de calificacion, date y oportunidad os dejo a vuestra consideracion quitarlos
     */
    return listSubjectsFormat
}

export function addListQualifications(listSubjects){
    for (let i = 0; i < listSubjects.length; i++) {
        for (let y = 0; y < listSubjects.length; y++) {
            if (listSubjects[i].studentId == listSubjects[y].studentId && listSubjects[i].subjectCourseId == listSubjects[y].subjectCourseId) {
               if (listSubjects[i].opportunity == 1 && listSubjects[y].opportunity == 2) {
                    Object.assign(listSubjects[i], {
                        qualifications: {
                            dateQualificationOne: listSubjects[i].date_qualification, 
                            qualificationOne: listSubjects[i].qualification,
                            dateQualificationTwo: listSubjects[y].date_qualification,
                            qualificationTwo: listSubjects[y].qualification,
                            dateQualificationThree: null,
                            qualificationThree: null,
                        }
                    })
                    listSubjects.splice(y, 1)
                    console.log(listSubjects[i])
                    for (let z = 0; z < listSubjects.length; z++) {
                        if (listSubjects[i].studentId == listSubjects[z].studentId && listSubjects[z].subjectCourseId == listSubjects[z].subjectCourseId && listSubjects[z].opportunity == 3) {
                            listSubjects[i].qualifications.dateQualificationThree = listSubjects[z].date_qualification
                            listSubjects[i].qualifications.qualificationThree = listSubjects[z].qualification
                            listSubjects.splice(z, 1)
                        }
                    }
               }
            }else{
                Object.assign(listSubjects[i], {
                    qualifications: {
                        dateQualificationOne: listSubjects[i].date_qualification != "" ? listSubjects[i].date_qualification : null, 
                        qualificationOne: listSubjects[i].qualification != "" ? listSubjects[i].qualification : null,
                        dateQualificationTwo: null,
                        qualificationTwo: null,
                        dateQualificationThree: null,
                        qualificationThree: null,
                    }
                })
            }
        }
    }
    
    return listSubjects
}