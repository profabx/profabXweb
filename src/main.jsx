import React from 'react';import {createRoot} from 'react-dom/client';import App from './App.jsx';import './styles.css';import './desktop.css';import './company-pages.css';
class ErrorBoundary extends React.Component{state={error:null};static getDerivedStateFromError(error){return {error};}render(){return this.state.error?<main className="fatal"><h1>ProFabX</h1><p>页面加载失败 / Page failed to load</p><pre>{this.state.error.message}</pre><button onClick={()=>location.reload()}>重新加载 / Reload</button></main>:this.props.children;}}
createRoot(document.getElementById('root')).render(<ErrorBoundary><App/></ErrorBoundary>);

import './action-layout.css';

import './home-navigation.css';

import './risk-solutions.css';

import './workflow-collaboration.css';
