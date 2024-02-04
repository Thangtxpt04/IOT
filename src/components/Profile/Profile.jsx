import React from "react";
import "./profile.css";
import images from "../../assets";
const Profile = () => {
  return (
    <div>
      <nav id="desktop-nav">
        <div className="logo">Thắng trịnh</div>
        <div>
          <ul className="nav-links">
            <li>
              <a href="#about">Thông tin</a>
            </li>
            <li>
              <a href="#experience">Kinh nghiệm</a>
            </li>
            <li>
              <a href="#projects">Dự án</a>
            </li>
            <li>
              <a href="#contact">Liên hệ</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <nav id="hamburger-nav">
        <div className="logo">Thắng </div>
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="menu-links">
            <li>
              <a href="#about" onClick="toggleMenu()">
                About
              </a>
            </li>
            <li>
              <a href="#experience" onClick="toggleMenu()">
                Experience
              </a>
            </li>
            <li>
              <a href="#projects" onClick="toggleMenu()">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick="toggleMenu()">
                Contact
              </a>
            </li>
          </div>
        </div>
      </nav> */}
      <section id="profile">
        <div className="section__pic-container">
          <img
            src={`${images.profile}`}
            alt="John Doe profile picture"
            aria-hidden="true"
            style={{ borderRadius: "45%" }}
          />
        </div>
        <div className="section__text">
          <p className="section__text__p1">Xin chào, Tôi là</p>
          <h1 className="title">Trịnh Xuân Thắng</h1>
          <p className="section__text__p2">Frontend Developer</p>
          <div className="btn-container">
            <button
              className="btn btn-color-2"
              onClick="window.open('./assets/resume-example.pdf')"
            >
              Download CV
            </button>
            <button
              className="btn btn-color-1"
              onClick="location.href='./#contact'"
            >
              Liên hệ
            </button>
          </div>
          <div id="socials-container">
            <img
              src={`${images.likedin}`}
              alt="My LinkedIn profile"
              className="icon"
              onClick="location.href='https://linkedin.com/'"
            />
            <img
              src={`${images.github}`}
              alt="My Github profile"
              className="icon"
              onClick="location.href='https://github.com/'"
            />
          </div>
        </div>
      </section>
      <section id="about">
        <p className="section__text__p1">Get To Know More</p>
        <h1 className="title">About Me</h1>
        <div className="section-container">
          <div className="section__pic-container">
            <img
              src={`${images.about}`}
              alt="Profile picture"
              className="about-pic"
            />
          </div>
          <div className="about-details-container">
            <div className="about-containers">
              <div className="details-container">
                <img
                  src={`${images.experience}`}
                  alt="Experience icon"
                  className="icon"
                />
                <h3>Kinh nghiệm</h3>
                <p>
                  1+ years <br />
                  Frontend Development
                </p>
              </div>
              <div className="details-container">
                <img
                  src={`${images.education}`}
                  alt="Education icon"
                  className="icon"
                />
                <h3>Trình độ</h3>
                <p>Cử nhân đại học</p>
              </div>
            </div>
            <div className="text-container">
              <p>
                Áp dụng những kiến thức đã học về lập trình web và cơ sở dữ liệu
                để trở thành fullstack developer trong tương lai.
              </p>
            </div>
          </div>
        </div>
        <img
          src={`${images.arrow}`}
          alt="Arrow icon"
          className="icon arrow"
          onClick="location.href='./#experience'"
        />
      </section>
      <section id="experience">
        <p className="section__text__p1">Khám phá của tôi</p>
        <h1 className="title">Kinh nghiệm</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container">
              <h2 className="experience-sub-title">Frontend Development</h2>
              <div className="article-container">
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>HTML</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>CSS</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>SASS</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>JavaScript</h3>
                    <p>Basic</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>TypeScript</h3>
                    <p>Basic</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Material UI</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
              </div>
            </div>
            <div className="details-container">
              <h2 className="experience-sub-title">Backend Development</h2>
              <div className="article-container">
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>MySQL</h3>
                    <p>Basic</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Node JS</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Express JS</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article>
                  <img
                    src={`${images.checkmark}`}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Git</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        <img
          src={`${images.arrow}`}
          alt="Arrow icon"
          className="icon arrow"
          onClick="location.href='./#projects'"
        />
      </section>
      <section id="projects">
        <p className="section__text__p1">Dự án gần đây</p>
        <h1 className="title">Dự án</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container color-container">
              <div className="article-container">
                <img
                  src={`${images.project1}`}
                  alt="Project 1"
                  className="project-img"
                />
              </div>
              <h2 className="experience-sub-title project-title">Tiktok</h2>
              {/* <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick="location.href='https://github.com/'"
                >
                  Github
                </button>
                <button
                  className="btn btn-color-2 project-btn"
                  onClick="location.href='https://github.com/'"
                >
                  Live Demo
                </button>
              </div> */}
            </div>
            <div className="details-container color-container">
              <div className="article-container">
                <img
                  src={`${images.project2}`}
                  alt="Project 2"
                  className="project-img"
                />
              </div>
              <h2 className="experience-sub-title project-title">Allymbirds</h2>
              {/* <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick="location.href='https://github.com/'"
                >
                  Github
                </button>
                <button
                  className="btn btn-color-2 project-btn"
                  onClick="location.href='https://github.com/'"
                >
                  Live Demo
                </button>
              </div> */}
            </div>
            <div className="details-container color-container">
              <div className="article-container">
                <img
                  src={`${images.project3}`}
                  alt="Project 3"
                  className="project-img"
                />
              </div>
              <h2 className="experience-sub-title project-title">
                Voyage Management System
              </h2>
              {/* <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick="location.href='https://github.com/'"
                >
                  Github
                </button>
                <button
                  className="btn btn-color-2 project-btn"
                  onClick="location.href='https://github.com/'"
                >
                  Live Demo
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <img
          src={`${images.arrow}`}
          alt="Arrow icon"
          className="icon arrow"
          onClick="location.href='./#contact'"
        />
      </section>
      <section id="contact">
        <p className="section__text__p1">Liên hệ</p>
        <h1 className="title">Liên hệ với tôi</h1>
        <div className="contact-info-upper-container">
          <div className="contact-info-container">
            <img
              src={`${images.email}`}
              alt="Email icon"
              className="icon contact-icon email-icon"
            />
            <p>
              <a href="mailto:examplemail@gmail.com">Example@gmail.com</a>
            </p>
          </div>
          <div className="contact-info-container">
            <img
              src={`${images.likedin}`}
              alt="LinkedIn icon"
              className="icon contact-icon"
            />
            <p>
              <a href="https://www.linkedin.com">LinkedIn</a>
            </p>
          </div>
        </div>
      </section>
      <footer>
        <nav>
          <div className="nav-links-container">
            <ul className="nav-links">
              <li>
                <a href="#about">Thông tin</a>
              </li>
              <li>
                <a href="#experience">Kinh nghiệm</a>
              </li>
              <li>
                <a href="#projects">Dự án</a>
              </li>
              <li>
                <a href="#contact">Liên hệ</a>
              </li>
            </ul>
          </div>
        </nav>
        <p>Copyright &#169; 2023 John Doe. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
