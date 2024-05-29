import React, {useEffect} from 'react';
import "../styles/repertoire.css";

const SkillsSection = () => {
    useEffect(() => {
        const progressBars = document.querySelectorAll(".progressbar");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute("aria-valuenow");
                    progressBar.style.width = percentage + "%";
                    progressBar.style.background = "linear-gradient(to right, #121111, #B90000)";
                    observer.unobserve(progressBar);
                }
            });
        }, {threshold: 1.0});

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
            <div className="barWrapper">
                <h3 className="progressText">Ukrainian folklore</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">80%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Ukrainian author</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="88"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">88%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Europe classic</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="95"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">95%</h3>
                </div>
            </div>
            <div className="barWrapper">
                <h3 className="progressText">Worldwide culture</h3>
                <div className="single-progress-txt">
                    <div className="progress">
                        <div
                            className="progress-bar progressbar"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h3 className="percentage">50%</h3>
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

export default SkillsSection;
