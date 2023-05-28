import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import OperatingHistoryList from '../queries/OperatingHistory';
import { OperatingHistory } from '../types/OperatingHistory';

import NavBar from '../components/NavBar';
import DateRangePickerWithShortcuts from '../components/DateRangePickerWithShortcuts';
import { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import DotLoader from "react-spinners/DotLoader";


export default function AnalyticsPage(): JSX.Element {

  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [operatingHistoryData, setOperatingHistoryData] = useState<OperatingHistory[]>();
  const [analyticsState, analyticsDispatch] = useReducer(anayliticsReducer, {value: null});

  const OperatingHistoryQuery = OperatingHistoryList(dateRange);

  useEffect(()=>{
    OperatingHistoryQuery.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);
  
 useEffect(()=>{
  if(OperatingHistoryQuery.data) setOperatingHistoryData(OperatingHistoryQuery.data.operatingHistory);
 }, [OperatingHistoryQuery.data]);

  useEffect(()=>{
    analyticsDispatch({type: "setState", payload: operatingHistoryData});
  }, [operatingHistoryData]);

  return (
    <div className="App">

      <header className="App-header">

        <span className='Logo'><Link to="/">MyAirConditioner</Link></span>

        <NavBar/>

      </header>

      <main className='App-main'>

        <section className='First-section'>
          <DateRangePickerWithShortcuts setValue={setDateRange}/>
        </section>

        <section className='Second-section'>
          {OperatingHistoryQuery.isFetching? 
            <DotLoader
                className='Loader'
                color="black"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            :
            OperatingHistoryQuery.isError && <p>{OperatingHistoryQuery.error?.message}</p>
          }
          {analyticsState.value &&
            <table className='Analytics-table'>
              <thead className='Table-header'>
                <tr className='Table-row'>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody className='Table-body'>
                <tr className='Table-row Table-row-link'>
                  <td>Amount of days with operation history in this range</td>
                  <td>{analyticsState.value.numberOfDaysAnalyzed}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  <td>Days with operation history in this range</td>
                  <td>{JSON.stringify(analyticsState.value.daysAnalyzed)}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  <td>Amount of hours turned on</td>
                  <td>{analyticsState.value.hoursOn}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  {(analyticsState.value.numberOfDaysAnalyzed>1)? 
                    <td>Money spend on these days</td> 
                    : 
                    <td>Money spend on this day</td>
                  }
                  <td style={{color: "#FF0000"}}>- R${analyticsState.value.spendMoney.toFixed(2)}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  {(analyticsState.value.numberOfDaysAnalyzed>1)? 
                    <td>Money that would be spent on these days</td> 
                    : 
                    <td>Money that would be spent on this day</td>
                  }
                  <td>R${analyticsState.value.costAllTimeOn.toFixed(2)}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  {(analyticsState.value.numberOfDaysAnalyzed>1)? 
                    <td>Money saved on these days</td>
                    : 
                    <td>Money saved on this day</td>
                  }
                  <td style={{color: "#00FF00"}}>+ R${analyticsState.value.savedMoney.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          }
        </section>
        
      </main>

    </div>
  );
}

interface analyticsState {
  value: {
    numberOfDaysAnalyzed: number,
    daysAnalyzed: number[],
    hoursOn: number,
    spendMoney: number,
    costAllTimeOn: number,
    savedMoney: number
  } | null
}

interface analysticsAction {
  type: 'setState',
  payload?: OperatingHistory[]
}

function anayliticsReducer(state: analyticsState | null, action: analysticsAction){
  
  if(action.payload && action.payload.length>0){

    let NumberOfDaysToBeAnalyzed = action.payload.length;
    let DaysToBeAnalyzed = [] as number[];
    let totalHoursOn = 0;
    
    action.payload.forEach(dailyHistory=>{
      const hoursOn = dailyHistory.history.filter(isOn=>isOn===true).length;
      totalHoursOn += hoursOn;
      DaysToBeAnalyzed.push(dailyHistory.day);
    });

    const kWh = 0.76;
    const energyTax = 0.6;
    const spendMoney = totalHoursOn * kWh * energyTax;
    const costAllTimeOn = NumberOfDaysToBeAnalyzed * 24 * kWh * energyTax;
    const savedMoney = costAllTimeOn - spendMoney;

    return {value: {
      numberOfDaysAnalyzed: NumberOfDaysToBeAnalyzed,
      daysAnalyzed: DaysToBeAnalyzed,
      hoursOn: totalHoursOn,
      spendMoney: spendMoney,
      costAllTimeOn: costAllTimeOn,
      savedMoney: savedMoney
    }};

  } else return {value: null}
}