import React, {useEffect} from 'react';
import "../styles/repertoire.css";

const RepertoireSection = () => {
    useEffect(() => {
        //all elements with the class 'progressbar'
        const progressBars = document.querySelectorAll(".progressbar");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                //if the progress bar is in the viewport
                if (entry.isIntersecting) {
                    const progressBar = entry.target; //get the percentage value
                    const percentage = progressBar.getAttribute("aria-valuenow");
                    progressBar.style.width = percentage + "%"; //set the width of the progress bar
                    progressBar.style.background = "linear-gradient(to right, #121111, #B90000)";
                    observer.unobserve(progressBar); //stop observing the progress bar
                }
            });
        }, {threshold: 1.0}); //observer options with a threshold of 1.0 (fully visible)

        progressBars.forEach(progressBar => {
            observer.observe(progressBar);
        });

        return () => {
            progressBars.forEach(progressBar => {
                observer.unobserve(progressBar);
            });
        };
    }, []);

    return (
        <div className="container">
            {/* Each barWrapper represents a category with its progress bar and percentage */}
            <div className="barWrapper">
                <h3 className="progressText">Ukrainian folklore</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="45"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">45%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Ukrainian author</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">60%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Europe classic</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="30"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">30%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Worldwide culture</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">25%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Modern composers</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="67"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">67%</h3>
                </div>
            </div>
        </div>
    );
}

export default RepertoireSection;
