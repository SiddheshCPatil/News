import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
// import LoadingBar from 'react-top-loading-bar'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const App = (props) => {

    const [progress, setProgress] = useState(0);

    const pageSize = 15;

    // state = {
    //     progress: 0
    // }
    setProgress = (progress) => {
        setProgress(progress);
    }
    return (
        <div>
            {/* <News setProgress={setProgress} pageSize={5} country={'in'} category={'general'} /> */}
            <Router>
                <Navbar />
                {/* <LoadingBar
                        color='#f11946'
                        progress={this.state.progress}
                    /> */}
                <Routes>
                    <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={'pageSize'} country={'in'} category={'general'} />} />
                    <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={'pageSize'} country={'in'} category={'business'} />} />
                    <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={'pageSize'} country={'in'} category={'entertainment'} />} />
                    <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={'pageSize'} country={'in'} category={'health'} />} />
                    <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={'pageSize'} country={'in'} category={'science'} />} />
                    <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={'pageSize'} country={'in'} category={'sports'} />} />
                    <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={'pageSize'} country={'in'} category={'technology'} />} />
                </Routes>
            </Router>
        </div>

    );
}

export default App;