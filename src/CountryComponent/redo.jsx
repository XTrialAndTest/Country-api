import { useState, useEffect } from 'react';
import './Country.scss';
const Redo = () => {
  let [allCountries, setAllCountries] = useState([]);
  let [targetCountry, setTargetCountry] = useState([]);
  let [randomizer, setRandomizer] = useState(Math.floor(Math.random() * 250));
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let [answer, setAnswer] = useState('');
  let [correct, setCorrect] = useState([]);
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
  // generates a random index between 0 and 250
  let funcRandomizer = () => {
    setRandomizer(Math.floor(Math.random() * 250));
  };
  let submit = (e) => {
    e.preventDefault();

    setCorrect([...correct, { answer }]);

    setAnswer('');
  };
  console.log(correct);
  console.log(correct, correct.length);

  let mIdea = (props, procorrect) => {
    let ff = procorrect;

    if (props === ff) {
      return (
        <>
          <h1>your answer is Correct</h1>
        </>
      );
    } else if (ff !== props && ff != '') {
      return (
        <>
          <h1>You got it wrong this time</h1>
        </>
      );
    } else if ((answer = '')) {
      return;
    }
    //  else {
    //   return (
    //     <>
    //       <h1>none is greater</h1>
    //     </>
    //   );
    // }
  };

  let change = (e) => {
    let final = e.target.value;
    setAnswer(final);
  };
  // disply affirmation on ui
  //   let displayAffirm = () => {
  //     if (correct == true) {
  //       return (
  //         <>
  //           <h1>your answer is true</h1>
  //         </>
  //       );
  //     } else {
  //       return;
  //       <>
  //         <h1>your answer is false</h1>
  //       </>;
  //     }
  //   };
  return (
    <>
      {/* {mIdea(15 - 9, 6)} */}

      {targetCountry.map((props, index) => {
        return (
          <div className='one-card' key={index}>
            <h1>{props.name.common}</h1>
            <img src={props.flags.png} alt='' />
            <br />
            <form action='' onSubmit={submit}>
              <input type='text ' onChange={change} />
              <button
                onClick={() => {
                  funcRandomizer();
                }}
              >
                Get a country
              </button>
            </form>

            {mIdea(
              props.name.common.toLocaleLowerCase(),
              answer.toLocaleLowerCase()
            )}
            <button
              type='submit'
              onClick={() => {
                mIdea(
                  answer.toLocaleLowerCase(),
                  props.name.common.toLocaleLowerCase()
                );
              }}
            >
              trial
            </button>
          </div>
        );
      })}
    </>
  );
};
export default Redo;
