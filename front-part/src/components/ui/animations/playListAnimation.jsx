import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PlayListAnimation = ({ playing }) => {
    const [classNameCircle, setClassNameCircle] = useState("circles");
    useEffect(() => {
        if (playing === false)
            setClassNameCircle("circlesPause")
        else
            setClassNameCircle("circles")
    }, [playing])
    return (
        <div style={{ display: "flex", marginTop: "2em" }}>
            <div className={classNameCircle} id="circle1"></div>
            <div className={classNameCircle} id="circle2"></div>
            <div className={classNameCircle} id="circle3"></div>
            <div className={classNameCircle} id="circle4"></div>
            <div className={classNameCircle} id="circle5"></div>
            <div className={classNameCircle} id="circle6"></div>
            <div className={classNameCircle} id="circle7"></div>
            <div className={classNameCircle} id="circle8"></div>
            <div className={classNameCircle} id="circle9"></div>
            <div className={classNameCircle} id="circle10"></div>
            <div className={classNameCircle} id="circle11"></div>
            <div className={classNameCircle} id="circle12"></div>
            <div className={classNameCircle} id="circle13"></div>
            <div className={classNameCircle} id="circle14"></div>
            <div className={classNameCircle} id="circle15"></div>
            <div className={classNameCircle} id="circle16"></div>
            <div className={classNameCircle} id="circle17"></div>
            <div className={classNameCircle} id="circle18"></div>
            <div className={classNameCircle} id="circle19"></div>
            <div className={classNameCircle} id="circle20"></div>
            <div className={classNameCircle} id="circle21"></div>
            <div className={classNameCircle} id="circle22"></div>
        </div>
    );
};

PlayListAnimation.propTypes = {
    playing: PropTypes.bool.isRequired
};

export default PlayListAnimation;