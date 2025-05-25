import React, { useEffect, useState } from "react";
import defaultSubscribtion from "../data/defaultSubscriptions";

const Platform = () => {
    const [subscribed, setSubscribed] = useState([]);
    const data = JSON.parse(localStorage.getItem('host_sites'));
    if (data === null) {
        localStorage.setItem('host_sites', JSON.stringify(defaultSubscribtion));
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('host_sites'));
        if (data !== null && Object.keys(data).length !== 0) {
            setSubscribed(data);
        }
    }, []);

    const handleClick = (key) => {
        var temp = [...subscribed];
        temp[key].status = !temp[key].status;
        setSubscribed(temp);
        localStorage.setItem('host_sites', JSON.stringify(subscribed));
    }
    return (
        <>
            {Object.keys(subscribed).map((key) => {
                return (
                    <>
                        <div className="item">
                            <img className="platform image" alt="" src={"images/" + subscribed[key].name + ".png"} onError={(e) => { e.target.src = "images/KickStart.png" }} />
                            <p className="site-name">{subscribed[key].name}</p>
                            <input type="checkbox" defaultChecked={subscribed[key].status} name="" id="checkbox" onClick={() => handleClick(key)} />
                        </div>

                    </>
                )
            })}
        </>
    )
}

export default Platform;
