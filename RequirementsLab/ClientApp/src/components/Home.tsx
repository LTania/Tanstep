import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div className="intro" id="intro">
    <div className="container">
      <div className="intro__inner">
        <h2 className="intro__suptitle">Віртуальна лабораторія</h2>
        <h1 className="intro__title">Ласкаво просимо</h1>
        <a className="btn" href="/authorization">Авторизуватись</a>
      </div>
    </div>
  </div>
);

export default connect()(Home);
