import dogsBreeds from  '../../generalComponents/dogsBreeds'

export function getAllDogFormFields(vals){
    return (
        [{
            type: 'text',
            field: 'name',
            title: 'Dog Name',
            isMandetory: true,
            labelVisibale: true,
            val:vals?vals.name:undefined
        },
        {
            type: 'radio',
            field: 'gender',
            title: 'Gender',
            labelVisibale: true,
            val:vals?((vals.gender=='male')?0:1):undefined,
            radioProps: [
                { label: 'Male     ', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
        },
        {
            type:'combo',
            field:'breed',
            val:vals?vals.breed:undefined,
            data:dogsBreeds.map(v=>{return {value:v, label:v}}),
            title:"Choose breed"
        },
        {
            type: 'pic',
            field: 'dogImg',
            labelVisibale: false,
            title: 'Upload Image',
        },
        {
            type:'date',
            field:'birthDate',
            val:vals?vals.birthDate:undefined,
            title: 'Birthdate'
        },
        {
            type: 'text',
            field: 'espSerialNumber',
            title: 'ChipId',
            labelVisibale: true,
        
        }]
    )
}