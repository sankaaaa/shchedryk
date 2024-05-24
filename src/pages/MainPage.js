import React, {useState, useEffect} from 'react';
import "../styles/main-page.css";
import logo from '../images/logo.png';
import imggermany from '../images/imggermany.JPG';
import imgbasel from '../images/imgbasel.jpeg';
import imgdenmark from '../images/imgdenmark.jpeg';
import imgny from '../images/imgny.jpeg';

const MainPage = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const firstSection = document.getElementById('section1');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio < 0.95) {
                        setIsVisible(false);
                    } else {
                        setIsVisible(true);
                    }
                });
            },
            {threshold: 0.95}
        );

        if (firstSection) {
            observer.observe(firstSection);
        }

        return () => {
            if (firstSection) {
                observer.unobserve(firstSection);
            }
        };
    }, []);

    return (
        <div className="container">
            <div className="background-image"></div>
            <div className="content">
                <section className="section" id="section1">
                    <div className="first-section-container">
                        <h1>WE ARE SHCHEDRYK</h1>
                        <p>Kyiv choir with more than 50 years of history</p>
                    </div>
                    <div className={`additional-block ${isVisible ? 'show' : 'hide'}`}>
                        <img src={logo} alt="logo"/>
                    </div>
                </section>
                <section className="section" id="section2">
                    <div className="second-section-container">
                        <h1>OUR HISTORY</h1>
                        <div class="experience-content">
                            <div class="main-timeline">
                                <ul className="main-timeline">
                                    <li>
                                        <div className="single-timeline-box">
                                            <div className="row">
                                                <div className="row-1">
                                                    <div className="col-md-5 experience-time">
                                                        <div className="experience-content">
                                                            <h4>2024 May</h4>
                                                            <h3>Germany, Dillhausen </h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="timeline">
                                                            <div className="timeline-content">
                                                                <h4 className="title">
                                                                    <span><i className="fa fa-circle"
                                                                             aria-hidden="true"></i></span>
                                                                    Harmonie festival
                                                                </h4>
                                                                <p className="description">
                                                                    lalalalalllalalalalal
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row-2">
                                                    <img src={imggermany} alt="imggermany"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="row-1">
                                                    <div className="col-md-5 experience-time">
                                                        <div className="experience-content">
                                                            <h4>2023 May</h4>
                                                            <h3>Switzerland, Basel</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="timeline">
                                                            <div className="timeline-content">
                                                                <h4 className="title">
                                                                <span><i className="fa fa-circle"
                                                                         aria-hidden="true"></i></span>
                                                                    EJCFBasel
                                                                </h4>
                                                                <p className="description">
                                                                    lalalalalalalalalala
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row-2">
                                                    <img src={imgbasel} alt="imggermany"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="row-1">
                                                    <div className="col-md-5 experience-time">
                                                        <div className="experience-content">
                                                            <h4>2022, November-December</h4>
                                                            <h3>USA, New York</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="timeline">
                                                            <div className="timeline-content">
                                                                <h4 className="title">
                                                                <span><i className="fa fa-circle"
                                                                         aria-hidden="true"></i></span>
                                                                    Carnegie Hall, Shchedryk performance
                                                                </h4>
                                                                <p className="description">
                                                                    lalalalalalalalalalallalalalalaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                                    aaaaaaaaaaaaaaaa
                                                                    aaaaaaaaaaaaaa
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row-2">
                                                    <img src={imgny} alt="imgny"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="row-1">
                                                    <div className="col-md-5 experience-time">
                                                        <div className="experience-content">
                                                            <h4>2022, August</h4>
                                                            <h3>Denmark, Copenhagen</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="timeline">
                                                            <div className="timeline-content">
                                                                <h4 class="title">
                                                                <span><i class="fa fa-circle"
                                                                         aria-hidden="true"></i></span>
                                                                    Independence Day concert
                                                                </h4>
                                                                <p class="description">
                                                                    lalalalalalalallalalala
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row-2">
                                                    <img src={imgdenmark} alt="imgdenmark"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section" id="section3">
                    <h1>Section 3</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ex vel mauris gravida
                        bibendum.</p>
                </section>
                <section className="section" id="section4">
                    <h1>Section 4</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ex vel mauris gravida
                        bibendum.</p>
                </section>
            </div>
        </div>
    );
}

export default MainPage;
