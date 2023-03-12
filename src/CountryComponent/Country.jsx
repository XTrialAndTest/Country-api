import { useState, useEffect } from 'react';
import './Country.scss';
const Country = () => {
  let [allCountries, setAllCountries] = useState([]);
  let [targetCountry, setTargetCountry] = useState([]);
  let [randomizer, setRandomizer] = useState(Math.floor(Math.random() * 250));
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let [answer, setAnswer] = useState('');
  let [correct, setCorrect] = useState();
  let [logic, setLogic] = useState([{ correct: 'correct', wrong: 'wrong' }]);

  useEffect(() => {
    let countryApi = async () => {
      try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let data = await response.json();
        setAllCountries(data);
        // this extracts countries whose status is 'oficially-assigned'
        // let official = data.map((p) => {
        //   if (p.status == 'officially-assigned') {
        //     return p;
        //   }
        // });

        // set data with index as randomizer
        setTargetCountry([data[randomizer]]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    countryApi();
    setIsLoading(false);
  }, [randomizer]);

  // generates a random index between 0 and 250
  let funcRandomizer = (prev) => {
    prev = Math.floor(Math.random() * 250);
    setRandomizer(prev);
  };
  // checks if error is felt
  if (isError) {
    return (
      <>
        <h1>THERE IS SOME ERROR!!!</h1>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        {}
        <h1>LOADING...</h1>
      </>
    );
  }
  //   let Submit = (e) => {
  //     e.preventDefault();
  //     console.log(answer);

  //     setAnswer('');
  //   };
  let checkAnswer = (props) => {
    if (answer.toLocaleLowerCase() == props.name.common.toLocaleLowerCase()) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };
  let change = (e) => {
    setAnswer(e.target.value);
  };
  // disply affirmation on ui
  let displayAffirm = () => {
    if (correct == true) {
      return (
        <>
          <h1>your answer is true</h1>
        </>
      );
    } else {
      return;
      <>
        <h1>your answer is false</h1>
      </>;
    }
  };
  return (
    <>
      {targetCountry.map((props, index) => {
        return (
          <div className='one-card' key={index}>
            <h1>{props.name.common}</h1>
            <img src={props.flags.png} alt='' />
            <br />
            <form
              action=''
              onSubmit={(e) => {
                e.preventDefault();
                setAnswer('');
              }}
            >
              <input type='text ' value={answer} onChange={change} />
              <button
                onClick={() => {
                  funcRandomizer();
                }}
              >
                Get a country
              </button>
              <button
                type='submit'
                onClick={(e) => {
                  checkAnswer(props);
                  // displayAffirm;
                  // console.log(displayAffirm());
                  //   if (
                  //     answer.toLocaleLowerCase() ==
                  //     props.name.common.toLocaleLowerCase()
                  //   ) {
                  //     e.preventDefault();

                  //     setAnswer('');
                  //     setCorrect(true);
                  //   } else {
                  //     setAnswer('');
                  //     setCorrect(false);
                  //   }
                  // }
                }}
              >
                Am i Correct
              </button>
              {displayAffirm()}
            </form>
            {
              correct ? (
                setTimeout(() => {
                  return (
                    <div
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        width: '25%',
                      }}
                    >
                      You got it Correct
                    </div>
                  );
                }, 1500)
              ) : (
                <div></div>
              )
              //  : (
              //   <div
              //     style={{ backgroundColor: 'red', color: 'white', width: '25%' }}
              //     className='wrong'
              //   >
              //     You got it Wrong
              //   </div>
              // )}
            }
          </div>
        );
      })}
    </>
  );
};
export default Country;
