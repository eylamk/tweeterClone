import './Feed.css'
import NewTweetWindow,{InewTweetWindowProps} from './NewTweetWindow'
import Tweet,{ItweetProps} from './Tweet'
import React, { useState } from 'react'

interface IFeedProps {
}

const tweetLists: ItweetProps[] = [{
    authorName: 'Amit Evron ',
    tweetContent: 'what shoud i tweet about next?.',
    tweetDate: new Date('2022-12-24T12:15:00')
},{
    authorName: 'Amit Evron ',
    tweetContent: 'i love boys.',
    tweetDate: new Date('2022-12-23T12:15:00')
}]



const Feed: React.FC<IFeedProps> = () => {
    const [tweetList, setTweetList] = useState<ItweetProps[]>(tweetLists);

    const newTweetProps:InewTweetWindowProps = {
        authorName: 'Amit Evron ',
        tweetList: tweetList,
        setTweetList: setTweetList    
    }

    return (
    <div className="feed">
        <NewTweetWindow {...newTweetProps}/>
        <div className="feed-body">
            <ul className='tweets-list'>
                {tweetList.sort((a:ItweetProps,b:ItweetProps) => b.tweetDate.getTime() - a.tweetDate.getTime()).map((tweet:ItweetProps) => <Tweet {...tweet}/>)}
            </ul>
        </div>
    </div>
  )
}

export default Feed