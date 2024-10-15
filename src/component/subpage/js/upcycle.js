import React from "react";
import "../scss/upcycle.scss"
import Header from "../../header/js/header";

const Upcycle = () => {
    return (
        <>
        <Header/>
            <div className="upcycle-container">
                <div className="upcycle-title">
                    <p>업사이클</p>
                </div>
                <div className="upcycle-column">
                    <div className="upcycle-row">
                        <ul>
                            <li>
                                <div className="post-box">
                                    <div className="image-box">

                                    </div>
                                    <div className="post-text-box">
                                        <div className="post-title">
                                            asdfas
                                        </div>
                                        <div className="post-row">
                                            <div className="post-name">
                                                sdfsdfsdfa
                                            </div>
                                            <div className="post-like">
                                                good
                                            </div>
                                        </div>
                                        <div className="post-date">
                                                sdfsd
                                        </div>
                                        <div className="post-keyword">
                                            #dfdfd #dfdff
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Upcycle;