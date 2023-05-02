
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
            if(p[k].length===1&&p[k][0]==='') p[k]=['無']
        }
    }
    for(let p of jp){
        if (p.img.includes('/file/d/')){
            p.img=p.img.split('/file/d/')[1].split('/')[0]
        }
        else{
            p.img=p.img.split('?id=')[1]   
        }
    }
    return jp
}