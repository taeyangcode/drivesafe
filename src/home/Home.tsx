import "./Home.css";

import driveSafe from "../../assets/drive-safe-logo.png";

function Home() {
    return (
        <div className="home-background">
            <div className="welcome-text">Welcome to Drive Safe</div>
            <img src={driveSafe} />
            <div className="subtext">Allow location access to continue</div>
        </div>
    );
}

export default Home;
