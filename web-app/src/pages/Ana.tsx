import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import { OperatingHistory } from '../types/OperatingHistory';

import DateRangePickerWithShortcuts from '../components/DateRangePickerWithShortcuts';
import { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

export default function Analytics(): JSX.Element {

  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

  const [data, setData] = useState<OperatingHistory[]>();

  const [analytics, setAnalytics] = useState<{
    numberOfDaysAnalyzed: number,
    daysAnalyzed: number[],
    hoursOn: number,
    spendMoney: number
    costAllTimeOn: number
    savedMoney: number
  } | null>(null);

  useEffect(()=>{

    if(dateRange && dateRange[0] && dateRange[1]){
      axios.get(
        `/history/getHistory?day1=${dateRange[0].get("date")}&month1=${dateRange[0].get("month")+1}&year1=${dateRange[0].get("year")}&day2=${dateRange[1].get("date")}&month2=${dateRange[1].get("month")+1}&year2=${dateRange[1].get("year")}`
      ).then(response=>{
        console.log(response.data.message);
        setData(response.data.data as OperatingHistory[]);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  useEffect(()=>{

    if(data && data.length>0){

      let NumberOfDaysToBeAnalyzed = data.length;
      let DaysToBeAnalyzed = [] as number[];
      let totalHoursOn = 0;
      
      data.forEach(dailyHistory=>{
        const hoursOn = dailyHistory.history.filter(isOn=>isOn===true).length;
        totalHoursOn += hoursOn;
        DaysToBeAnalyzed.push(dailyHistory.day);
      });

      const kWh = 0.76;
      const energyTax = 0.6;
      const spendMoney = totalHoursOn * kWh * energyTax;
      const costAllTimeOn = NumberOfDaysToBeAnalyzed * 24 * kWh * energyTax;
      const savedMoney = costAllTimeOn - spendMoney;

      setAnalytics({
        numberOfDaysAnalyzed: NumberOfDaysToBeAnalyzed,
        daysAnalyzed: DaysToBeAnalyzed,
        hoursOn: totalHoursOn,
        spendMoney: spendMoney,
        costAllTimeOn: costAllTimeOn,
        savedMoney: savedMoney
      });

    }

  }, [data]);

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
          {analytics?
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
                  <td>{analytics.numberOfDaysAnalyzed}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  <td>Days with operation history in this range</td>
                  <td>{JSON.stringify(analytics.daysAnalyzed)}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  <td>Amount of hours turned on</td>
                  <td>{analytics.hoursOn}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  {(analytics.numberOfDaysAnalyzed>1)? 
                    <td>Money spend on these days</td> 
                    : 
                    <td>Money spend on this day</td>
                  }
                  <td style={{color: "#FF0000"}}>- R${analytics.spendMoney.toFixed(2)}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  {(analytics.numberOfDaysAnalyzed>1)? 
                    <td>Money that would be spent on these days</td> 
                    : 
                    <td>Money that would be spent on this day</td>
                  }
                  <td>R${analytics.costAllTimeOn.toFixed(2)}</td>
                </tr>
                <tr className='Table-row Table-row-link'>
                  {(analytics.numberOfDaysAnalyzed>1)? 
                    <td>Money saved on these days</td>
                    : 
                    <td>Money saved on this day</td>
                  }
                  <td style={{color: "#00FF00"}}>+ R${analytics.savedMoney.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            :
            null
          }
        </section>
        
      </main>

    </div>
  );
}