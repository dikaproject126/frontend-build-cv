import React from 'react'
import {Routes, Route} from "react-router";
import HomeView from './pages/HomeView';
import DashboardView from './pages/DashboardView';
import ResumeBuilderView from './pages/ResumeBuilderView';
import MainLayout from './layouts/MainLayout';
import LoginView from './pages/LoginView';
import PreviewView from './pages/PreviewView';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="app" element={<MainLayout />}>
        <Route index element={<DashboardView />} />
        <Route path="builder/:resumeId" element={<ResumeBuilderView />} />
      </Route>
      <Route path="/login" element={<LoginView />} />
      <Route path="/view/:resumeId" element={<PreviewView />} />
    </Routes>
  );
}

export default App