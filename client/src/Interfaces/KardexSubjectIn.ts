export interface KardexRatingsIn {
    id: number
    courseId: number
    opportunity: number
    date: string
    qualification: string
    typeOfGroup: string
    team:{
        id: number
        name: string
        semesterId: number
    }
    teacher:{
        id: number | null
        name: string | null
        lastName: string | null
        image: string | null
    },
    period: {
        id: number,
        name: string,
        startDate: string,
        endDate: string,
        typeOfPeriod: string,
    }
} 

export interface KardexSubjectIn {
    studentId: number
    subjectCourseId: number
    subjectId: number
    subjectName: string
    subjectCredits: number
    subjectSemesterId: number
    ratings: KardexRatingsIn[]
}
