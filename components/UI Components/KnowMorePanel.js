import styles from "../../styles/login.module.css"
import classnames from "classnames";
import React from 'react'
import {
    FaLinkedin,
    FaFacebook,
    FaTwitter,
    FaGithub,
} from "react-icons/fa";

export default function KnowMorePanel() {
    return (
        <div>
            <p className={styles.social_text}>Know more about us on</p>
            <div className={styles.social_media}>
                <a href="#" className={styles.social_icon}>
                    <FaFacebook />
                </a>
                <a href="#" className={styles.social_icon}>
                    <FaTwitter />
                </a>
                <a href="#" className={styles.social_icon}>
                    <FaGithub />
                </a>
                <a href="#" className={styles.social_icon}>
                    <FaLinkedin />
                </a>
            </div>
        </div>
    )
}
