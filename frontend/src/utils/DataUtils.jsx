// import dayjs from "dayjs"

export const isValueEmpty = (stringValue, returnValue) => {
    if (stringValue === "" || stringValue === null || stringValue === undefined){
      return returnValue
    } else{
      return stringValue
    }
}

/**
   export const dateDifference = (date1, date2) => {
     const date = Math.floor(dayjs(date1).diff(date2, 'day', true))
    if (isNaN(date)){
      return "Date is empty"
    }
    if (date <= -1){
      return "Event Ended"
    }
    switch(date) {
      case 0:
        return "Event ongoing!"
      default:
        return `${date} days left!`
    }
  }

 */


export const imageUploadPreview = (theImage, targetFiles, CustomSetFieldValue, UseStateImage) => {
  UseStateImage(URL.createObjectURL(targetFiles))
  CustomSetFieldValue(theImage, targetFiles)
}
