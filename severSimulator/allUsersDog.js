import dogExample1 from './dog1.jpg'
import dogExample2 from './dog2.jpg'
import dogExample3 from './motek.jpg'

export function getAllUserDogs(){
    return(
        [{dogImg:dogExample1,dogName:"Nheorai", lastMealTime:"12:33",nextMealTime: "12:42"},
         {dogImg:dogExample2,dogName:"HoMo", lastMealTime:"12:23",nextMealTime: "13:44"},
         {dogImg:dogExample3,dogName:"Mustapha", lastMealTime:"10:13",nextMealTime: "12:34"}
    ]
    )
}

export function getAddDogFields(){
    return([
        {type:"text", title:"dog name"},
        {type:"radio", title:"gender",radioProps: [{label: 'male     ', value: 0 },{label: 'female', value: 1 }]},
        {type:'combo', title:"age", data:[{label:"1",value:1}, {label:"2",value:2}, {label:"3",value:3}, {label:"4",value:4}]}
    
      ])
}