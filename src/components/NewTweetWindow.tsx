import TweetButton from "./TweetButton";
import { ItweetProps } from "./Tweet";
import './NewTweetWindow.css'
import { useRef, useState } from "react";

export interface InewTweetWindowProps {
    authorName: string;
    tweetList: ItweetProps[];
    setTweetList: React.Dispatch<React.SetStateAction<ItweetProps[]>>;
}

const NewTweetWindow: React.FC<InewTweetWindowProps> = ({ ...props }) => {
    const [newTweet, setNewTweet] = useState<string>("");
    const [tweetLength, setTweetLength] = useState<number>(0);
    const [isValidTweet, setIsValidTweet] = useState<boolean>(true);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleInput = (e:React.SyntheticEvent<HTMLDivElement>) => {
        let focusnode:HTMLElement | null |undefined = window.getSelection()?.focusNode?.parentElement;
        let newPosition:number = window.getSelection()?.focusOffset || 0;
        const content:string = inputRef.current?.innerText || "";
        const notMarked:string = '<span class= less-then-limit>' + content.slice(0,280) + '</span>'
        const marked:string = '<span class= more-then-limit>'+ content.slice(280) + '</span>'
        inputRef.current!.innerHTML = notMarked + marked;
        setNewTweet(content);
        setTweetLength(content.length);
        validateTweet();
        updateText(newPosition, focusnode);
      };

    const validateTweet = () => {
        if (tweetLength > 280) {
            setIsValidTweet(false);
        }
        else {
            setIsValidTweet(true);
        }
    };

    const handleTweetSubmit = () => {
        if (tweetLength === 0) {
            return;
        }
        let newTweetList = [...props.tweetList];
        newTweetList.unshift({
            authorName: props.authorName,
            tweetContent: newTweet,
            tweetDate: new Date()
        });
        props.setTweetList(newTweetList);
        setNewTweet("");
        setTweetLength(0);
        inputRef.current!.innerHTML = "";
    }

     const updateText = (currentPos:number, focusNode:HTMLElement | null |undefined) => {
        if (!inputRef.current) {
          return;
        }
        const range:Range = document.createRange();
        const selection:Selection | null = window.getSelection();
        
        if (!selection) {
            return;
        }
        if (focusNode !== null && focusNode !== undefined && focusNode?.childNodes.length !== 0)
        {
            if (focusNode.className === 'new-tweet-window__text-area') //first letter entered / copy paste
            {
                if (inputRef.current.textContent === null) //if its null then its the first letter
                    range.setStart(inputRef.current.childNodes[0].childNodes[0], 1);
                else if (inputRef.current.textContent.length <= 280) //less then 280 means its still in the first span
                    range.setStart(focusNode.childNodes[0].childNodes[0], currentPos);
                else //more then 280 means its in the beggining of second span
                    range.setStart(focusNode.childNodes[1].childNodes[0], Math.min(currentPos,focusNode.childNodes[1].textContent!.length));
            }
            else if (focusNode.className === 'less-then-limit') //less then 280
                {
                    if (currentPos <= 280) //less then 280 means its still in the first span
                        range.setStart(inputRef.current.childNodes[0].childNodes[0], currentPos);
                    else //more then 280 means its in the second span position minus 280
                        range.setStart(inputRef.current.childNodes[1].childNodes[0], currentPos-280);
                }
            else if (focusNode.className === 'more-then-limit') //more then 280
                {
                    if (inputRef.current.textContent !== null && inputRef.current.textContent.length <= 280) //less then 280 means its still in the first span
                        return;
                    else //more then 280 means its in the second span position minus 280
                        range.setStart(inputRef.current.childNodes[1].childNodes[0], currentPos);
                }
            else  //delete all and start from the beggining
                    return;
        }  
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      };

    return (
        <div className='new-tweet-window'>
            <div className='new-tweet-window__user-name'>{props.authorName}</div>
            <div
            className='new-tweet-window__text-area'
            onInput={handleInput}
            ref={inputRef}
            contentEditable ={true}>
                <span className='less-then-limit'></span>
                <span className='more-then-limit'></span>
            </div>
            
            <footer className='new-tweet-window__lower-footer'>
                <span style={!isValidTweet ? {color:"red"}:{color:"black"}} >{280-tweetLength}</span>
                <TweetButton text='Tweet' onClick={handleTweetSubmit} enabled={isValidTweet}/>
            </footer>
        </div>
    );
}



export default NewTweetWindow;