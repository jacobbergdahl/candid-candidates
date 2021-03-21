import React from 'react';
import ReactDOM from 'react-dom';
import AddCandidate from './components/AddCandidate';
import Background from './components/Background';
import Footer from './components/Footer';
import Header from './components/Header';
import { RecruitmentOverview } from './components/RecruitmentOverview';
import './normalize.css';
import './site.scss';

ReactDOM.render(
  <React.StrictMode>
    <Background />
    <div className="wrapper-content">
      <header>
        <Header />
      </header>
      <main>
        <RecruitmentOverview />
        <AddCandidate />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);