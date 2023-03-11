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

  useEffect(() => {
    let countryApi = async () => {
      try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let data = await response.json();
        setAllCountries(data);

        // let official = data.map((p) => {
        //   if (p.status == 'officially-assigned') {
        //     return p;
        //   }
        // });
        setTargetCountry([data[randomizer]]);

        // console.log(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    countryApi();
    setIsLoading(false);
  }, [randomizer]);
  let funcRandomizer = (prev) => {
    prev = Math.floor(Math.random() * 250);
    setRandomizer(prev);
    console.log(randomizer);
  };
  console.log(targetCountry);
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
  let checkAnswer = () => {
    if (answer.toLocaleLowerCase() == props.name.common.toLocaleLowerCase()) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };
  let change = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <>
      {/* <button
          type='button'
          onClick={() => {
            checkAnswer;
          }}
        >
          {' '}
          check answer
        </button> */}

      {targetCountry.map((props, index) => {
        return (
          <div className='one-card' key={index}>
            <h1>{props.name.common}</h1>
            <img src={props.flags.png} alt='' />
            <br />
            <form action=''>
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
                  if (
                    answer.toLocaleLowerCase() ==
                    props.name.common.toLocaleLowerCase()
                  ) {
                    e.preventDefault();

                    setAnswer('');
                    setCorrect(true);
                    //   funcRandomizer();
                  } else {
                    setCorrect(false);
                    setAnswer('');
                  }
                }}
              >
                Am i Correct
              </button>
            </form>
            {correct ? (
              <div
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  width: '25%',
                }}
              >
                You got it Correct
              </div>
            ) : (
              <div
                style={{ backgroundColor: 'red', color: 'white', width: '25%' }}
                className='wrong'
              >
                You got it Wrong
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
export default Country;
