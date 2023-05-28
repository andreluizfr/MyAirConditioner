import './styles.css';
import React, { Profiler } from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));
const ReportsPage = React.lazy(() => import('./pages/ReportsPage'));
const DashboardsPage = React.lazy(() => import('./pages/DashboardsPage'));

function onRender(id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: Number) {
	console.log(`id: ${id}, phase: ${phase}, actualDuration: ${actualDuration.toFixed(2)}ms, baseDuration: ${baseDuration.toFixed(2)}ms, increasedPerformance: ${((baseDuration/actualDuration)*100).toFixed(2)}%`);
}

export default function App(): JSX.Element {

  return (
    <React.Suspense fallback={<LoadingPage/>}>
		<RouterProvider router={
			createBrowserRouter([
				{
					path: "/",
					element: <Profiler id="HomePage" onRender={onRender}><HomePage/></Profiler>,
				},
				{
					path: "/analytics",
					element: <Profiler id="AnalyticsPage" onRender={onRender}><AnalyticsPage/></Profiler>,
				},
				{
					path: "/reports",
					element: <ReportsPage/>,
				},
				{
					path: "/dashboards",
					element: <DashboardsPage/>,
				},
			])
		}/> 
	</React.Suspense>
  );
}