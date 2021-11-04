import React, {useState, useEffect} from 'react';

//styles
import { Grid, Wrapper, Dashboard } from './components/App.styles';

//components
import Card from './components/Card';

//card list
import CardList from './components/CardList';

let totalSeconds = 0;
let interval;

function App() {
  const [cardClickCounter, setCardClickCounter] = useState(0);
  const [clicked, setClicked] = useState('');
  const [solved, setSolved] = useState([]);
  const [started, setStarted] = useState(false);
  const [finish, setFinish] = useState(false);
  const [storage, setStorage] = useState(localStorage);

// TIMER --------------------------------------------------
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  function setTime() {
      totalSeconds += 1;
      setSeconds(pad(totalSeconds%60));
      setMinutes(pad(parseInt(totalSeconds/60)));
  };
  function pad(val) {
      var valString = val + "";
      if(valString.length < 2) {
          return "0" + valString;
      }
      else {
          return valString;
      }
  };
 // TIMER -------------------------------------------------

  function cardClick(e) {
    if (!started) {return} 

    let checkClick = e.target.closest('.CLICK');

    if ((cardClickCounter == 1 && clicked.id == checkClick.id) || solved.includes(checkClick.id)) {
      return
    };

    let icon = e.target.getElementsByClassName('icon')[0]
    icon != undefined && (icon.style.display = 'block');
    

    if (cardClickCounter == 1 && checkClick.classList[2] == clicked.classList[2] && checkClick != clicked) {
      setSolved([...solved, checkClick.id, clicked.id])
      setClicked('');
      setCardClickCounter(0);
      return
    }
    else if (cardClickCounter == 1) {
      setTimeout(() => {
      clicked.children[0].style.display = 'none';
      icon.style.display = 'none';
      },500);
    }
    
    setClicked(e.target.closest('.CLICK'));
    setCardClickCounter(cardClickCounter + 1);
  };

  function Start() {
    let hide = document.getElementsByClassName('started');
    hide[0].style.display = 'none';
    hide[1].style.display = 'none';

    interval = setInterval(setTime, 1000);
    var parent = document.querySelector('#grid');
    for (var i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    };
    setStarted(true);
  };

  useEffect(() => {
    if (cardClickCounter == 2) {
      setCardClickCounter(0);
    }
  }, [cardClickCounter]);

  useEffect(() => {
    if (solved.length == 16) {
      setFinish(true);
      clearInterval(interval);
      localStorage.setItem(`M${localStorage.length}${Math.random()}`, `${minutes}:${seconds}`);
      setStorage({...localStorage});
    };
  }, [solved]);

  return (
    <Wrapper>
      <p className='finished'>{minutes}:{seconds}</p>
      <button className='started btn-start' onClick={() => Start()} >Start!</button>
      <p className='started'>Find the matching cards.</p>
      {finish ? 
        <>
          <h1 className='finished btn-start'>YOU WIN!</h1> 
          <button onClick={() => window.location.reload()}>Play Again?</button>
        </> :
      <Grid id='grid'>
        {CardList.map(card => (
          <Card click={cardClick} ID={card.id} key={card.id} classN={card.class}>{card.icon}</Card>
        ))}
      </Grid>
      }
      <Dashboard>
        <h1>Results Dashboard:</h1>
        {Object.keys(storage).map(key => (
          key[0] == 'M' && <div className='result'>{storage[key]}</div>
        ))}
      </Dashboard>
    </Wrapper>
  );
}

export default App;