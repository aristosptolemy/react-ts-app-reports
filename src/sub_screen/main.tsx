import React, { useState, useEffect, ChangeEvent } from 'react';
import Select from 'react-select';
import '../css/login.css';
import  '../css/main.css';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ja } from 'date-fns/locale';


interface LoginInputs {
  username: string;
  password: string;
}

interface SettingProps {
  setCurrentPage: (page: string) => void;
  setisLoading: (value: boolean) => void;
}

const SelectTimes: OptionType[] = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${i}:00`,
}));

type OptionType = {
  value: number;
  label: string;
};

type Report = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
};

const reportsData: Report[] = [
  {
    id: '1',
    title: 'テスト',
    startTime: '10:00',
    endTime: '13:00',
    description: 'テストを行いました。',
  },
];



const START_HOUR = 7;
const END_HOUR = 17;

export default function MainPage({ setCurrentPage, setisLoading }: SettingProps) {
  // const [startTime, setStartTime] = useState<OptionType | null>(null);
  // const [endTime, setEndTime] = useState<OptionType | null>(null);
  const [Times, setTimes] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [reports, setReports] = useState<Report[]>(reportsData);

  const [startTime, setStartTime] = useState<OptionType>({ value: START_HOUR, label: `${START_HOUR}:00` });
  const [endTime, setEndTime] = useState<OptionType>({ value: END_HOUR, label: `${END_HOUR}:00` });

  const handleChange = (date: Date | null) => {
    setSelectedDate(date)
  }
const handleStartChange = (e: OptionType | null) => {
  if (e) {
    setStartTime(e); // `e`が`null`でない場合に状態を更新
    localStorage.setItem('START_HOUR', e.value.toString()); // `e.value`にアクセス
  }
};

const handleEndChange = (e: OptionType | null) => {
  if (e) {
    setEndTime(e); // `e`が`null`でない場合に状態を更新
    localStorage.setItem('END_HOUR', e.value.toString()); // `e.value`にアクセス
  }
};

  const calculatePosition = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    const startMinutes = startTime?.value ? startTime.value * 60 : START_HOUR * 60;
    const totalMinutes = (hour * 60 + minute) - startMinutes; // 開始時刻をタイムライン開始からの分数で計算
    const totalTimelineMinutes = (Times) * 60;    // タイムライン全体の分数
  
    // 開始位置をタイムライン全体の高さに基づいて計算
    return (totalMinutes / totalTimelineMinutes) * 100;
  };
  

  const calculateHeight = (start: string, end: string): number => {
    const startMins = parseTimeToMinutes(start); // 開始時刻を分単位に変換
    const endMins = parseTimeToMinutes(end) + 2;     // 終了時刻を分単位に変換
    const totalTimelineMinutes = (Times) * 60;
    return ((endMins - startMins) / totalTimelineMinutes) * 100;
  };


  const parseTimeToMinutes = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  const calcTimeSlotHeight = (start: number, end: number) => {
    return (end - start + 1);
  }

  const AddInsert = () => {}

  useEffect(() => {
    const START = Number(localStorage.getItem('START_HOUR') ?? START_HOUR)
    const END = Number(localStorage.getItem('END_HOUR') ?? END_HOUR)

    setStartTime(SelectTimes[START])
    setEndTime(SelectTimes[END])
  },[])

  useEffect(() => {
    if (startTime && endTime) {
      setTimes(calcTimeSlotHeight(startTime.value, endTime.value));
    }
  }, [startTime, endTime]);


  return (
    <div className="main-window">
      <div className="main-area">
        <div className="main-top">
          <a className="buttonUnderlineSt" type="button" onClick={AddInsert}>
            追加
          </a>
          <Select
            options={SelectTimes}
            value={startTime}
            placeholder="表示開始時間"
            onChange={handleStartChange}
          />
          <div>
            ～
          </div>
          <Select
            options={SelectTimes}
            value={endTime}
            placeholder="表示終了時間"
            onChange={handleEndChange}
          />
          <DatePicker
            className='DateSelect'
            dateFormat="yyyy/MM/dd"
            selected={selectedDate}
            onChange={handleChange}
            locale={ja}
            portalId="root"
          />
        </div>
        <div className="timeline">
          {Array.from({ length: Times}).map((_, i) => (
            <div
              key={i}
              className="time-slot"
              style={{
                height: `calc(100% / ${Times})`,
                lineHeight: `calc(100% / ${Times})`,
              }}
            >
              <div className="time-label">{startTime.value + i}:00</div>
            </div>
          ))}
          {reports.map((report) => (
            <div
              key={report.id}
              className="task-block"
              style={{
                top: `calc(${calculatePosition(report.startTime)}%)`,
                height: `${calculateHeight(report.startTime, report.endTime)}%`,
              }}
            >
              <strong>{report.title}</strong>
              <div>{report.startTime}〜{report.endTime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
