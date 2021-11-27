import Gun from "gun";
import { getAllUserIds, getUserProfiles } from "../../context/userContext";

const gun = Gun();

const Profile = ({ profileData }) => {
  console.log("Profile data", profileData);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;

export async function getStaticPaths() {
  // let users;
  gun
    .get("gun-chat")
    .get("users")
    .once((data) => {
      console.log("data is",data);
    });

    console.log("hello");
  // const paths = Object.keys(ids).map((id) => ({
  //   params: {
  //     id: id,
  //   },
  // }));
  const paths = [
    {
      params: {
        id: "ysharma",
      },
    },
  ];

  return {
    paths,
    fallback: false,
  };
}
// const profileData = await getUserProfiles(params.user);
// console.log(output);

export async function getStaticProps({ params }) {
  let output;
  gun
    .get("gun-chat")
    .get("users")
    .get(`${params.id}`)
    .get("profile")
    .once((data) => {
      output = data;
    });
  let profileData = output ? output : "empty hai";

  return {
    props: {
      profileData,
    },
  };
  // Fetch necessary data for the blog post using params.id
}
