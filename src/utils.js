const imgPrefix="https://drive.google.com/uc?export=view&id="

export const getActivities = () => {
    let ja=JSON.parse(process.env.REACT_APP_ACTIVITY_DATA)
    for(let a of ja){
        if (a.tablePicture.includes('/file/d/')){
            a.tablePicture=imgPrefix+a.tablePicture.split('/file/d/')[1].split('/')[0]
        }
        else if(a.tablePicture.includes('?id=')){
            a.tablePicture=imgPrefix+a.tablePicture.split('?id=')[1]   
        }
    }
    return ja
}
export const getParticipants = () => {
    const listKey = ["experiences","hobbies","strengths","links","more"]
    let jp=JSON.parse(process.env.REACT_APP_PARTICIPANT_DATA)
    for(let p of jp){
        if (p.img.includes('/file/d/')){
            p.img=imgPrefix+p.img.split('/file/d/')[1].split('/')[0]
        }
        else if(p.img.includes('?id=')){
            p.img=imgPrefix+p.img.split('?id=')[1]   
        }
        p.hashtags = p.hashtags.split('#')
        for(let k of listKey){
            p[k]=p[k].split('、')
            if(p[k].length===1&&p[k][0]==='') p[k]=['無']
        }
    }
    return jp
}