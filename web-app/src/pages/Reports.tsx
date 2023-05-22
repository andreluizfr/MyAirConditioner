import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function Reports ():JSX.Element {
    return (
        <div className="App">
    
            <header className="App-header">
    
                <span className='Logo'><Link to="/">MyAirConditioner</Link></span>
        
                <NavBar/>
        
            </header>
    
            <main className='App-main'>
    
                <section className='First-section'>

                </section>
    
                <section className='Second-section'>
                    
                </section>
            
            </main>
    
        </div>
    );
}