import './TweetButton.css'
import {useEffect} from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    enabled: boolean;
}

const TweetButton: React.FC<ButtonProps> = ({ ...props }) => {
    
    return (
        <button className='tweet-button' onClick={props.onClick} disabled={!props.enabled}>
            {props.text}
        </button>
    );
}

export default TweetButton;

