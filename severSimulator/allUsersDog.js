import dogExample1 from './dog1.jpg'
import dogExample2 from './dog2.jpg'
import dogExample3 from './motek.jpg'

export function getAllUserDogs(){
    return(
        [{dogImg:dogExample2,dogName:"HoMo", lastMealTime:"12:23",nextMealTime: "13:44"},
         {dogImg:dogExample3,dogName:"Mustapha", lastMealTime:"10:13",nextMealTime: "12:34"}
    ]
    )
}
