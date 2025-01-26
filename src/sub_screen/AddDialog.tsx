import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/addDialog.css';
import Select from 'react-select';



interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  Optionsset: { value: number, label: string }[];
}

type OptionType = {
  value: number;
  label: string;
};



const AddDialog: React.FC<ConfirmDialogProps> = ({ title, message, onConfirm, onCancel, isOpen, Optionsset }) => {
  const [Title, setTitle] = useState('');

  const Datasend = () => {
    console.log(Title);
    onConfirm()
  };

  const [insertStart, setInsertStart] = useState<OptionType | null>(null);
  const [insertEnd, setInsertEnd] = useState<OptionType | null>(null);


  const handleStartChange = (e: OptionType | null) => {
    if (e) setInsertStart(e);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="Dialog-Area">
        <div className="Dialog-top">
          <input
            value={Title}
            placeholder='タイトル入力'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="Time-set">
          <h3>時間：</h3>
          <Select
            className="insert_Select"
            options={Optionsset}
            value={insertStart}
            placeholder="開始時間"
            onChange={handleStartChange}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
          />
          <div> ー </div>
          <Select
            className="insert_Select"
            options={Optionsset}
            value={insertEnd}
            placeholder="終了時間"
            onChange={(e) => setInsertEnd(e)}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
          />
        </div>
        <div className="Dialig-main">
        </div>
        <div className="Dialog-fotter">
          <a className="buttonUnderlineSt" type="button" onClick={Datasend}>
            追加
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}


export default AddDialog;