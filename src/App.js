import s from './app.module.css';
import { useReducer,useEffect ,useState} from 'react';
import reducer from './reducer';
import { Window, TitleBar, Text ,TextInput,Button} from 'react-desktop/windows';

const init={
  randNum:[],
  wrongAns:[],
}
function App() {
  const [{randNum,wrongAns},dispatch]=useReducer(reducer,init)
  const [start,setStart]=useState(false)

  useEffect(() => {
    let arr=[]
    let solves=[]
    for (let i = 1; i <= 10; i++){
     arr.push(Math.floor(Math.random()*100+1))
    }
    arr.map((item,index,array)=>{
      let rand=arr[Math.floor(Math.random()*10)]
      if(index<3){
        solves.push(`${item}+${rand}=${item+rand}`)
      }
      if(index>2&&index<=5){
        solves.push(`${item}-${rand}=${item-rand}`)
      }
      if(index>5&&index<=7){
        solves.push(`${item}*${rand}=${item*rand}`)
      }
      if(index>7){
        let num=item/rand
        solves.push(`${item}/${rand}=${num.toFixed(2)}`)
      }

    })
    dispatch({
      type:"add",
      data:solves
    })
  }, [])
  return (
    <div>
      <>
      {!start?<>
      
        <Window
        color={"#333"}
        theme={"white"}
        width="100%"
        chrome
        height="500px"
        padding="12px"
      >
        <TitleBar title="Результат" controls/>
        <div className={s.wrap}>
          {randNum.map((el=>{
            let solv=el.split('=')
            return(
                <div className={s.wrap}>
                  <div className={s.solves}>{`${solv[0]} =`}</div>
                  <div className={s.inputs}>
                  <input
                  onBlur={(e)=>{
                    if(e.target.value!=solv[1]){
                    let d=`${solv[0]}=${solv[1]}_${e.target.value}`
                    dispatch({
                      type:"wrong",
                      data: d
                    })
                  }

                  }}
                   className={s.inputs}
                   onChange={(e)=>{
                  }}
                  type="text"/>
      </div>
                </div>
            )

          }))}
        </div>
      </Window>
      <div className={s.btn}><Button onClick={()=>{
        setStart(true)

      }} color="#58c2ff" width="50px" push>Проверить</Button></div>
      </>:<>
      
      <div>
      <Window
        color={"#333"}
        theme={"white"}
        width="100%"
        chrome
        height="600px"
        padding="12px"
      >
        <TitleBar title="Math game" controls/>
        <div className={s.wrap}>
          {wrongAns.map((el=>{
            let solv=el.split('_')
            return(
                <div className={s.wrap}>
                  <div className={s.solves}>{`${solv[0]}`}</div>
                  <div className={s.inputs}>
                  <input
                  id={s.wrong}
                   className={s.inputs}
                   value={solv[1]}
                  type="text"/>
      </div>
                </div>
            )

          }))}
        </div>
      </Window>
      <div className={s.te}>Молодец: вы ответили на {`${100-wrongAns.length*10}%`}</div>
      </div>
      </>}
      </>
    </div>
  );
}

export default App;
