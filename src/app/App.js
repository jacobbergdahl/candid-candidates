import React from 'react';
import { useDispatch } from 'react-redux';
import BackToTopButton from '../common/BackToTopButton';
import SearchBar from '../common/SearchBar';
import CandidateAdd from '../features/candidate/CandidateAdd';
import { CandidateList } from '../features/candidate/CandidateList';
import { resetCandidates } from '../features/candidate/candidateSlice';

const App = () => {
  return(
    <div className="App">
      <Background />
      <div className="wrapper-content">
        <header id="header">
          <Header />
        </header>
        <main>
          <div className="wrapper-recruitment-overview">
            <CandidateAdd />
            <SearchBar />
            <CandidateList />
            <DeveloperOptions />
          </div>
          <BackToTopButton />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

const Header = () => {
  return(
    <div className="wrapper-header">
      <div className="wrapper-inner-header">
        <h1>Candid Candidates</h1>
        <p className="support-header">Communicating creative, clever, caring candidates clearly</p>
      </div>
    </div>
  );
}

const Footer = () => {
  return(
    <div className="wrapper-footer">
      <span>You might also be interested in these sites</span>
      <a href="https://jacobbergdahl.com" target="_blank" rel="noreferrer"><button type="button" className="btn rounded">https://jacobbergdahl.com (Svelte)</button></a>
      <a href="https://thisisrealaibook.com/" target="_blank" rel="noreferrer"><button type="button" className="btn rounded margin-top">https://thisisrealaibook.com (Gatsby)</button></a>
      <a href="https://thisisrealai.com/" target="_blank" rel="noreferrer"><button type="button" className="btn rounded margin-top">https://thisisrealai.com (.NET Razor)</button></a>
    </div>
  )
}

const Background = () => {
  return <div className="background"></div>
}

const DeveloperOptions = () => {
  const dispatch = useDispatch();
  return(
    <div className="wrapper-developer-options">
      <a href="https://github.com/jacobbergdahl/candid-candidates" target="_blank" rel="noreferrer"><button type="button" className="btn btn-developer">View on GitHub</button></a>
      <button type="button" className="btn btn-developer" onClick={() => dispatch(resetCandidates())}>Reset data</button>
    </div>
  );
}

export default App;