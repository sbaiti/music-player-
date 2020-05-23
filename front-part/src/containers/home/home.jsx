import React, { Fragment, useState } from 'react';
import ChooseForm from "../../components/home/chooseTracks"

const Home = () => {
    /*hooks */
    const [music, setMusic] = useState(null);
    const generateClasses = choose => {
        const choosedMusic = music;
        return choose === choosedMusic
            ? "card mb-4 box-shadow box active"
            : "card mb-4 box-shadow box";
    };

    /* funtions */

    /**
     * Changed Handler
     *
     * @memberof Home
     */

    const handleChoose = music => {
        setMusic(music)
    };

    /**
    * Render
    *
    * @returns
    * @memberof Home
    */

    return (
        <Fragment>
            <ChooseForm classes={generateClasses} onChoose={handleChoose} />
        </Fragment>
    );
};

export default Home;