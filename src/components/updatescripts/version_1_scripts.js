export function _0_4(data)
{
    let categories = ["required","needs","wants"]

    for(let i in categories)
    {  
        for(let j = 0; j < data[categories[i]].length; j++)
        {
            let newVPM = [0]
            let newEPM = [0] 

            let itter_Date = splitdatetoint(data[categories[i]][j].init)

            for(let k = 0; k < data[categories[i]][j].track.length; k++)
            {
                let curr_Date = splitdatetoint(data[categories[i]][j].track[k].date)
                
                if((curr_Date.month > itter_Date.month) || (curr_Date.year > itter_Date.year))
                {
                    let diff = ((curr_Date.year - itter_Date.year) * 12) + (curr_Date.month - itter_Date.month)  

                    for(;diff > 0; diff--)
                    {
                        newVPM.push(0)
                        newEPM.push(0)
                    }
                }
                
                newVPM[newVPM.length - 1] += data[categories[i]][j].track[k].value
                newEPM[newEPM.length - 1] += 1

                itter_Date = curr_Date
            }

            let totalVPM = 0
            for( let s in newVPM)
            {
                totalVPM += newVPM[s]
            }

            totalVPM = parseFloat(totalVPM.toFixed(2))
            newVPM = newVPM.map(a => parseFloat(a.toFixed(2)));

            console.log(totalVPM)
            console.log(newVPM)
            console.log(newEPM)
            
            data[categories[i]][j].totalspend = totalVPM
            data[categories[i]][j].valuePerMonth = newVPM
            data[categories[i]][j].enteriesPerMonth = newEPM

        }
        
    }

    localStorage.setItem("_DATA_", JSON.stringify(data))
    console.log("runned 1.0.4")

}


function splitdatetoint(date)
{
    let splitdate = date.split('-')
    return {
        day:parseInt(splitdate[0]),
        month:parseInt(splitdate[1]),
        year:parseInt(splitdate[2])
    }
}