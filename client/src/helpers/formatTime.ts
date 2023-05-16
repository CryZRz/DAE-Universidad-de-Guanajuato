import * as moment from 'moment';
moment.locale("es")

export function formatTimeXTime(date : string){
    const dateFormat = moment(date).fromNow()

    return dateFormat
}

export function formatTimeDate(date : string){
    const dateFormat = moment(date).format("MM/DD/YYYY")

    return dateFormat
}

export function validateAfterDate(date : string){
    const fechaUser = moment(date, "YYYY-MM-DD")
    const currentDate = moment()

    if (fechaUser.isAfter(currentDate)) {
        return true
    }

    return false
}

export function formatDateForInput(date: string){
    const dateFormat = moment(date).format("YYYY/MM/DD")

    return dateFormat
}

export function validateHourInput(inputValue: string) {
    const parsedTime = moment(inputValue, 'HH:mm');
    
    if (parsedTime.minute() !== 0) {
      return false;
    }
  
    return true;
  }