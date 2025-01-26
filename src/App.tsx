import './App.css';
import { useState, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LoadingDisplay from './sub_screen/loading';
import LoginPage from './sub_screen/login';
import MainPage from './sub_screen/main';


export default function App() {
  const [currentPage, setCurrentPage] = useState('loginPage');
  const nodeRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);


  const getPageComponent = (page: string) => {
    switch (page) {
      case 'loginPage':
        return <LoginPage setCurrentPage={setCurrentPage} setisLoading={setisLoading}/>;
      case 'mainPage':
        return <MainPage setCurrentPage={setCurrentPage} setisLoading={setisLoading}/>;
      default:
        return null;
    }
  };

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={currentPage}
        timeout={{ enter: 500, exit: 300 }}
        classNames="fade"
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div>
          <div ref={nodeRef} className="page">
            {getPageComponent(currentPage)}
          </div>
          <div className="Loadingarea">
            <LoadingDisplay isLoading={isLoading} />
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
