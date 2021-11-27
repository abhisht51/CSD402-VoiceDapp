import React from "react";
import styles from "../styles/landingPage.module.css";
import classnames from "classnames";
import Link from "next/link";

export default function Landing() {
  return (
    <div>
      <div className={styles.navbar}>
        <div className={classnames(styles.container, styles.flex)}>
          <h2 className={classnames(styles.logo, styles.bold_text)}>Voice</h2>
          <nav>
            <ul>
              <li>
                {" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>{" "}
              </li>
              <li>
                <a
                  href="https://github.com/CSD402/voice"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="mailto:helpdesk@voice.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section className={styles.showcase}>
        <div className={styles.container}>
          <div className={styles.showcase_text}>
            <h1 className={classnames(styles.bold_text, styles.my_1)}>
              Try the all new Voice today!
            </h1>
            <p className={styles.medium_text}>
              Voice is an open source software intented to break the
              <br /> mentor-mentee communication bridge.
            </p>
            <a
              href="https://github.com/CSD402/voice"
              target="_blank"
              rel="noreferrer"
              className={classnames(
                styles.btn,
                styles.btn_dark,
                styles.outline
              )}
            >
              View On Github
            </a>
          </div>
          <img className={styles.main_img} src="laptop.svg" alt=""></img>
        </div>
      </section>

      <section className={classnames(styles.cli, styles.py_3)}>
        <div className={classnames(styles.container, styles.grid)}>
          <img src="log.svg" alt="" />
          <div className={styles.card}>
            <h3 className={styles.text_center}>Easy to use, lightning fast!</h3>
          </div>

          <div className={styles.card}>
            <h3 className={styles.text_center}>
              For freedom fighters, 100% decentralised.
            </h3>
          </div>
          <img src="register.svg" alt="" />
        </div>
      </section>

      <section
        className={classnames(styles.cloud, styles.bg_primary, styles.py_2)}
      >
        <div className={classnames(styles.container, styles.grid)}>
          <div className={styles.text_center}>
            <h2 className={styles.lg}>Contribute Today!</h2>
            <p className={classnames(styles.lead, styles.my_1)}>
              Contribute to code base and be a part of the
              <br />
              Voice Developers Team
            </p>
            <a
              href="https://github.com/CSD402/voice"
              target="_blank"
              rel="noreferrer"
              className={classnames(styles.btn, styles.btn_dark)}
            >
              Read More
            </a>
          </div>
          <img src="clone.png" alt="" />
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <h1 className={classnames(styles.text_center, styles.my_1)}>
            Features
          </h1>
          <h3 className={classnames(styles.stats_heading, styles.text_center)}>
            What makes Voice, different?
          </h3>

          <div
            className={classnames(
              styles.grid,
              styles.grid_3,
              styles.text_center,
              styles.my_2
            )}
          >
            <div className={styles.card}>
              <p className={styles.head}>We do not hold your data!</p>
              <p>
                Voice is backed up by gun.js, which is a 100% decentralised
                framework.
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.head}>Made for and by the community</p>
              <p>
                We are a 100% open source software, help up build the next
                feature!
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.head}>We believe in speed.</p>
              <p>
                Voice is made with one of the fastest frameworks of all times,
                Next.js.
              </p>
            </div>
            <div className={styles.card}>
              <p className={styles.head}>We are all ears.</p>
              <p>
                Reach out to us for any query you face. We will get back to you
                promtly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={classnames(styles.cloud, styles.bg_primary, styles.py_2)}
      >
        <div className={classnames(styles.container, styles.grid)}>
          <div className={styles.text_center}>
            <h2 className={styles.lg}>Connect More!</h2>
            <p className={classnames(styles.lead, styles.my_1)}>
              Connect with classmates and have real-time chat with your mentors.
            </p>
            <Link href="/login">
              <a className={classnames(styles.btn, styles.btn_dark)}>
                Start Today
              </a>
            </Link>
          </div>
          <img src="register.svg" alt="" />
        </div>
      </section>

      <footer className={classnames(styles.footer, styles.py_1)}>
        <div className={styles.container}>
          <div>
            <h2 className={styles.bold_text}>Voice</h2>
            <p>Copyright &copy; 2021 Voice</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
