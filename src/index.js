document.addEventListener('DOMContentLoaded', ()=>{
const dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')


    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        
        for(let i=0; i<data.length; i++){
            const pupSpan = document.createElement('span')
            const pupName = data[i].name;
            pupSpan.append(pupName)
            dogBar.append(pupSpan)
            // console.log(pupName)

            pupSpan.addEventListener('click', ()=>{
                dogInfo.innerHTML = ''
                const dogImg = document.createElement('img');
                const btn = document.createElement('button');
                const h2 = document.createElement('h2');
                h2.innerHTML = pupName
                dogImg.src = data[i].image
                let isGoodDog = data[i].isGoodDog
                btn.textContent = isGoodDog ?'Good Dog!': 'Bad Dog!'
                dogInfo.append(dogImg)
                dogInfo.append(h2)
                dogInfo.append(btn)
                
                btn.addEventListener('click', ()=>{
                    isGoodDog = !isGoodDog
                    let newValue = isGoodDog
                btn.textContent = isGoodDog ?'Good Dog!': 'Bad Dog!';
                console.log(`http://localhost:3000/pups/${data[i].id}`)
                fetch(`http://localhost:3000/pups/${data[i].id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: newValue
                    })
                }
                )
                .then(res => res.json())
        
            })
            })
        }

    })

})
