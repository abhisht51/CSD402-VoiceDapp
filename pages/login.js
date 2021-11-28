import { FaLock, FaUser, FaBookOpen } from "react-icons/fa";
import { IoCodeWorking } from "react-icons/io5";
import styles from "../styles/login.module.css";
import classnames from "classnames";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import KnowMorePanel from "../components/UI Components/KnowMorePanel";
import { useRouter } from "next/router";
import { createRoom } from "../utils/utils";

export default function Login() {
  const {
    gun,
    appRef,
    user,
    loggedinState: { setLoggedin },
    usernameState: { setUsername },
  } = useContext(UserContext);

  const router = useRouter();
  const [username, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [role, setRole] = useState("student");
  const [signIn, setSignIn] = useState(true);

  function login(e) {
    e && e.preventDefault();

    if (username == "" || password == "") {
      return;
    }

    user.auth(username, password, (props) => {
      if (props.err) {
        alert(props.err);
      } else {
        setLoggedin(true);
        setUsername(username);
        router.push("/chatpage");
      }
    });
  }

  function signup(e) {
    e.preventDefault();
    if (username == "" || password == "") {
      return;
    }

    user.create(username, password, async (props) => {
      console.log(props);
      const { err } = props;
      if (err) {
        alert(err);
      } else {
        appRef.get("users").get(`${username}`).get("profile").put({
          name: username,
          userType: role,
        });

        if (role === "professor") {
          // Create new Dyte meeting room
          const createRoomResp = await createRoom(courseCode);
          const { id, roomName } = createRoomResp.meeting;

          console.log("room details:", id, roomName);
          appRef.get("courses").set({
            courseName: courseName,
            courseCode: courseCode,
            courseRoomName: roomName,
            courseRoomId: id,
          });
        }

        login();
      }
    });
  }

  const updateUserName = (e) => {
    setUsernameField(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateCourseName = (e) => {
    setCourseName(e.target.value);
  };

  const updateCourseCode = (e) => {
    setCourseCode(e.target.value);
  };

  const updateRole = (e) => {
    setRole(e.target.value);
  };

  function clearDetails() {
    setPassword("");
    setRole("student");
    setUsernameField("");
    setCourseCode("");
    setCourseName("");
  }

  const contentClassname = signIn
    ? styles.container
    : classnames(styles.container, styles.sign_up_mode);

  return (
    <div className={contentClassname}>
      <div className={styles.forms_container}>
        <div className={styles.signin_signup}>
          <form onSubmit={login} className={styles.sign_in_form}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles.input_field}>
              <FaUser className={styles.icons} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={updateUserName}
              />
            </div>
            <div className={styles.input_field}>
              <FaLock className={styles.icons} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className={classnames(styles.btn, styles.solid)}
            />
            <KnowMorePanel />
          </form>

          <form onSubmit={signup} className={styles.sign_up_form}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.input_field}>
              <FaUser className={styles.icons} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={updateUserName}
              />
            </div>
            <div className={styles.input_field}>
              <FaLock className={styles.icons} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <select className={styles.select} onChange={updateRole}>
              <option className={styles.select_option} value="student">
                Student
              </option>
              <option className={styles.select_option} value="professor">
                Professor
              </option>
            </select>
            {role === "professor" && (
              <div className={styles.input_field}>
                <FaBookOpen className={styles.icons} />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={updateCourseName}
                />
              </div>
            )}
            {role === "professor" && (
              <div className={styles.input_field}>
                <IoCodeWorking className={styles.icons} />
                <input
                  type="text"
                  placeholder="Course Code"
                  onChange={updateCourseCode}
                />
              </div>
            )}
            <input type="submit" className={styles.btn} value="Sign up" />
          </form>
        </div>
      </div>

      <div className={styles.panels_container}>
        <div className={classnames(styles.panel, styles.left_panel)}>
          <div className={styles.content}>
            <h3>New here ?</h3>
            <p>Join the amazingly fast growing Voice comunity today!</p>
            <button
              className={classnames(styles.btn, styles.transparent)}
              id="sign-up-btn"
              onClick={() => {
                setSignIn(false);
                clearDetails();
              }}
            >
              Sign up
            </button>
          </div>
          <img src="log.svg" className={styles.image} alt="" />
        </div>
        <div className={classnames(styles.panel, styles.right_panel)}>
          <div className={styles.content}>
            <h3 className={styles.bold_text}>One of us ?</h3>
            <p>Sign in to the community, if you already have an account!</p>
            <button
              className={classnames(styles.btn, styles.transparent)}
              id="sign-in-btn"
              onClick={() => {
                setSignIn(true);
                clearDetails();
              }}
            >
              Sign in
            </button>
          </div>
          <img src="register.svg" className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
}
