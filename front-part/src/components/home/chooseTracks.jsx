import React from "react";
import PropTypes from 'prop-types';
import spotify from "../../assets/image/spotify.jpg"
import uploaded from "../../assets/image/uploaded.jpg"
import { authEndpoint, clientId, redirectUri, scopes } from "../../config/default";

const ChooseForm = ({ onChoose, classes }) => {
    return (
        <div style={{ padding: "3em" }}>
            <div className="row">
                <div className="cbs-main-list-item-section-header cbs-clear-fix">
                    <h4 className="main-header ">
                        <span className="ml-4">
                            Please choose your source of Musics tracks
                    </span>
                    </h4>
                </div>
                <div className="row mt-1">
                    <div className="col-md-6">
                        <a
                            className={classes("spotify")}
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}
                        >
                            <div
                                onClick={() => {
                                    onChoose("spotify");
                                }}
                            >
                                <div className="grid card-img-top ">
                                    <figure className="effect-layla">
                                        <img
                                            src={spotify}
                                            alt="spotify"
                                        />
                                        <figcaption>
                                            <div>
                                                <h2>
                                                    <span>Spotify Music</span>
                                                </h2>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-text m-3">
                                        Spotify Tracks Music
                            </h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a
                            href="upload-music"
                            className={classes("up")}
                        >
                            <div
                                onClick={() => {
                                    onChoose("up");
                                }}
                            >
                                <div className="grid card-img-top">
                                    <figure className="effect-layla">
                                        <img
                                            src={uploaded}
                                            alt="uploaded music"
                                        />
                                        <figcaption>
                                            <div>
                                                <h2>
                                                    <span>Uploaded Music</span>
                                                </h2>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-text my-3 mx-5">
                                        Uploaded album music
                            </h5>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

ChooseForm.propTypes = {
    onChoose: PropTypes.func.isRequired,
    classes: PropTypes.func.isRequired
};

export default ChooseForm;