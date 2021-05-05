import { randomImage } from "../common/random";

const UserTextPic = (props) => {
    if (typeof props.name != "string") return null;
    return (
        <img
            src={randomImage(props.name)}
            title={props.name}
            alt={props.name}
        />
    );
};

export default UserTextPic;
