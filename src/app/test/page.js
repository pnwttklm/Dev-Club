export default function Page(){
    return(
        <>
            <h1>hello world</h1>
            {array.map((prop, index) => (
                <div key={index}>
                    <h1>{prop.name}</h1>
                    <h1>{prop.id}</h1>
                </div>
                ))}
        </>
    )
}

const array = [
    {
        name: 'poon',
        id: '6588048'
    },
    {
        name: 'aa',
        id: '059405940'
    },
]
const user = [
    {
        name: 'Hedy Lamarr',
        imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
        typeNo: 1
    },
    {
        name: 'oeop rerl',
        imageUrl: '',
        typeNo: 1
    },
]

const typeCus = [
    {
        type: 0,
        name: 'Good User',
        pricing: 500
    },
    {
        type: 1,
        name: 'Average User',
        pricing: 1000
    },
    {
        type: 2,
        name: 'Bad User',
        pricing: 1500
    },
]