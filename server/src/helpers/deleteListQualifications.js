import { poolSiia } from "../dB.js";

export default async function deleteListQualifications(listCourses){
    try {
        const connection = await poolSiia.getConnection()
        await connection.beginTransaction()
        for (let i = 0; i < listCourses.length; i++) {
            const coruse = listCourses[i]
            await connection.query("DELETE FROM qualifications WHERE subject_studied_id = ?", [coruse.id])
        }

        await connection.commit()
        connection.release()
        return true
    } catch (e) {
        await connection.rollback();
        connection.release();
        return false
    }
}