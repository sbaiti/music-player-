import React from 'react';
import PropTypes from 'prop-types';

const CardPlayList = ({ playList }) => {
    return (
        <div className="col-md-6">
            <div
                className="card mb-4 box-shadow box"
                onClick={() => {
                    // onChoose("spotify");
                }}
            >
                <div className="grid card-img-top ">
                    <figure className="effect-layla">
                        <img
                            src={playList.images[0].url}
                            alt="spotify"
                        />
                        <figcaption>
                            <div>
                                <h2>
                                    <span>{playList.name}</span>
                                </h2>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
};

CardPlayList.propTypes = {
    playList: PropTypes.object.isRequired
};

export default CardPlayList;