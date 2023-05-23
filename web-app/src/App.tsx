import './styles.css';
import React from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));
const ReportsPage = React.lazy(() => import('./pages/ReportsPage'));
const DashboardsPage = React.lazy(() => import('./pages/DashboardsPage'));

export default function App(): JSX.Element {

  return (
    <React.Suspense fallback={<LoadingPage/>}>
				<RouterProvider router={
					createBrowserRouter([
            			{
							path: "/",
							element: <HomePage/>,
						},
						{
							path: "/analytics",
							element: <AnalyticsPage/>,
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