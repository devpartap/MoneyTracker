const markup = {
    "base":{
        "length":1,
        0:{
            "name":"Rent",
            "value":10000,
            "spantill":[1699488000000,1701993600000],
            "init":"20-11-2023"
        }
    },
    "required":{
        "length":2,
        0:{
            "name":"Travel",
            "value":71,
            "totalspend":232,
            "valuePerMonth":[232],
            "enteriesPerMonth":[3],
            "spantill":[1700438400000,1703980800000],
            "init":"20-11-2023",
            "excludes":["6","0"],
            "track":[
                { 
                    "date":"21-11-2023",
                    "value":71   
                },
                { 
                    "date":"22-11-2023",
                    "value":90   
                },
                { 
                    "date":"24-11-2023",
                    "value":71   
                },

            ]
        },
        1:{
            "name":"Food",
            "value":140,
            "totalspend":1036,
            "valuePerMonth":[1036],
            "enteriesPerMonth":[8],
            "spantill":[1700438400000,1703980800000],
            "init":"20-11-2023",
            "excludes":[],
            "track":[
                {
                    "date":"20-11-2023",
                    "value":136
                },
                {
                    "date":"21-11-2023",
                    "value":155
                },
                {
                    "date":"22-11-2023",
                    "value":160
                },
                {
                    "date":"23-11-2023",
                    "value":110
                },
                {
                    "date":"24-11-2023",
                    "value":135
                },
                {
                    "date":"25-11-2023",
                    "value":160
                },
                {
                    "date":"26-11-2023",
                    "value":80
                },
                {
                    "date":"27-11-2023",
                    "value":100
                }
            ]
        }
    },
    "needs":{
        "length":2,
        0:{
            "name":"To People",
            "totalspend":120,
            "init":"23-11-2023",
            "valuePerMonth":[120],
            "enteriesPerMonth":[2],
            "track":[
                {
                    "name":"Pihu",
                    "value":20,
                    "date":"23-11-2023",
                    "mode":"UPI"
                },
                {
                    "name":"Pihu",
                    "value":100,
                    "date":"24-11-2023",
                    "mode":"UPI"
                },
            ]
        },
        1:{
            "name":"Coffee",
            "totalspend":50,
            "init":"27-11-2023",
            "valuePerMonth":[50],
            "enteriesPerMonth":[1],
            "track":[
                {
                    "name":"Nescafe",
                    "value":50,
                    "date":"27-11-2023",
                    "mode":"UPI"
                },
            ]
        }
    },
    "wants":{
        "length":3,
        0:{
            "name":"Online Subscription",
            "totalspend":59,
            "init":"20-11-2023",
            "valuePerMonth":[59],
            "enteriesPerMonth":[1],
            "track":[
                {
                    "name":"Spotify Premimum",
                    "value":59,
                    "date":"20-11-2023",
                    "mode":"UPI"
                },
            ]
        },
        1:{
            "name":"Events Venues",
            "totalspend":80,
            "init":"22-11-2023",
            "valuePerMonth":[80],
            "enteriesPerMonth":[1],
            "track":[
                {
                    "name":"IITI 2023 Delhi",
                    "value":80,
                    "date":"22-11-2023",
                    "mode":"UPI"
                },
            ]
        },
        2:{
            "name":"Fast Food",
            "totalspend":332,
            "init":"23-11-2023",
            "valuePerMonth":[332],
            "enteriesPerMonth":[3],
            "track":[
                {
                    "name":"Bpine Italian Pizza",
                    "value":100,
                    "date":"23-11-2023",
                    "mode":"UPI"
                },
                {
                    "name":"dominos Marg. R",
                    "value":212,
                    "date":"26-11-2023",
                    "mode":"UPI"                    
                },
                {
                    "name":"pepsi",
                    "value":20,
                    "date":"26-11-2023",
                    "mode":"UPI"                    
                }
            ]
        }
    },
    "history":{
        "day":[
            {
                "date":"20-11-2023",
                "spend":[195,136,0,59] 
            },
            {
                "date":"21-11-2023",
                "spend":[226,226,0,0]  
            },
            {
                "date":"22-11-2023",
                "spend":[330,250,0,80] 
            },
            {
                "date":"23-11-2023",
                "spend":[230,110,20,100] 
            },
            {
                "date":"24-11-2023",
                "spend":[206,206,0,0] 
            },
            {
                "date":"25-11-2023",
                "spend":[160,160,0,0] 
            },
            {
                "date":"26-11-2023",
                "spend":[312,80,0,232] 
            },
            {
                "date":"27-11-2023",
                "spend":[120,100,20,0] 
            }
        ]
    }
}

export default markup