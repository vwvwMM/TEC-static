
export const getActivities = () => {
    let ja=JSON.parse(process.env.REACT_APP_ACTIVITY_DATA)
    return ja
}
export const getParticipants = () => {
    const listKey = ["hashtags","experiences","hobbies","strengths","links","more"]
    let jp=JSON.parse(process.env.REACT_APP_PARTICIPANT_DATA)
    for(let k of listKey){
        for(let p of jp){
            p[k]=p[k].split('、')
        }
    }
    return jp
}