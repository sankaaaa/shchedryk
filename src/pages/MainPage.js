import React, {useState, useEffect} from 'react';
import "../styles/main-page.css";
import "../styles/calendar.css";
import logo from '../images/logo.png';
import imggermany from '../images/imggermany.JPG';
import imgbasel from '../images/imgbasel.jpeg';
import imgdenmark from '../images/imgdenmark.jpeg';
import imgny from '../images/imgny.jpeg';
import Calendar from "../pageComponents/Calendar";

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
                                                                    In the days from 9 to 12 May 2024, choirs and
                                                                    folklore
                                                                    groups with many thousands of participants from all
                                                                    over
                                                                    the world will once again come to Lindenholzhausen
                                                                    when the
                                                                    8th HARMONIE FESTIVAL will take place in the
                                                                    "smallest festival
                                                                    town in Germany".
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
                                                                    The EJCF ranges among the most important meetings
                                                                    for highly qualified children’s and youth choirs in
                                                                    the world. Every two years in May (Ascension) ten
                                                                    outstanding choirs
                                                                    from European countries, one guest choir from a
                                                                    non-European country
                                                                    and seven selected choirs from Switzerland thrill an
                                                                    audience of
                                                                    over 30,000 spectators in more than 40 events such
                                                                    as themed concerts,
                                                                    lunch concerts, open singing sessions for the
                                                                    general public, open-air events,
                                                                    church services and country portraits.
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
                                                                    Carnegie Hall, Notes from Ukraine
                                                                </h4>
                                                                <p className="description">
                                                                    “Carol of the Bells” returns to Carnegie Hall 100
                                                                    years after its North American premiere on this
                                                                    stage, when New York audiences first experienced
                                                                    Ukraine’s unique choral tradition thanks to a
                                                                    historic tour by The Ukrainian Republic Capella.
                                                                    “Carol of the Bells” has since become a worldwide
                                                                    Christmas favorite. Hear it and other beloved
                                                                    Ukrainian carols in a once-in-a-lifetime holiday
                                                                    concert that also features contemporary choral
                                                                    works, a world premiere by composer Trevor Weston,
                                                                    and artists including the Shchedryk Children’s Choir
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
                                                                    At the end of August, the award-winning children’s
                                                                    choir “Shchedryk” reunited in Denmark with the help
                                                                    of the Danish media Zetland and support from the New
                                                                    Democracy Fund.
                                                                    The singers in Shchedryk are from 11 to 16 years
                                                                    old. The choir, which is normally based in Kyiv,
                                                                    were planning its 50th anniversary when the war
                                                                    broke out in Ukraine.
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
                    <div className="third-section-container">
                        <h1>Calendar</h1>
                        <div className="content-row">
                            <Calendar />
                            <div>Сюди реєстрацію/лінку на</div>
                        </div>
                    </div>
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
