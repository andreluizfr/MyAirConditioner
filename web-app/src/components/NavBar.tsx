import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar(){

    useEffect(()=>{
        const NavItems = document.getElementsByClassName("Nav-item");
    
        Array.from(NavItems).map((NavItem: Element) => {
          return (NavItem as HTMLElement).setAttribute("selected", "false");
        });
        
        const path = window.location.pathname.split("/")[1];
        switch(path){
          case "analytics":
            (NavItems[0] as HTMLElement).setAttribute("selected", "true");
            break;
          case "reports":
            (NavItems[1] as HTMLElement).setAttribute("selected", "true");
            break;
          case "dashboards":
            (NavItems[2] as HTMLElement).setAttribute("selected", "true");
            break;
          default:
            break;
        }
    }, []);

    return (
        <div className='Nav-wrapper'>
          <nav className='Nav-bar'>
            <ul className='Nav-item'><Link to="/analytics">Analytics</Link></ul>
            <ul className='Nav-item'><Link to="/reports">Reports</Link></ul>
            <ul className='Nav-item'><Link to="/dashboards">Dashboards</Link></ul>
          </nav>
        </div>
    )
}