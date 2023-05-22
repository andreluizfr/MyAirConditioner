import DotLoader from "react-spinners/DotLoader";

export default function LoadingPage () : JSX.Element {

    return(
        <div className='LoadingPage'>

            <DotLoader
                className='Loader'
                color="black"
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

        </div>
    );

}