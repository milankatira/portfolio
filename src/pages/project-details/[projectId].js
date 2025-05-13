import React from 'react';
import { useRouter } from 'next/router';
const projectsData = [
    {
        id: '1',
        title: 'Awesome Project One',
        image: '/img/portfolio/project1/bg.jpg', // Example image path
        tags: ['Web Design', 'Development'],
        link: 'https://example.com/project-one',
        client: 'Client A',
        date: '2023-01-15',
        description:
            'This is a detailed description of Awesome Project One. It involved a lot of creative work and technical challenges, resulting in a successful launch.',
        // Add more fields as needed, e.g., specific images for the details page
        detailsImages: [
            '/img/portfolio/project1/detail1.jpg',
            '/img/portfolio/project1/detail2.jpg',
        ],
        services: 'Web Design, Frontend Development, Backend API',
    },
    {
        id: '2',
        title: 'Innovative App Two',
        image: '/img/portfolio/project2/bg.jpg', // Example image path
        tags: ['Mobile App', 'UI/UX'],
        link: 'https://example.com/project-two',
        client: 'Client B',
        date: '2023-05-20',
        description:
            'Innovative App Two showcases cutting-edge mobile technology and a user-friendly interface. We focused on performance and user experience.',
        detailsImages: ['/img/portfolio/project2/detail1.jpg'],
        services: 'Mobile App Development, UI/UX Design',
    },
    // Add more projects as needed
];

const ProjectDetailsPage = () => {
    const router = useRouter();
    const { projectId } = router.query;

    return (
        <>
            <section
                className="page-header proj-det bg-img parallaxie valign"
                style={{
                    backgroundImage: 'url(/img/portfolio/project2/bg.jpg)',
                }}
                data-overlay-dark="4"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-9">
                            <div className="cont">
                                <h6>art &amp; illustration</h6>
                                <h2>Inspiring new space.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="item mt-30">
                                <h6>Client</h6>
                                <p>
                                    <a href="#0">Envato.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="item mt-30">
                                <h6>Date</h6>
                                <p>6 August 2022</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="item mt-30">
                                <h6>Categories</h6>
                                <p>
                                    <a href="/works/works-dark/">Web Design </a>{' '}
                                    , <a href="/works/works-dark/">WordPress</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="item mt-30">
                                <h6>Tags</h6>
                                <p>
                                    <a href="/works/works-dark/">Minimal</a> ,{' '}
                                    <a href="/works/works-dark/">Modern</a> ,{' '}
                                    <a href="/works/works-dark/">Design</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="intro-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <div className="htit">
                                <h4>
                                    <span>01 </span> Introduction
                                </h4>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1 col-md-8">
                            <div className="text js-scroll__content">
                                <p className="extra-text">
                                    We are a Creative Agency &amp; Startup
                                    Studio that provides Digital Products and
                                    Services turns to focus on client success.
                                    We specialize in user interface design,
                                    including front-end development which we
                                    consider to be an integral part.
                                </p>
                                <ul className="smp-list mt-30">
                                    <li>Aenean sollicitudin</li>
                                    <li>lorem quis bibendum auctor</li>
                                    <li>nisi elit conseq uat ipsum</li>
                                    <li>nec sagittis sem nibh id elit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="projdtal">
                <h2 cstyle={{ display: 'none' }}></h2>
                <div className="container-fluid">
                    <div className="justified-gallery">
                        <div className="row">
                            <div className="col-md-3 pr-0">
                                <a href="img/portfolio/project2/1.jpg">
                                    <img
                                        alt=""
                                        src="/img/portfolio/project2/1.jpg"
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 pr-0">
                                <a href="img/portfolio/project2/2.jpg">
                                    <img
                                        alt=""
                                        src="/img/portfolio/project2/2.jpg"
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 pr-0">
                                <a href="img/portfolio/project2/3.jpg">
                                    <img
                                        alt=""
                                        src="/img/portfolio/project2/3.jpg"
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 pr-0">
                                <a href="img/portfolio/project2/5.jpg">
                                    <img
                                        alt=""
                                        src="/img/portfolio/project2/5.jpg"
                                    />
                                </a>
                            </div>
                            <div className="col-12">
                                <a href="img/portfolio/project2/7.jpg">
                                    <img
                                        alt=""
                                        src="/img/portfolio/project2/7.jpg"
                                        className="big-img"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="intro-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <div className="htit">
                                <h4>
                                    <span>02 </span> Description
                                </h4>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1 col-md-8 mb-30">
                            <div className="text">
                                <p className="extra-text">
                                    We are a Creative Agency &amp; Startup
                                    Studio that provides Digital Products and
                                    Services turns to focus on client success.
                                    We specialize in user interface design,
                                    including front-end development which we
                                    consider to be an integral part.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 style={{ display: 'none' }}></h2>
                <div className="container-fluid">
                    <div
                        className="video-wrapper section-padding bg-img parallaxie valign"
                        style={{
                            backgroundImage:
                                'url(/img/portfolio/project2/bg.jpg)',
                        }}
                        data-overlay-dark="4"
                    >
                        <div className="full-width text-center">
                            <a
                                className="vid"
                                href="https://vimeo.com/127203262"
                            >
                                <div className="vid-butn">
                                    <span className="icon">
                                        <i className="fas fa-play"></i>
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="next-prog section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="box">
                                <div
                                    className="bg-img valign"
                                    style={{
                                        backgroundImage:
                                            'url(/img/portfolio/project1/bg.jpg)',
                                    }}
                                    data-overlay-dark="4"
                                >
                                    <div className="caption ontop valign">
                                        <div className="o-hidden full-width">
                                            <h1>
                                                <span className="stroke">
                                                    Natural plus modern.
                                                </span>
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="copy-cap valign">
                                        <div className="cap full-width">
                                            <h1>
                                                <a href="/project-details2/project-details2-dark/">
                                                    <span>
                                                        Natural plus modern.
                                                    </span>
                                                </a>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectDetailsPage;
